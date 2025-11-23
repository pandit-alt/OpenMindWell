# 📘 OpenMindWell - Complete Project Guide

> **Version 1.0** | Last Updated: November 2024

---

## ⚠️ CRITICAL SAFETY DISCLAIMER

**OpenMindWell is NOT a substitute for professional mental health care.**

This platform provides:
- ✅ Peer support and community connection
- ✅ Self-help resources and coping strategies  
- ✅ A safe space to share experiences

This platform does NOT provide:
- ❌ Professional therapy or counseling
- ❌ Medical diagnosis or treatment
- ❌ Emergency crisis intervention
- ❌ Licensed mental health services

**IF YOU ARE IN CRISIS:**
- 🇺🇸 Call/Text **988** (Suicide & Crisis Lifeline)
- 🇺🇸 Text **HOME** to **741741** (Crisis Text Line)
- 🌍 Find international helplines: **findahelpline.com**
- 🚨 Call emergency services (911/112/999) for immediate danger

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Folder Structure](#folder-structure)
6. [Environment Variables](#environment-variables)
7. [Local Development Setup](#local-development-setup)
8. [Free Service Accounts Setup](#free-service-accounts-setup)
9. [Deployment Guide](#deployment-guide)
10. [Security & Privacy](#security--privacy)
11. [Contributing](#contributing)
12. [Roadmap](#roadmap)

---

## 🌟 Project Overview

**OpenMindWell** is a free, open-source mental health support platform designed to provide anonymous peer support, self-help tools, and curated resources. Built with modern web technologies and deployed entirely on free-tier services.

### Why OpenMindWell?

- **Accessibility**: 100% free to use, no premium features
- **Privacy**: Anonymous accounts, no personal data required
- **Safety**: AI-powered crisis detection with automatic resource suggestions
- **Community**: Peer-to-peer support in moderated chat rooms
- **Open Source**: Transparent, auditable, and community-driven

### Target Audience

- Individuals seeking peer support for mental wellness
- People exploring self-help strategies
- Communities building mental health awareness
- Open-source contributors (GSoC, Hacktoberfest, etc.)

---

## 🎯 Features

### 1. **Anonymous Chat Rooms** 💬
- 6 pre-created support rooms (Anxiety, Depression, PTSD, etc.)
- Real-time WebSocket messaging
- Anonymous/pseudonymous usernames
- Emoji avatars (no photos)

### 2. **AI Crisis Detection** 🤖
- HuggingFace emotion analysis on every message
- Keyword-based fallback system
- Automatic warning messages with resources
- 4-tier risk levels (low, medium, high, critical)

### 3. **Private Journaling** 📝
- End-to-end private entries (only visible to user)
- Mood tracking (1-5 scale)
- Tagging system
- Reflection prompts

### 4. **Habit Tracking** ✅
- Custom habit creation
- Daily logging with notes
- Streak tracking
- Progress visualization (coming soon)

### 5. **Resource Library** 📚
- Curated mental health articles
- Crisis hotlines (US & International)
- Breathing exercises and guided meditations
- Categorized by type (hotline, article, exercise)

### 6. **Moderation System** 🛡️
- User reporting functionality
- Moderator dashboard (volunteer-only)
- Flagged message review
- Community guidelines enforcement

### 7. **Volunteer Program** 🤝
- Trained peer support volunteers
- Moderator privileges
- Community safety oversight

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Auth**: Supabase Auth (anonymous sign-in)
- **State**: React Hooks
- **HTTP Client**: Fetch API
- **WebSocket**: Native WebSocket API

### **Backend**
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Language**: TypeScript 5.3
- **WebSocket**: ws library 8.16
- **Database**: Supabase (PostgreSQL 15)
- **Auth**: JWT validation
- **AI**: HuggingFace Inference API
- **Security**: Helmet, CORS, Rate Limiting

### **Database**
- **Service**: Supabase (managed PostgreSQL)
- **ORM**: None (direct SQL queries via Supabase client)
- **Security**: Row Level Security (RLS) policies
- **Tables**: 8 (profiles, rooms, messages, journal_entries, habits, habit_logs, resources, reports, volunteers)

### **AI/ML**
- **Provider**: HuggingFace
- **Model**: `cardiffnlp/twitter-roberta-base-emotion`
- **Task**: Emotion classification (7 emotions)
- **Fallback**: Keyword-based pattern matching

### **Deployment**
- **Frontend**: Vercel (free tier)
- **Backend**: Render or Railway (free tier)
- **Database**: Supabase (free tier)
- **Version Control**: Git/GitHub

### **Development Tools**
- **Package Manager**: npm
- **Linting**: TypeScript compiler
- **Monorepo**: Workspaces with concurrently

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER DEVICES                            │
│                  (Web Browsers - Desktop/Mobile)                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                        │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Pages: Landing → Onboarding → Dashboard                  │ │
│  │  Components: RoomsList, JournalForm, HabitTracker, etc.  │ │
│  │  API Client: lib/api.ts (REST) + WebSocket client        │ │
│  └───────────────────────────────────────────────────────────┘ │
│                     Deployed on: Vercel                         │
└───────────┬────────────────────────────────┬────────────────────┘
            │                                │
            │ HTTP/REST                      │ WebSocket (wss://)
            │                                │
            ▼                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                  BACKEND (Express.js + ws)                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  REST API Routes:                                          │ │
│  │  - /api/journal (GET/POST/PUT/DELETE)                     │ │
│  │  - /api/habits (GET/POST/PUT/DELETE)                      │ │
│  │  - /api/rooms (GET rooms, GET messages)                   │ │
│  │  - /api/resources (GET by category)                       │ │
│  │  - /api/moderation (GET reports, POST flag)               │ │
│  │                                                             │ │
│  │  WebSocket Server:                                         │ │
│  │  - Real-time chat messaging                                │ │
│  │  - Room join/leave events                                  │ │
│  │  - Crisis detection integration                            │ │
│  │                                                             │ │
│  │  Services:                                                  │ │
│  │  - Crisis Detection (HuggingFace API + keywords)          │ │
│  │  - Chat Server (WebSocket management)                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                Deployed on: Render or Railway                    │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            │ Supabase Client SDK
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SUPABASE (Database + Auth)                    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  PostgreSQL Database (8 tables):                          │ │
│  │  - profiles (user info)                                   │ │
│  │  - rooms (chat rooms)                                     │ │
│  │  - messages (chat history + risk_level)                  │ │
│  │  - journal_entries (private notes)                        │ │
│  │  - habits (user habits)                                   │ │
│  │  - habit_logs (daily tracking)                            │ │
│  │  - resources (curated content)                            │ │
│  │  - reports (moderation flags)                             │ │
│  │  - volunteers (moderator access)                          │ │
│  │                                                             │ │
│  │  Row Level Security (RLS):                                 │ │
│  │  - Users can only see/edit their own data                 │ │
│  │  - Messages visible to room members only                   │ │
│  │  - Journal entries completely private                      │ │
│  │                                                             │ │
│  │  Authentication:                                            │ │
│  │  - Anonymous sign-in (no email required)                   │ │
│  │  - JWT tokens for API authentication                       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                      Managed by: Supabase                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS API Calls
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    HUGGINGFACE INFERENCE API                    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Model: cardiffnlp/twitter-roberta-base-emotion          │ │
│  │  Input: Chat message text                                 │ │
│  │  Output: Emotion scores (anger, fear, sadness, etc.)     │ │
│  │  Rate Limit: 1000 calls/day (free tier)                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                      Managed by: HuggingFace                    │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Examples

**1. User Sends Chat Message:**
```
User types message → Frontend (React) → WebSocket client
  → Backend WebSocket server → Crisis detection (HuggingFace API)
  → Save to Supabase (messages table with risk_level)
  → Broadcast to all users in room (via WebSocket)
  → Display in chat UI
```

**2. User Creates Journal Entry:**
```
User writes entry → Frontend form → HTTP POST /api/journal
  → Backend validates JWT → Supabase insert (with RLS check)
  → Return success → Update UI
```

**3. User Joins Chat Room:**
```
User clicks room → WebSocket send "join" event
  → Backend adds user to room map → Fetch last 50 messages
  → Send message history to user → User sees chat
```

---

## 📁 Folder Structure

```
openmindwell/
│
├── backend/                              # Node.js Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts                  # Config validation & export
│   │   ├── lib/
│   │   │   └── supabase.ts               # Supabase client & types
│   │   ├── middleware/
│   │   │   └── auth.ts                   # JWT authentication
│   │   ├── routes/
│   │   │   ├── journal.ts                # Journal CRUD endpoints
│   │   │   ├── habits.ts                 # Habits CRUD + logging
│   │   │   ├── resources.ts              # Resource listing
│   │   │   ├── rooms.ts                  # Room & message queries
│   │   │   └── moderation.ts             # Reporting & flagging
│   │   ├── services/
│   │   │   ├── crisisDetection.ts        # AI + keyword analysis
│   │   │   └── chatServer.ts             # WebSocket server logic
│   │   ├── scripts/
│   │   │   └── setupDatabase.ts          # Helper for DB setup
│   │   └── index.ts                      # Main Express server
│   ├── database/
│   │   └── schema.sql                    # PostgreSQL schema (CRITICAL)
│   ├── .env.example                      # Backend env template
│   ├── Dockerfile                        # Docker container config
│   ├── render.yaml                       # Render deployment config
│   ├── DEPLOYMENT.md                     # Backend deploy guide
│   ├── package.json                      # Backend dependencies
│   └── tsconfig.json                     # TypeScript config
│
├── frontend/                             # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx                # Root layout
│   │   │   ├── page.tsx                  # Landing page
│   │   │   ├── onboarding/
│   │   │   │   └── page.tsx              # Anonymous signup
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx              # Main app UI
│   │   │   └── globals.css               # Global styles
│   │   └── lib/
│   │       ├── supabase.ts               # Supabase client
│   │       └── api.ts                    # API client functions
│   ├── .env.local.example                # Frontend env template
│   ├── next.config.js                    # Next.js config
│   ├── tailwind.config.ts                # Tailwind config
│   ├── postcss.config.js                 # PostCSS config
│   ├── package.json                      # Frontend dependencies
│   └── tsconfig.json                     # TypeScript config
│
├── .github/                              # (Future) CI/CD workflows
├── .vscode/
│   └── extensions.json                   # Recommended extensions
│
├── .env.example                          # Root env template
├── .gitignore                            # Git ignore rules
├── package.json                          # Monorepo scripts
├── README.md                             # Project README
├── LICENSE                               # MIT License
├── CONTRIBUTING.md                       # Contribution guide
├── OPENMINDWELL_PROJECT_GUIDE.md         # ← YOU ARE HERE
└── PROJECT_SUMMARY.md                    # Quick reference checklist
```

### Key File Descriptions

| File | Purpose |
|------|---------|
| `backend/database/schema.sql` | **MOST IMPORTANT** - Defines all database tables, RLS policies, and seed data. Run this in Supabase SQL editor. |
| `backend/src/index.ts` | Main backend entry point. Starts Express server and WebSocket server. |
| `backend/src/services/crisisDetection.ts` | Analyzes messages for mental health crises using HuggingFace AI and keyword patterns. |
| `backend/src/services/chatServer.ts` | Manages WebSocket connections, room memberships, message broadcasting. |
| `frontend/src/app/dashboard/page.tsx` | Main application interface with tabs for Rooms, Journal, Habits, Resources. |
| `frontend/src/lib/api.ts` | HTTP client for backend API calls (journal, habits, etc.). |
| `.env.example` files | Templates for environment variables. Copy to `.env` and fill in. |

---

## 🔐 Environment Variables

### Backend Variables (`backend/.env`)

| Variable | Description | Example | Required? |
|----------|-------------|---------|-----------|
| `SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` | ✅ Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbG...` | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (admin) | `eyJhbG...` | ✅ Yes |
| `HUGGINGFACE_API_TOKEN` | HuggingFace API token | `hf_abc123...` | ⚠️ Optional* |
| `FRONTEND_URL` | Frontend domain for CORS | `http://localhost:3000` | ✅ Yes |
| `PORT` | Backend server port | `3001` | ⚠️ Optional** |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` (15 min) | ❌ No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` | ❌ No |

*Falls back to keyword-based crisis detection if not provided.  
**Defaults to `3001` if not set. Render/Railway will auto-set this in production.

### Frontend Variables (`frontend/.env.local`)

| Variable | Description | Example | Required? |
|----------|-------------|---------|-----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:3001` | ✅ Yes |
| `NEXT_PUBLIC_WS_URL` | WebSocket server URL | `ws://localhost:3001` | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://abc123.supabase.co` | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbG...` | ✅ Yes |

**Production values:**
- `NEXT_PUBLIC_API_BASE_URL`: `https://your-backend.onrender.com`
- `NEXT_PUBLIC_WS_URL`: `wss://your-backend.onrender.com`

---

## 🚀 Local Development Setup

### Prerequisites

- **Node.js** 18+ (check with `node -v`)
- **npm** 9+ (check with `npm -v`)
- **Git** (check with `git --version`)
- **Supabase account** (free tier)
- **HuggingFace account** (optional, free tier)

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/openmindwell.git
cd openmindwell
```

#### 2. Install Root Dependencies

```bash
npm install
```

This installs `concurrently` for running multiple servers.

#### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

#### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

#### 5. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **"New Project"**
3. Choose organization, name your project (e.g., `openmindwell`)
4. Set a strong database password (save it!)
5. Select a region (closest to you)
6. Wait ~2 minutes for project to provision

#### 6. Apply Database Schema

1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Open `backend/database/schema.sql` in your code editor
3. **Copy the entire file** (it's ~400 lines)
4. Paste into Supabase SQL Editor
5. Click **"Run"** (or press `Ctrl+Enter`)
6. You should see success message and 8 tables created
7. Click **"Table Editor"** to verify tables exist

#### 7. Get Supabase Credentials

1. In Supabase dashboard, click **"Project Settings"** (gear icon)
2. Click **"API"** in left sidebar
3. Copy these values:
   - **Project URL** (under "Config")
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys" - click "Reveal")

#### 8. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
HUGGINGFACE_API_TOKEN=hf_YourTokenHere  # Optional for now
FRONTEND_URL=http://localhost:3000
PORT=3001
```

#### 9. Configure Frontend Environment

```bash
cd ../frontend
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 10. Run the Application

From the **root directory**:

```bash
npm run dev
```

This starts:
- Backend on http://localhost:3001
- Frontend on http://localhost:3000

#### 11. Test the Application

1. Open http://localhost:3000 in your browser
2. You should see the landing page with disclaimers
3. Click **"Get Started"**
4. Enter a nickname (e.g., `TestUser123`)
5. Select an avatar emoji
6. Click **"Continue"**
7. You should see the dashboard with 4 tabs
8. Click **"Rooms"** to see 6 pre-created chat rooms
9. Click a room to join (chat interface coming soon)

#### 12. Verify Database

In Supabase Table Editor, check:
- **profiles** table has your new user
- **rooms** table has 6 rooms
- **resources** table has 8 resources

---

## 🆓 Free Service Accounts Setup

### Supabase (Database + Auth)

**Free Tier Limits:**
- 500 MB database storage
- 2 GB bandwidth/month
- 50,000 monthly active users
- Unlimited API requests

**Setup:**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended)
4. Create new organization (free)
5. Create new project
6. Save database password
7. Wait for provisioning (~2 min)
8. Apply schema from `backend/database/schema.sql`

**Get Credentials:**
- Project Settings → API
- Copy URL and both API keys

### HuggingFace (AI Crisis Detection)

**Free Tier Limits:**
- 1,000 API calls/day
- Rate limit: 30 requests/min
- Public models only

**Setup:**
1. Go to [huggingface.co](https://huggingface.co)
2. Click "Sign Up" (use Google/GitHub)
3. Verify email
4. Click profile icon → Settings
5. Click "Access Tokens" (left sidebar)
6. Click "New token"
7. Name: `openmindwell-crisis-detection`
8. Role: **Read**
9. Click "Generate"
10. Copy token (starts with `hf_...`)
11. Save in `backend/.env` as `HUGGINGFACE_API_TOKEN`

**Optional:** If you skip this, the backend will use keyword-based detection (less accurate but functional).

### Vercel (Frontend Hosting)

**Free Tier Limits:**
- Unlimited bandwidth
- 100 GB/month build time
- 100 deployments/day
- Custom domains (free SSL)

**Setup:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Use GitHub account (recommended)
4. Authorize Vercel access
5. You're ready to deploy!

**Deploy Steps:**
1. Push code to GitHub
2. In Vercel dashboard, click "Import Project"
3. Select your GitHub repo
4. Framework: **Next.js**
5. Root Directory: `frontend`
6. Add environment variables (from `frontend/.env.local`)
7. Click "Deploy"
8. Wait ~2 minutes
9. Get production URL (e.g., `openmindwell.vercel.app`)

### Render (Backend Hosting)

**Free Tier Limits:**
- 750 hours/month (enough for 1 service)
- Spins down after 15 min inactivity
- 512 MB RAM
- Shared CPU

**Setup:**
1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render access
5. Click "New +" → "Web Service"
6. Connect your GitHub repo
7. Settings:
   - **Name**: `openmindwell-backend`
   - **Runtime**: Docker
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Plan**: Free
8. Add environment variables (from `backend/.env`)
9. Click "Create Web Service"
10. Wait ~5 minutes for build
11. Get production URL (e.g., `openmindwell-backend.onrender.com`)

**Alternative: Railway**

Similar to Render, also has 500 hours/month free tier.

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repo
6. Railway auto-detects Dockerfile
7. Add environment variables
8. Deploy!

---

## 🌐 Deployment Guide

### Frontend Deployment (Vercel)

#### Option 1: Automatic (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Select your GitHub repo
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - Click "Deploy"

3. **Add Environment Variables:**
   - In Vercel project settings → Environment Variables
   - Add all from `frontend/.env.local`:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com
     NEXT_PUBLIC_WS_URL=wss://your-backend.onrender.com
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
     ```
   - Click "Save"

4. **Redeploy:**
   - Deployments tab → Click "..." → "Redeploy"

5. **Custom Domain (Optional):**
   - Settings → Domains
   - Add your domain (e.g., `openmindwell.org`)
   - Follow DNS instructions

#### Option 2: CLI

```bash
cd frontend
npx vercel
# Follow prompts
npx vercel --prod
```

### Backend Deployment (Render)

#### Using `render.yaml` (Recommended)

1. **Push code to GitHub** (must include `backend/render.yaml`)

2. **Create Web Service:**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Render detects `render.yaml` automatically
   - Click "Apply"

3. **Set Environment Variables:**
   - In service settings → Environment
   - Add variables from `backend/.env`:
     ```
     SUPABASE_URL
     SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     HUGGINGFACE_API_TOKEN
     FRONTEND_URL=https://your-frontend.vercel.app
     ```
   - `PORT` is auto-set by Render

4. **Manual Deploy:**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Wait ~5 minutes for Docker build

5. **Get URL:**
   - Copy service URL (e.g., `https://openmindwell-backend.onrender.com`)
   - Update frontend env vars with this URL

#### Using Dockerfile Directly

1. **New Web Service:**
   - Runtime: Docker
   - Dockerfile Path: `backend/Dockerfile`
   - Docker Build Context: `backend`

2. **Build Command:** (Leave blank, Dockerfile handles it)

3. **Start Command:** (Leave blank, Dockerfile has `CMD`)

### Backend Deployment (Railway - Alternative)

1. **New Project:**
   - [railway.app/new](https://railway.app/new)
   - Select "Deploy from GitHub repo"

2. **Settings:**
   - Root directory: `backend`
   - Builder: Dockerfile

3. **Variables:**
   - Add all from `backend/.env`
   - Railway auto-generates `PORT`

4. **Deploy:**
   - Click "Deploy Now"
   - Get public URL

### Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend health check passes (`/health`)
- [ ] CORS is configured (frontend can call backend)
- [ ] WebSocket connects (`wss://` URL)
- [ ] Database queries work (check Supabase logs)
- [ ] Crisis detection triggers (test with keyword)
- [ ] Anonymous sign-in works
- [ ] Environment variables are set correctly

### Troubleshooting Deployment

**Frontend won't load:**
- Check Vercel logs: Deployments → Click deployment → "Building"
- Verify `NEXT_PUBLIC_*` env vars are set
- Ensure `next.config.js` has correct backend URL

**Backend 500 errors:**
- Check Render logs: Service → Logs tab
- Verify Supabase credentials are correct
- Test database connection in Supabase dashboard
- Check `schema.sql` was applied

**WebSocket won't connect:**
- Ensure `wss://` (not `ws://`) for production
- Check backend allows WebSocket upgrades
- Verify CORS allows frontend origin

**CORS errors:**
- Check `FRONTEND_URL` in backend env vars
- Ensure it matches Vercel domain exactly
- Include `https://` protocol

---

## 🔒 Security & Privacy

### Row Level Security (RLS)

OpenMindWell uses PostgreSQL Row Level Security to ensure data privacy:

**Profiles:**
- Users can only read/update their own profile
- Enforced by: `auth.uid() = user_id`

**Journal Entries:**
- **Completely private** - only visible to entry owner
- No admin access
- Enforced by: `auth.uid() = user_id`

**Messages:**
- Visible to all users in the same room
- Enforced by: `room_id IN (SELECT id FROM rooms)`

**Habits & Habit Logs:**
- Users can only see/edit their own habits
- Enforced by: `auth.uid() = user_id`

**Resources:**
- Public read access for all users
- Only admins can insert/update

**Reports:**
- Users can create reports
- Only moderators can view all reports

### Authentication Flow

1. User clicks "Get Started"
2. Frontend calls `supabase.auth.signInAnonymously()`
3. Supabase creates anonymous session (JWT token)
4. Frontend receives session with `access_token`
5. All API calls include: `Authorization: Bearer <access_token>`
6. Backend validates JWT using Supabase public key
7. Backend extracts `user_id` from token claims
8. Database RLS policies enforce access based on `auth.uid()`

### Anonymous vs Pseudonymous

- **Anonymous**: No personal data (email, phone, real name)
- **Pseudonymous**: Users choose a nickname + emoji avatar
- **Session-based**: If user clears browser data, they lose access (by design for privacy)

### Crisis Detection Privacy

- Messages are analyzed for crisis keywords/emotions
- No data is sent to third parties except HuggingFace (temporary processing)
- HuggingFace does NOT store messages
- Risk levels are stored in database for moderation only

### Data Retention

- **Messages**: Kept indefinitely (for moderation/context)
- **Journal Entries**: Kept until user deletes
- **Accounts**: Anonymous accounts are permanent (no deletion flow yet)
- **Logs**: Backend logs rotate after 7 days (Render/Railway default)

### Moderation Best Practices

- All moderators should complete training (TODO: create guide)
- Review flagged messages within 24 hours
- Escalate critical risk messages to platform admins
- Never share user data outside platform
- Ban users only for severe violations (spam, abuse, illegal content)

### Vulnerabilities to Monitor

- **SQL Injection**: Mitigated by parameterized queries via Supabase client
- **XSS**: Mitigated by React's auto-escaping
- **CSRF**: Mitigated by SameSite cookies + JWT
- **Rate Limiting**: Implemented in backend (100 req/15min per IP)
- **DDoS**: Mitigated by Vercel/Render infrastructure

---

## 🤝 Contributing

### Ways to Contribute

- 🐛 **Bug Reports**: Open GitHub issues
- ✨ **Feature Requests**: Use issue templates
- 📝 **Documentation**: Improve this guide
- 💻 **Code**: Submit pull requests
- 🎨 **Design**: UI/UX improvements
- 🌍 **Localization**: Translate to other languages

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/openmindwell.git`
3. **Create branch**: `git checkout -b feature/your-feature`
4. **Make changes** and test locally
5. **Commit**: `git commit -m "feat: add new feature"`
6. **Push**: `git push origin feature/your-feature`
7. **Open Pull Request** on GitHub

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style (formatting, no logic change)
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add breathing exercise timer
fix: resolve WebSocket reconnection bug
docs: update deployment guide for Railway
```

### Code of Conduct

**We are committed to:**
- Respectful and inclusive communication
- Constructive feedback
- Prioritizing user safety and privacy
- Transparency in decision-making

**Zero tolerance for:**
- Harassment, hate speech, or discrimination
- Sharing private user data
- Malicious code or security exploits
- Spam or off-topic content

**Reporting:** Email conduct@openmindwell.org (TODO: set up)

### Getting Help

- 💬 **GitHub Discussions**: Ask questions, share ideas
- 📧 **Email**: support@openmindwell.org (TODO)
- 💻 **Discord**: Coming soon

---

## 🗺️ Roadmap

### Phase 1: Foundation (Current)
- [x] Anonymous authentication
- [x] Basic chat rooms
- [x] AI crisis detection
- [x] Private journaling
- [x] Habit tracking
- [x] Resource library
- [x] Moderation system
- [x] Deployment configs

### Phase 2: Enhanced UX (Next 3 Months)
- [ ] Real-time chat UI (WebSocket client)
- [ ] Notification system (new messages, mentions)
- [ ] User profiles (bio, status)
- [ ] Direct messaging (1-on-1)
- [ ] Emoji reactions on messages
- [ ] Dark mode toggle
- [ ] Mobile-responsive improvements

### Phase 3: Community Features (3-6 Months)
- [ ] Guided meditation audio
- [ ] Breathing exercise timer
- [ ] Mood tracking visualizations
- [ ] Habit streak leaderboard (opt-in)
- [ ] Volunteer application flow
- [ ] Peer support badge system
- [ ] Weekly wellness challenges

### Phase 4: Scale & Localization (6-12 Months)
- [ ] Internationalization (Spanish, French, Hindi, etc.)
- [ ] Mobile apps (React Native)
- [ ] Advanced moderation (auto-ban repeat offenders)
- [ ] Analytics dashboard (aggregate stats)
- [ ] Professional referral network
- [ ] Integration with external crisis lines
- [ ] Offline mode (PWA)

### Long-Term Vision
- [ ] AI therapy chatbot (ethical, limited scope)
- [ ] Video/audio chat rooms
- [ ] Support groups with facilitators
- [ ] Research partnerships (anonymized data)
- [ ] Fundraising for free tier expansion
- [ ] Certification program for moderators

---

## 📞 Support & Contact

### For Users
- **In Crisis?** Call 988 (US) or visit findahelpline.com
- **Technical Issues**: GitHub Issues
- **General Questions**: support@openmindwell.org (TODO)

### For Contributors
- **GitHub**: [github.com/yourusername/openmindwell](https://github.com/yourusername/openmindwell)
- **Discussions**: GitHub Discussions tab
- **Discord**: Coming soon

### For Researchers
- **Data Access**: Contact research@openmindwell.org (TODO)
- **Partnerships**: partnerships@openmindwell.org (TODO)

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file.

**Ethical Use Clause:**  
While this software is open-source, we ask that derivative works:
1. Maintain prominent mental health crisis disclaimers
2. Do NOT claim to provide professional medical services
3. Respect user privacy and anonymity
4. Contribute improvements back to the community

---

## 🙏 Acknowledgments

- **Supabase** - For generous free tier and excellent DX
- **HuggingFace** - For democratizing AI/ML access
- **Vercel** - For seamless Next.js hosting
- **Render/Railway** - For free backend hosting
- **Mental health advocates** - For inspiration and guidance
- **Open-source community** - For tools and support

---

## 📚 Additional Resources

### Mental Health Organizations
- **NAMI** (National Alliance on Mental Illness): nami.org
- **Mental Health America**: mhanational.org
- **Crisis Text Line**: crisistextline.org

### Development Resources
- **Next.js Docs**: nextjs.org/docs
- **Supabase Docs**: supabase.com/docs
- **TypeScript Handbook**: typescriptlang.org/docs

### Similar Projects
- **7 Cups**: 7cups.com (peer support chat)
- **TalkLife**: talklife.com (anonymous community)
- **Wysa**: wysa.io (AI chatbot)

---

**Last Updated**: November 23, 2024  
**Version**: 1.0.0  
**Maintainers**: OpenMindWell Core Team

---

*Built with 💙 by people who care about mental wellness*

*Remember: It's okay to not be okay. Seeking help is a sign of strength.*
