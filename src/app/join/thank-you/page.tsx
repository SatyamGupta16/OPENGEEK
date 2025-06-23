'use client'

import { useEffect } from 'react'
import { SpaceBackground } from "@/components/ui/space-background"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function ThankYouPage() {
  useEffect(() => {
    // Open WhatsApp group in a new tab when component mounts
    window.open('https://chat.whatsapp.com/HXQnlpYjI1tELYU2zUgCe7', '_blank')
  }, [])

  return (
    <div className="min-h-screen w-full bg-black antialiased relative">
      <SpaceBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400"
          >
            Welcome to OpenGeek!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-lg text-neutral-400"
          >
            Thank you for joining our community. We're excited to have you on board!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-2 text-neutral-500"
          >
            We've opened our WhatsApp group in a new tab for you to join.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <motion.a
              href="https://chat.whatsapp.com/HXQnlpYjI1tELYU2zUgCe7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join WhatsApp Group
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 text-sm text-neutral-500"
          >
            If you have any questions, feel free to reach out to us in the WhatsApp group.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
} 