
  <img src="https://www.opengeek.in/banner.png" alt="OpenGeek Banner" style="width:100%; max-width:800px;"/>
<br>
<div align="center">

# 🌟 OPENGEEK – The Tech Community 🚀
<br>

[![Stars](https://img.shields.io/github/stars/AhqafCoder/OPENGEEK?style=social)](https://github.com/AhqafCoder/OPENGEEK/stargazers)
[![Forks](https://img.shields.io/github/forks/AhqafCoder/OPENGEEK?style=social)](https://github.com/AhqafCoder/OPENGEEK/network)
[![Contributors](https://img.shields.io/github/contributors/AhqafCoder/OPENGEEK)](https://github.com/AhqafCoder/OPENGEEK/graphs/contributors)

</div>



<br>
<br>


 Welcome to the official monorepo of **[OpenGeek](https://www.opengeek.in)** — a student-led tech community where ideas meet execution and collaboration builds careers. 


## 📁 Repository Structure

This monorepo contains all apps, platforms, and tools under the OpenGeek initiative.

```

OPENGEEK/
│
├── communitysite/             # ✅ Main fullstack app (Client + Server)
│   ├── client/                # — Frontend (Next.js + Tailwind + TS)
│   │   ├── .next/             # Next.js build output
│   │   ├── node_modules/      # Frontend dependencies
│   │   ├── public/            # Static assets (favicon, logos, images)
│   │   ├── src/               # Main app source code (components, pages, utils)
│   │   ├── .gitignore
│   │   ├── components.json    # UI/component library config
│   │   ├── eslint.config.mjs  # ESLint config
│   │   ├── next-env.d.ts      # Next.js type declarations
│   │   ├── next.config.ts     # Next.js configuration
│   │   ├── postcss.config.mjs # PostCSS config (Tailwind plugin usage)
│   │   ├── tailwind.config.js # Tailwind CSS config
│   │   ├── tsconfig.json      # TypeScript config
│   │   ├── package.json
│   │   └── package-lock.json
│   │
│   └── server/              # ✅ Backend (Express.js + PostgreSQL)
│       ├── node_modules/
│       ├── index.js           # API entry point (Express app)
│       ├── .env               # Server environment variables (DB_URL, etc.)
│       ├── .gitignore
│       ├── package.json
│       └── package-lock.json
│
├── mainsite/                  # (Marketing or landing site for opengeek.in)
│
├── LICENSE
└── README.md                  # Project overview, setup, usage


```

---

## ⚙️ Tech Stack

| Tool            | Description                          |
|-----------------|--------------------------------------|
| Next.js         | React Framework for SSR & SSG        |
| Tailwind CSS    | Utility-first CSS for styling        |
| TypeScript      | Static typing for scalable code      |
| ESLint + Prettier | Code linting & formatting          |
| Vite (optional) | Fast bundler for specific apps       |

---

## 🌐 Project Overview

| Folder              | Description |
|---------------------|-------------|
| `community`         | Legacy version of the community site (maintained)  |
| `communitysite`     | ✅ **Main OpenGeek community platform** (under development)|
| `mainsite`          | Placeholder for the main [www.opengeek.in](https://www.opengeek.in) website |

---

## 🧪 Getting Started

To run any of the projects locally:

```bash
cd <project-folder>
npm install
npm run dev
```

Example:

```bash
cd communitysite
npm install
npm run dev
```

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
- 💬 Discord: [OPENGEEK](https://discord.gg/WsmZ6eupnk)
- ✨ GitHub Org: [[OPENGEEK COMMUNITY]([https://github.com/OpenGeek-In](https://github.com/OPENGEEK-COMMUNITY))](https://github.com/OPENGEEK-COMMUNITY)

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
