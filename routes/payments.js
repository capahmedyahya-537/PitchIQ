const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const PLANS = {
  basic: {
    priceId: 'price_basic',
    price: 99,
    name: 'Basic'
  },
  pro: {
    priceId: 'price_pro',
    price: 199,
    name: 'Pro'
  }
};

// Create checkout session
router.post('/create-checkout', authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;
    const user = await User.findById(req.userId);

    if (!PLANS[plan]) {
      return res.status(400).json({ message: 'باقة غير صحيحة' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: PLANS[plan].priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_PRODUCTION_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_PRODUCTION_URL}/plans`,
      customer_email: user.email,
      metadata: {
        userId: req.userId,
        plan: plan
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Webhook for Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const plan = session.metadata.plan;

      await User.findByIdAndUpdate(
        userId,
        {
          plan,
          'subscription.stripeCustomerId': session.customer,
          'subscription.stripeSubscriptionId': session.subscription,
          'subscription.status': 'active'
        }
      );
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

module.exports = router;