import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/layout/ClientLayout"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'sans-serif']
})

export const metadata: Metadata = {
  metadataBase: new URL("https://opengeek.dev"),
  title: "OpenGeek Community | Real Projects for Student Developers",
  description: "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
  keywords: [
    "student developers",
    "tech community",
    "programming projects",
    "software development",
    "coding mentorship",
    "tech internships",
    "learn to code",
    "developer community",
  ],
  authors: [{ name: "OpenGeek Community" }],
  creator: "OpenGeek Community",
  publisher: "OpenGeek Community",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opengeek.dev",
    title: "OpenGeek Community | Real Projects for Student Developers",
    description:
      "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
    siteName: "OpenGeek Community",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenGeek Community | Real Projects for Student Developers",
    description:
      "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-black antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
