'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, FileText, Calendar, Settings, Home, LogOut } from 'lucide-react'
import { AdminAuthProvider, useAdminAuth } from '@/lib/admin-auth'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Applications', href: '/admin/applications', icon: Users },
  { name: 'Blog', href: '/admin/blog', icon: FileText, disabled: true },
  { name: 'Events', href: '/admin/events', icon: Calendar, disabled: true },
  { name: 'Settings', href: '/admin/settings', icon: Settings, disabled: true },
]

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { isAuthenticated, isLoading, logout } = useAdminAuth()

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center">
        <div className="text-white/70">Loading...</div>
      </div>
    )
  }

  // Show login page without nav
  if (!isAuthenticated && pathname === '/admin/login') {
    return children
  }

  // Show nothing while not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link 
                href="/admin"
                className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400"
              >
                OpenGeek Admin
              </Link>
              <div className="hidden md:flex ml-10 space-x-8">
                {navItems.map((item) => {
                  const isActive = 
                    item.href === '/admin' 
                      ? pathname === '/admin'
                      : pathname?.startsWith(item.href)
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.disabled ? '#' : item.href}
                      className={`
                        inline-flex items-center px-1 pt-1 text-sm font-medium
                        ${item.disabled 
                          ? 'text-neutral-600 cursor-not-allowed' 
                          : isActive
                            ? 'text-white border-b-2 border-white'
                            : 'text-neutral-400 hover:text-white hover:border-b-2 hover:border-neutral-400'
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                      {item.disabled && (
                        <span className="ml-2 text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded">
                          Soon
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-neutral-400 hover:text-white text-sm flex items-center"
              >
                ← Back to Site
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-neutral-400 hover:text-white flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="pt-20 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminAuthProvider>
  )
} 