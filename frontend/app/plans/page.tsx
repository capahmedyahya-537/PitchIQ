'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const PLANS = [
  { id: 'free', name: 'مجانية', price: 0, features: ['لوحة محدودة', '3 تمارين تجريبية'] },
  { id: 'basic', name: 'أساسية', price: 99, features: ['لوحة غير محدودة', 'كل التشكيلات', 'كل التمارين'], popular: true },
  { id: 'pro', name: 'احترافية', price: 199, features: ['كل المميزات', 'مساعد ذكي', 'أولوية الدعم'] },
];

export default function Plans() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/register');
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  const handleSelectPlan = async () => {
    if (selectedPlan === 'free') {
      // Update user to free plan
      const token = localStorage.getItem('token');
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
          { plan: 'free' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        router.push('/dashboard');
      } catch (err) {
        console.error(err);
      }
    } else {
      // Redirect to Stripe checkout
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/create-checkout`,
          { plan: selectedPlan },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Redirect to Stripe
        window.location.href = `https://checkout.stripe.com/pay/${res.data.sessionId}`;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <nav className="mb-12 text-center">
        <h1 className="text-3xl font-bold">⚽ PitchIQ</h1>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">اختر الباقة المناسبة</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 rounded-lg border-2 cursor-pointer transition ${
                selectedPlan === plan.id
                  ? 'border-[#FF6B35] bg-orange-50'
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="mb-4">
                  <span className="bg-[#FF6B35] text-white px-4 py-1 rounded-full text-sm font-bold">
                    الأكثر شيوعاً
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">
                {plan.price} €
                {plan.price > 0 && <span className="text-sm text-gray-600">/شهريا</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div
                className={`btn w-full text-center ${
                  selectedPlan === plan.id ? 'btn-cta' : 'btn-ghost-dark'
                }`}
              >
                {selectedPlan === plan.id ? 'مختار' : 'اختر'}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSelectPlan}
            disabled={loading}
            className="btn btn-cta px-12 py-4 text-lg"
          >
            {loading ? 'جاري المعالجة...' : 'تأكيد واستمرار'}
          </button>
        </div>
      </div>
    </div>
  );
}