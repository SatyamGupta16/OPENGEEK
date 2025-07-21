# 🧠 OPENGEEK – Monorepo for Community Projects

Welcome to the official **OpenGeek** GitHub repository — a monorepo containing all community-driven apps and tools that power the OpenGeek tech ecosystem.

## 📁 Repository Structure

This monorepo contains multiple independent projects under the OpenGeek initiative.

```
OPENGEEK/
├── community/              # First Next.js community project (WIP or legacy)
├── community2/             # Second version or iteration
├── communitysite/          # Main Next.js + Tailwind + TS community platform
│   ├── public/
│   ├── src/
│   ├── next.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── ...
├── mainsite/               # Reserved for future OpenGeek main website
├── Retarded_versions/      # Archived or older experimental versions
├── LICENSE
└── README.md
```

## ⚙️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Tooling**: ESLint, PostCSS, Prettier
- **Bundler (where applicable)**: Vite

## 📌 Project Overview

| Folder              | Description |
|---------------------|-------------|
| `community`         | Initial or legacy Next.js-based community version |
| `community2`        | Alternate build or improved experimental version |
| `communitysite`     | ✅ Main production-grade community site (Next.js + TS + Tailwind) |
| `mainsite`          | Placeholder for OpenGeek's official site |
| `Retarded_versions` | Old or experimental broken builds, kept for reference |

## 🧪 Getting Started

To run any project:

```bash
cd <project-folder>
npm install
npm run dev
```

> Example:
> ```bash
> cd communitysite
> npm install
> npm run dev
> ```

## 🤝 Contributing

We’re building this together!  
If you have ideas, feedback, or want to contribute, feel free to open an issue or pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🌐 About OpenGeek

**OpenGeek** is a developer-led student community focused on learning by building.  
We encourage real projects, peer collaboration, and technical growth — beyond just academic placements.

> Built with ❤️ by the OpenGeek Community
