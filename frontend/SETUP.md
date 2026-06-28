# ⚙️ FitAI Trainer — Setup Guide

Complete instructions to get both the frontend and backend running locally from scratch.

---

## Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18 or later | https://nodejs.org |
| npm | comes with Node | — |
| MongoDB | 6 or later | https://www.mongodb.com/try/download/community |
| Git | any | https://git-scm.com |

You will also need a **Google Gemini API key**.
Get one free at: https://aistudio.google.com/app/apikey

---

## Project Structure

```
fitai/
├── fitness-frontend/   ← Vite + React app
└── fitness-backend/    ← Express + MongoDB API
```

---

## Step 1 — Start MongoDB

Make sure MongoDB is running locally before starting the backend.

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

**Linux:**
```bash
sudo systemctl start mongod
```

Verify it's running:
```bash
mongosh
# You should see the Mongo shell prompt
```

---

## Step 2 — Backend Setup

```bash
cd fitness-backend
```

### 2a. Install dependencies
```bash
npm install
```

### 2b. Create your environment file
```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/fitai

GEMINI_API_KEY=your_gemini_api_key_here

JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
```

> **Important:** `GEMINI_API_KEY` is the only required external service. Everything else uses local defaults.

### 2c. Start the backend
```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

You should see:
```
✅  MongoDB connected: localhost
🚀  Server running on http://localhost:5000  [development]
```

### 2d. Verify the backend is working
Open your browser or use curl:
```bash
curl http://localhost:5000/api/health
# {"success":true,"status":"ok","env":"development"}
```

---

## Step 3 — Frontend Setup

Open a new terminal window:

```bash
cd fitness-frontend
```

### 3a. Install dependencies
```bash
npm install
```

### 3b. Start the dev server
```bash
npm run dev
```

The terminal will show:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 3c. Open the app
Visit **http://localhost:5173** in your browser.

> The Vite dev server automatically proxies all `/api` requests to `http://localhost:5000`, so no CORS issues during development.

---

## Step 4 — Verify Everything Works

1. Open http://localhost:5173
2. Click any muscle group (e.g. "Chest")
3. Click **Generate Chest Workout**
4. Wait ~5 seconds — your AI workout plan should appear
5. Type a question in the chat box (e.g. "How many sets should I do?")
6. Go to the **History** tab — the generated workout should be saved there

---

## Available API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET  | `/api/health` | Health check |
| POST | `/api/workout/generate` | Generate a workout plan |
| GET  | `/api/workout/history` | Get all saved workouts |
| DELETE | `/api/workout/:id` | Delete a workout |
| POST | `/api/chat/message` | Send a chat message |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET  | `/api/auth/me` | Get current user (requires auth) |

---

## Building for Production

### Frontend
```bash
cd fitness-frontend
npm run build
# Output goes to dist/ — deploy to Vercel, Netlify, or any static host
```

### Backend
```bash
# Set NODE_ENV=production in your .env
# Deploy to Railway, Render, Heroku, or any Node.js host
npm start
```

In production, update `FRONTEND_URL` in your backend `.env` to your deployed frontend URL.

---

## Activating Login / Signup (Future)

The auth system is fully built — JWT, bcrypt, User model, routes and controllers are all ready.

To turn it on:

1. **Backend** — In `routes/workout.js` and `routes/chat.js`, uncomment the `protect` middleware lines.

2. **Frontend** — In `src/context/AuthContext.jsx`, implement the `login()` and `signup()` methods to call the API.

3. **Frontend** — In `src/components/layout/Navbar.jsx`, uncomment the auth nav items block.

4. **Frontend** — In `src/components/layout/ProtectedRoute.jsx`, uncomment the redirect logic.

5. **Frontend** — In `src/pages/Login.jsx` and `Signup.jsx`, uncomment the `useAuth` and `navigate` lines.

6. **Frontend** — Add the routes to `App.jsx` (they are already imported and routed).

That's it — no structural changes needed.

---

## Common Issues

**"Cannot connect to MongoDB"**
Make sure MongoDB service is running. Check with `mongosh`.

**"Invalid API key"**
Double-check your `GEMINI_API_KEY` in `.env`. Make sure there are no extra spaces.

**"CORS error in browser"**
Ensure the backend is running on port 5000 and `FRONTEND_URL` in `.env` matches exactly.

**Port already in use**
Change `PORT` in backend `.env` and update the Vite proxy target in `vite.config.js`.
