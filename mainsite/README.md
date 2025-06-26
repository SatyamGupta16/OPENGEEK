# OpenGeek

A modern web application built with Next.js 15, React 19, and TailwindCSS. This project was bootstrapped with `create-next-app` using the app router and TypeScript configuration.

## Features

- ⚡️ Next.js 15 with App Router
- 🎨 TailwindCSS for styling
- 📝 TypeScript support
- 🔍 ESLint for code linting
- 🚀 Turbopack for fast development
- 📱 Responsive design
- 🎯 SEO optimized

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/opengeek.git
cd opengeek
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
opengeek/
├── src/
│   └── app/          # App router components
│       ├── layout.tsx
│       └── page.tsx
├── public/           # Static assets
├── next.config.ts    # Next.js configuration
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.js # TailwindCSS configuration
└── tsconfig.json    # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Runs the development server with Turbopack
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check code quality

## Technologies

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - JavaScript library for user interfaces
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [ESLint](https://eslint.org/) - Code linting tool

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms of the license included in the repository.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
