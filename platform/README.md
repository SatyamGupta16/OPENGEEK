# OpenGeek Platform

A React-based platform with Supabase authentication, built with Vite, TailwindCSS, and ShadcnUI.

## Features

- User authentication with Supabase (email/password)
- Protected routes
- Responsive design
- Modern UI with TailwindCSS
- Type-safe development with TypeScript

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src`
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/lib` - Utility functions and configurations
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point

## Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Technologies Used

- React
- Vite
- TypeScript
- TailwindCSS
- Supabase
- React Router DOM
- Lucide React (icons)
