'use client'

import { motion } from 'framer-motion'
import { Users, FileText, Calendar, Settings } from 'lucide-react'
import Link from 'next/link'

const adminFeatures = [
  {
    title: 'Applications',
    href: '/admin/applications',
    icon: Users,
    description: 'Manage community applications',
    available: true
  },
  {
    title: 'Blog Posts',
    href: '/admin/blog',
    icon: FileText,
    description: 'Manage blog content',
    available: false
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
    description: 'Manage community events',
    available: false
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Admin settings',
    available: false
  }
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-neutral-400">Manage your community platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminFeatures.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={feature.available ? feature.href : '#'}
              className={`block p-6 rounded-lg border ${
                feature.available 
                  ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/50'
                  : 'border-neutral-800/50 bg-neutral-900/30 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-4">
                <feature.icon className={`w-6 h-6 ${feature.available ? 'text-white' : 'text-neutral-600'}`} />
                <div>
                  <h2 className={`text-lg font-medium ${feature.available ? 'text-white' : 'text-neutral-600'}`}>
                    {feature.title}
                  </h2>
                  <p className={`mt-1 text-sm ${feature.available ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {feature.description}
                  </p>
                  {!feature.available && (
                    <span className="inline-block mt-2 text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 