'use client'

import { SpaceBackground } from "@/components/ui/space-background"
import { motion } from "framer-motion"
import { CheckCircle2, Home } from "lucide-react"
import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen w-full mt-10 bg-black antialiased relative">
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
            Application Submitted Successfully!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-lg text-neutral-400"
          >
            Thank you for your interest in joining the OpenGeek community. We appreciate you taking the time to fill out the application.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-neutral-500"
          >
            Our team will review your application shortly. You will receive an email notification once your application has been processed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link href="/">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-4 h-4" />
                Return Home
              </motion.button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 text-sm text-neutral-500"
          >
            Stay tuned for updates via email. We look forward to potentially welcoming you to our community!
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
} 