'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminAuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    try {
      // Check if admin is authenticated on mount
      const adminAuth = localStorage.getItem('adminAuth')
      if (adminAuth) {
        const { expiresAt } = JSON.parse(adminAuth)
        if (new Date().getTime() < expiresAt) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('adminAuth')
          if (window.location.pathname.startsWith('/admin') && 
              window.location.pathname !== '/admin/login') {
            router.push('/admin/login')
          }
        }
      } else if (window.location.pathname.startsWith('/admin') && 
                 window.location.pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      localStorage.removeItem('adminAuth')
      if (window.location.pathname.startsWith('/admin') && 
          window.location.pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const login = async (password: string) => {
    try {
      // In a real app, this would be an API call to verify credentials
      if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
        localStorage.setItem('adminAuth', JSON.stringify({ expiresAt }))
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Error during login:', error)
      return false
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem('adminAuth')
      setIsAuthenticated(false)
      router.push('/admin/login')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
} 