'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow relative">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster richColors position="top-center" />
    </>
  )
} 