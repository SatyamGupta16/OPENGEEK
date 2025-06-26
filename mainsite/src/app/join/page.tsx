'use client'

import { SpaceBackground } from "@/components/ui/space-background"
import { motion } from "framer-motion"
import { JoinForm } from "@/components/ui/join-form"

export default function JoinPage() {
  return (
    <div className="min-h-screen w-full bg-black antialiased">
      <SpaceBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-6 mt-10 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Join OpenGeek Community
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-400">
              Fill out the form below to apply for OpenGeek community membership
            </p>
          </div>

          <JoinForm />
        </motion.div>
      </div>
    </div>
  )
} 