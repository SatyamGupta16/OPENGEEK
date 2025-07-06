"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, ArrowRight, MessageSquare } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch with our team for any queries",
    contact: "support@opengeek.in",
    link: "mailto:support@opengeek.in",
  },
  {
    icon: MessageSquare,
    title: "Public Chat",
    description: "Join our community chat forum",
    contact: "OpenGeek Chat",
    link: "/chat",
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-50">
        <div className="w-[800px] h-[800px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-16 relative z-10">
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
            <span className="inline-block text-sm font-medium text-white mb-4 px-4 py-1.5 bg-white/10 rounded-full">
              Get in Touch
            </span>
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about OpenGeek? We're here to help you connect and grow with our community.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 p-3 rounded-full"
                    >
                      <method.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <h2 className="text-xl font-semibold text-white">{method.title}</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm">{method.description}</p>
                  
                  <a 
                    href={method.link}
                    target={method.link.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer" 
                    className="text-base font-medium text-white hover:text-white/80 transition-colors flex items-center gap-2 group"
                  >
                    {method.contact}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Response Time Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-xl mx-auto text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            We typically respond to emails within 24 hours. For immediate assistance, join our public chat.
          </p>
        </motion.div>
      </div>
    </div>
  )
}