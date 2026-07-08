# PitchIQ 🎯⚽

**Digital Coach Assistant for Football Trainers** - A comprehensive platform for tactical training planning and execution.

## 🌟 Features

- **Tactical Board**: Interactive football field with draggable elements
- **Formation Library**: Pre-built formations (4-3-3, 4-4-2, 3-5-2, etc.)
- **Training Drills**: Categorized exercises by goal, age group, and duration
- **Smart Assistant**: AI-powered drill suggestions
- **Subscription Plans**: Free, Basic, and Pro tiers
- **Payment Integration**: Stripe for secure payments
- **Real-time Collaboration**: Socket.io for live board updates
- **Session Management**: Save, load, and share training sessions

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Socket.io** - Real-time features

### Backend
- **Node.js + Express** - REST API
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Socket.io** - WebSocket communication

## 📁 Project Structure

```
PitchIQ/
├── frontend/               # Next.js React app
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── public/
├── backend/               # Express.js server
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & validation
│   ├── server.js         # Entry point
│   └── .env.example
└── README.md
```

## 🔧 Setup Instructions

### Backend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables**

4. **Start the server**
   ```bash
   npm run dev
   ```

Server runs at `http://localhost:5000`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Boards
- `GET /api/boards` - Get all user boards
- `POST /api/boards` - Create new board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Formations
- `GET /api/formations` - Get all formations

### Drills
- `GET /api/drills` - Get all drills

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## 📊 Database Schema

### User
- name, email, password
- plan (free/basic/pro)
- subscription details

### Board
- userId, title, elements
- fieldType, bgTheme, miniGoals

### Formation
- name, code, style, players

### Drill
- title, goal, ageGroup, equipment, steps

## 💳 Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | €0 | Limited board |
| **Basic** | €99/mo | Unlimited boards |
| **Pro** | €199/mo | Everything + AI |

## 📝 License

MIT

---

**Made with ⚽ and 💙 for football coaches worldwide**