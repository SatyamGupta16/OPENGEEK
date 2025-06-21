import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenGeek Community | Real Projects for Student Developers",
  description: "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
  keywords: "student developers, tech community, coding projects, learn programming, developer community, paid projects, mentorship",
  authors: [{ name: "OpenGeek Community" }],
  creator: "OpenGeek Community",
  publisher: "OpenGeek Community",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opengeek.dev",
    siteName: "OpenGeek Community",
    title: "OpenGeek Community | Real Projects for Student Developers",
    description: "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OpenGeek Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenGeek Community | Real Projects for Student Developers",
    description: "Join OpenGeek - where student developers turn passion into profession. Get paid real-world projects, learn from mentors, and build your career in tech.",
    images: ["/og-image.jpg"],
    creator: "@opengeek",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-black antialiased`}>
        <Navbar />
        <main className="flex-grow relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
