import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/layout/ClientLayout"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'sans-serif']
})

export const metadata: Metadata = {
  metadataBase: new URL("https://opengeek.in"),
  title: "OpenGeek Community - Tech Students & Developers Community India 🚀",
  description: "Join OpenGeek - India's emerging tech community for student developers. Get real-world projects, mentorship, internships, and build your career in software development. Connect with like-minded tech enthusiasts, learn programming, and grow together.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  keywords: [
    // OpenGeek Name Variations
    "OpenGeek",
    "Open Geek",
    "OpenGeek.in",
    "OpenGeek.com",
    "OpenGeekCommunity",
    "Open Geek Community",
    "OpenGeekIndia",
    "Open Geek India",
    "OpenGeekTech",
    "Open Geek Tech",
    "OpenGeekDev",
    "Open Geek Dev",
    "OpenGeekHub",
    "Open Geek Hub",
    "OpenGeekNetwork",
    "Open Geek Network",
    "OpenGeekPlatform",
    "Open Geek Platform",
    "OpenGeekStudents",
    "Open Geek Students",

    // Community & Platform
    "OpenGeek community",
    "tech community India",
    "student developer platform",
    "coding community",
    "developer network",
    "tech enthusiasts hub",
    "programming community",
    "software development community",
    "tech students network",
    "OpenGeek platform",
    
    // Learning & Development
    "programming mentorship",
    "coding education",
    "software development learning",
    "tech skill development",
    "programming tutorials",
    "coding workshops",
    "developer resources",
    "tech learning platform",
    "programming guidance",
    "coding best practices",
    
    // Career & Opportunities
    "tech internships",
    "software development jobs",
    "student developer opportunities",
    "tech career growth",
    "programming projects",
    "real-world coding projects",
    "paid tech projects",
    "developer portfolio building",
    "tech resume enhancement",
    "coding experience",
    
    // Technologies & Skills
    "web development",
    "mobile app development",
    "full stack development",
    "frontend development",
    "backend development",
    "cloud computing",
    "DevOps practices",
    "software engineering",
    "coding skills",
    "programming languages",
    
    // Community Features
    "tech events",
    "coding competitions",
    "hackathons",
    "developer meetups",
    "tech workshops",
    "programming webinars",
    "code reviews",
    "peer learning",
    "tech discussions",
    "developer collaboration",
    
    // Student Focus
    "student developers",
    "college programmers",
    "tech students",
    "engineering students",
    "computer science students",
    "IT students",
    "aspiring developers",
    "coding beginners",
    "tech freshers",
    "programming learners"
  ],
  authors: [{ name: "OpenGeek Community" }],
  creator: "OpenGeek Community",
  publisher: "OpenGeek Community",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://opengeek.in",
    title: "OpenGeek Community - Tech Students & Developers Community India 🚀",
    description: "Join OpenGeek - India's emerging tech community for student developers. Get real-world projects, mentorship, internships, and build your career in software development. Connect with like-minded tech enthusiasts, learn programming, and grow together.",
    siteName: "OpenGeek Community",
    images: [{
      url: 'https://opengeek.in/banner.png',
      width: 1200,
      height: 630,
      alt: 'OpenGeek Community - Empowering Tech Enthusiasts in India',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenGeek Community | Tech Students & Developers Community India",
    description: "Join OpenGeek - India's emerging tech community for student developers. Get real-world projects, mentorship, internships, and build your career in software development.",
    images: ['https://opengeek.in/logo.png'],
    creator: "@opengeek_in",
    site: "@opengeek_in",
  },
  alternates: {
    canonical: 'https://opengeek.in',
  },
  category: 'Technology',
}

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black antialiased overflow-x-hidden`}>
        <div className="relative w-full">
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster theme="dark" position="top-center" />
        </div>
      </body>
    </html>
  )
}