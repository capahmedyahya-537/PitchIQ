# Deployment Guide

## Backend Deployment (Render)

### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub

### 2. Deploy Backend
- Click "New +" → "Web Service"
- Connect GitHub repository
- Configure:
  - **Name:** pitchiq-backend
  - **Runtime:** Node
  - **Build Command:** `npm install`
  - **Start Command:** `node server.js`
  - **Plan:** Free (or Starter)

### 3. Set Environment Variables
In Render dashboard, add:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_public
FRONTEND_URL=your_vercel_domain
```

## Frontend Deployment (Vercel)

### 1. Connect Vercel
- Go to https://vercel.com
- Import GitHub repository
- Select `frontend` folder as root

### 2. Configure Environment Variables
In Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com/api
NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key
```

### 3. Deploy
- Vercel will auto-deploy on git push

## Database Setup (MongoDB Atlas)

### 1. Create Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up

### 2. Create Cluster
- Choose free tier
- Create cluster
- Add connection string to Render env vars

## Stripe Setup

### 1. Create Account
- Go to https://stripe.com
- Sign up

### 2. Get API Keys
- Publishable Key → Vercel env vars
- Secret Key → Render env vars

### 3. Create Products
- Basic Plan: €99/month
- Pro Plan: €199/month

---

**Deployment should take ~10 minutes!**