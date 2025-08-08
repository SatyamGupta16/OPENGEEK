import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";
import { Toaster } from "@/components/ui/toaster";
import { ConnectionStatus } from "@/components/ui/connection-status";
import { AuthProvider } from "@/components/providers/auth-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://community.opengeek.in"),
  title: "OpenGeek Community 🚀",
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
    url: "https://community.opengeek.in",
    title: "OpenGeek Community - Tech Students & Developers Community India 🚀",
    description: "Join OpenGeek - India's emerging tech community for student developers. Get real-world projects, mentorship, internships, and build your career in software development. Connect with like-minded tech enthusiasts, learn programming, and grow together.",
    siteName: "OpenGeek Community",
    images: [{
      url: 'https://community.opengeek.in/banner.png',
      width: 1200,
      height: 630,
      alt: 'OpenGeek Community - Empowering Tech Enthusiasts in India',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenGeek Community | Tech Students & Developers Community India",
    description: "Join OpenGeek - India's emerging tech community for student developers. Get real-world projects, mentorship, internships, and build your career in software development.",
    images: ['https://community.opengeek.in/logo.png'],
    creator: "@opengeek_in",
    site: "@opengeek_in",
  },
  alternates: {
    canonical: 'https://community.opengeek.in',
  },
  category: 'Technology',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#10b981', // emerald-500
        }
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </AuthProvider>
          <Toaster />
          <ConnectionStatus />
        </body>
      </html>
    </ClerkProvider>
  );
}
