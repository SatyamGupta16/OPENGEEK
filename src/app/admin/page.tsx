'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { Users, FileText, Calendar, Settings, MessageSquare, BookOpen, Code, Award } from 'lucide-react'

const adminFeatures = [
  {
    title: 'Community Applications',
    description: 'Review and manage community membership applications',
    icon: Users,
    href: '/admin/applications',
    color: 'bg-blue-500',
    available: true
  },
  {
    title: 'Blog Posts',
    description: 'Manage blog posts and articles',
    icon: FileText,
    href: '/admin/blog',
    color: 'bg-purple-500',
    available: false
  },
  {
    title: 'Events',
    description: 'Create and manage community events',
    icon: Calendar,
    href: '/admin/events',
    color: 'bg-green-500',
    available: false
  },
  {
    title: 'Internships',
    description: 'Manage internship opportunities',
    icon: Award,
    href: '/admin/internships',
    color: 'bg-yellow-500',
    available: false
  },
  {
    title: 'Projects',
    description: 'Oversee community projects and contributions',
    icon: Code,
    href: '/admin/projects',
    color: 'bg-red-500',
    available: false
  },
  {
    title: 'Resources',
    description: 'Manage learning resources and documentation',
    icon: BookOpen,
    href: '/admin/resources',
    color: 'bg-indigo-500',
    available: false
  },
  {
    title: 'Discussions',
    description: 'Moderate community discussions and forums',
    icon: MessageSquare,
    href: '/admin/discussions',
    color: 'bg-pink-500',
    available: false
  },
  {
    title: 'Settings',
    description: 'Configure admin dashboard settings',
    icon: Settings,
    href: '/admin/settings',
    color: 'bg-gray-500',
    available: false
  }
]

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400">
          Admin Dashboard
        </h1>
        <p className="text-neutral-400 mt-2">
          Manage and oversee all aspects of the OpenGeek community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adminFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={feature.available ? feature.href : '#'}>
              <Card className={`relative h-full bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-all ${!feature.available && 'opacity-50 cursor-not-allowed'}`}>
                {!feature.available && (
                  <div className="absolute top-2 right-2 text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">
                    Coming Soon
                  </div>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-neutral-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 