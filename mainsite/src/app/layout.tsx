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
  metadataBase: new URL("https://opengeek.in"),
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
    url: "https://opengeek.in",
    title: "OpenGeek Community 🚀",
    description:
      "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
    siteName: "OpenGeek Community",
    images: [{
      url: 'https://opengeek.in/banner.png',
      
      alt: 'OpenGeek Community - Empowering Tech Enthusiasts',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenGeek Community | Real Projects for Student Developers",
    description:
      "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
    images: ['https://opengeek.in/banner.png'],
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
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black antialiased overflow-x-hidden`}>
        <div className="relative w-full">
          <ClientLayout>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  )
}