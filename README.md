
<div align="center">
  <img src="https://www.opengeek.in/banner.png" alt="OpenGeek Banner" style="width:100%; max-width:800px;"/>
  
  # 🌟 OPENGEEK – The Tech Community 🚀

  [![Stars](https://img.shields.io/github/stars/AhqafCoder/OPENGEEK?style=social)](https://github.com/AhqafCoder/OPENGEEK/stargazers)
  [![Forks](https://img.shields.io/github/forks/AhqafCoder/OPENGEEK?style=social)](https://github.com/AhqafCoder/OPENGEEK/network)
  [![Contributors](https://img.shields.io/github/contributors/AhqafCoder/OPENGEEK)](https://github.com/AhqafCoder/OPENGEEK/graphs/contributors)
  [![License](https://img.shields.io/github/license/AhqafCoder/OPENGEEK)](LICENSE)

</div>

---

Welcome to the official monorepo of **[OpenGeek](https://www.opengeek.in)** — a student-led tech community where ideas meet execution and collaboration builds careers. 


## 📁 Repository Structure

This monorepo contains all apps, platforms, and tools under the OpenGeek initiative.

```
OPENGEEK/
│
├── admin/                     # 🔧 Admin dashboard (React + Vite)
│   ├── client/                # Admin frontend (React + TypeScript + Vite)
│   │   ├── src/               # Admin app source code
│   │   ├── public/            # Static assets
│   │   ├── components.json    # UI/component library config
│   │   ├── vite.config.ts     # Vite configuration
│   │   ├── tsconfig.json      # TypeScript configuration
│   │   └── package.json       # Frontend dependencies
│   │
│   └── server/                # Admin backend (Express.js)
│       ├── index.js           # Admin API entry point
│       └── package.json       # Backend dependencies
│
├── communitysite/             # ✅ Main fullstack app (Client + Server)
│   ├── client/                # Frontend (Next.js + Tailwind + TypeScript)
│   │   ├── src/               # Main app source code (components, pages, utils)
│   │   ├── public/            # Static assets (favicon, logos, images)
│   │   ├── .next/             # Next.js build output
│   │   ├── components.json    # UI/component library config
│   │   ├── eslint.config.mjs  # ESLint configuration
│   │   ├── next.config.ts     # Next.js configuration
│   │   ├── tsconfig.json      # TypeScript configuration
│   │   ├── .env*              # Environment variables
│   │   └── package.json       # Frontend dependencies
│   │
│   ├── server/                # Backend (Express.js + PostgreSQL)
│   │   ├── config/            # Database and app configuration
│   │   ├── database-scripts/  # Database setup and migration scripts
│   │   ├── middleware/        # Express middleware (auth, validation, etc.)
│   │   ├── routes/            # API route handlers
│   │   ├── utils/             # Utility functions
│   │   ├── index.js           # API entry point (Express app)
│   │   ├── .env*              # Server environment variables
│   │   ├── render.yaml        # Render deployment config
│   │   └── package.json       # Backend dependencies
│   │
│   ├── CLOUDINARY_INTEGRATION_GUIDE.md
│   ├── SYSTEM_ARCHITECTURE_DOCUMENTATION.txt
│   └── README.md
│
├── enterprise/                # 🏢 Enterprise platform (Next.js)
│   ├── src/                   # Enterprise app source code
│   │   ├── app/               # Next.js App Router pages
│   │   └── components/        # React components
│   ├── public/                # Static assets
│   ├── .next/                 # Next.js build output
│   ├── next.config.ts         # Next.js configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Dependencies
│
├── mainsite/                  # 🌐 Marketing/landing site for opengeek.in
│   ├── src/                   # Next.js source code
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utility libraries
│   │   └── middleware.ts      # Next.js middleware
│   ├── public/                # Static assets (images, icons, etc.)
│   ├── next.config.ts         # Next.js configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── vercel.json            # Vercel deployment config
│   └── package.json           # Dependencies
│
├── .vscode/                   # VS Code workspace settings
├── LICENSE
└── README.md                  # Project overview and setup guide
```

---

## ⚙️ Tech Stack

### Frontend
- **Next.js** - React framework for SSR & SSG
- **TypeScript** - Static typing for scalable code
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint + Prettier** - Code linting & formatting

### Backend
- **Express.js** - Node.js web framework
- **PostgreSQL** - Relational database
- **Node.js** - JavaScript runtime environment

---

## 🌐 Project Overview

| Folder              | Description | Status |
|---------------------|-------------|--------|
| `communitysite`     | **Main OpenGeek community platform** - Full-stack social platform with posts, projects, user profiles, and real-time interactions | ✅ **Active** |
| `mainsite`          | **Marketing/landing site** - Public-facing website for [www.opengeek.in](https://www.opengeek.in) with community info and onboarding | ✅ **Active** |
| `enterprise`        | **Enterprise platform** - Business-focused platform for organizations and enterprise users | 🚧 **In Development** |
| `admin`             | **Admin dashboard** - Management interface for community moderation, analytics, and platform administration | 🚧 **In Development** |

---

## 🧪 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (for backend)

### Running the Community Site

1. **Frontend (Client)**
   ```bash
   cd communitysite/client
   npm install
   npm run dev
   ```

2. **Backend (Server)**
   ```bash
   cd communitysite/server
   npm install
   # Set up your .env file with database credentials
   npm start
   ```

### Running the Main Site

```bash
cd mainsite
npm install
npm run dev
```

The applications will be available at:
- Community Site Frontend: `http://localhost:3000`
- Community Site Backend: `http://localhost:5000` (or your configured port)
- Main Site: `http://localhost:3000`

---

## 🚀 About OpenGeek

**OpenGeek** is not just a community — it's a movement.  
We are a developer-driven, student-powered tech collective focused on:

- 🌱 Learning by **Building**
- 🤝 Collaboration over Competition
- 🧩 Solving Real-World Problems
- 💡 Hackathons, Open Source, and Innovation

Join our mission at 👉 **[www.opengeek.in](https://www.opengeek.in)**

Stay connected:

- 🌐 Website: [www.opengeek.in](https://www.opengeek.in)
- 📸 Instagram: [@opengeek.in](https://instagram.com/opengeek.in)
- 💬 Discord: [Join our Discord](https://discord.gg/WsmZ6eupnk)
- ✨ GitHub Org: [OPENGEEK COMMUNITY](https://github.com/OPENGEEK-COMMUNITY)

---

## 🤝 Contributing

We love contributions from the community! Here's how you can help:

1. Fork this repo 🍴
2. Create a new branch 🔧
3. Make your changes 💻
4. Open a Pull Request ✅

For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

> Made with ❤️ by the **AhqafCoder & Vivek12coder** — because we believe in coding not just for placements, but for **purpose.**
