
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
├── communitysite/             # ✅ Main fullstack app (Client + Server)
│   ├── client/                # Frontend (Next.js + Tailwind + TypeScript)
│   │   ├── public/            # Static assets (favicon, logos, images)
│   │   ├── src/               # Main app source code (components, pages, utils)
│   │   ├── components.json    # UI/component library config
│   │   ├── eslint.config.mjs  # ESLint configuration
│   │   ├── next.config.ts     # Next.js configuration
│   │   ├── tailwind.config.js # Tailwind CSS configuration
│   │   ├── tsconfig.json      # TypeScript configuration
│   │   └── package.json       # Frontend dependencies
│   │
│   ├── server/                # Backend (Express.js + PostgreSQL)
│   │   ├── index.js           # API entry point (Express app)
│   │   ├── .env               # Server environment variables
│   │   └── package.json       # Backend dependencies
│   │
│   ├── CLOUDINARY_INTEGRATION_GUIDE.md
│   ├── SYSTEM_ARCHITECTURE_DOCUMENTATION.txt
│   └── README.md
│
├── mainsite/                  # Marketing/landing site for opengeek.in
│   ├── src/                   # Next.js source code
│   ├── public/                # Static assets
│   ├── next.config.ts         # Next.js configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── package.json           # Dependencies
│
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

| Folder              | Description |
|---------------------|-------------|
| `communitysite`     | ✅ **Main OpenGeek community platform** (Full-stack app with Next.js frontend and Express.js backend)|
| `mainsite`          | Marketing/landing site for [www.opengeek.in](https://www.opengeek.in) |

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
