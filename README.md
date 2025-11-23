# OpenMindWell 🌱

**Open-source, anonymous mental health support platform**

> ⚠️ **IMPORTANT DISCLAIMER**: OpenMindWell is NOT a substitute for professional mental health care. If you are in crisis, please contact emergency services or a crisis hotline immediately.

## 🌟 Features

- **Anonymous Chat Rooms** - Join peer support groups without revealing identity
- **AI Crisis Detection** - Automatic detection of concerning messages with resource suggestions
- **Private Journaling** - Track mood, thoughts, and personal reflections
- **Habit Tracking** - Build positive daily habits with streak tracking
- **Resource Library** - Curated mental health resources, hotlines, and exercises
- **Volunteer Moderation** - Community-driven safety and support

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/openmindwell.git
cd openmindwell

# Install dependencies
npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
# Edit .env files with your credentials

# Run both servers
npm run dev
```

Visit http://localhost:3000

## 📚 Documentation

**READ THIS FIRST:** [OPENMINDWELL_PROJECT_GUIDE.md](./OPENMINDWELL_PROJECT_GUIDE.md)

This comprehensive guide contains:
- Complete setup instructions
- Free service account creation
- Deployment guides
- Security considerations
- Contribution guidelines

## 🛠️ Tech Stack

**100% Free Services:**
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS → Vercel
- **Backend**: Node.js, Express, WebSocket, TypeScript → Render/Railway
- **Database**: Supabase (PostgreSQL + Auth)
- **AI**: HuggingFace Inference API (emotion detection)

## 📁 Project Structure

```
openmindwell/
├── backend/           # Express API + WebSocket server
├── frontend/          # Next.js application
├── OPENMINDWELL_PROJECT_GUIDE.md
├── CONTRIBUTING.md
└── package.json       # Monorepo scripts
```

## 🔒 Safety Features

- Prominent crisis disclaimers throughout the app
- AI-powered crisis detection on all messages
- Automatic resource suggestions
- User reporting and moderation system
- Anonymous/pseudonymous accounts only
- Row-level security on all data

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

Perfect for:
- 🎓 GSoC, Hacktoberfest, WoC programs
- 💼 Portfolio projects
- 🌍 Making a social impact

## 📞 Crisis Resources

**If you're in crisis:**
- 🇺🇸 **988 Suicide & Crisis Lifeline**: Call/Text 988
- 🇺🇸 **Crisis Text Line**: Text HOME to 741741
- 🌍 **International**: findahelpline.com

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details

## ⚠️ Ethical Use

This platform is designed to:
- ✅ Provide peer support and community
- ✅ Share coping strategies and resources
- ✅ Reduce stigma around mental health

This platform is NOT:
- ❌ A replacement for therapy or medical treatment
- ❌ Qualified to diagnose or treat mental health conditions
- ❌ A crisis intervention service

---

**Built with 💙 for mental wellness by Team ZenYukti**

*Remember: Seeking professional help is a sign of strength, not weakness.*
