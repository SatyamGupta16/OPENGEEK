"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, ArrowRight } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-28 h-28 bg-primary/10 rounded-full blur-xl -z-10" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-xl -z-10" />
          
          {/* Heading Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10 mb-16 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-block text-sm font-medium text-primary/80 mb-4 px-4 py-1 bg-primary/10 rounded-full">
                Get in Touch
              </span>
            </motion.div>
            
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions? We're here to help you on your journey.
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="w-full backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
              <CardContent className="p-8 flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary/10 p-4 rounded-full"
                  >
                    <Mail className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-medium mb-2">Need Help?</h2>
                    <a 
                      href="mailto:support@opengeek.in" 
                      className="text-lg font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group-hover:gap-3 duration-300"
                    >
                      support@opengeek.in
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>
                  </div>
                </div>
                <motion.p 
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  className="text-sm text-muted-foreground border-l border-primary/20 pl-6"
                >
                  We typically respond<br />within 24 hours
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}