'use client'

import { motion } from "framer-motion"
import { SpaceBackground } from "@/components/ui/space-background"
import { Shield, Lock, Eye, UserCheck, Server, Trash2 } from "lucide-react"

const sections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content: "We collect information that you provide directly to us when applying for community membership, including your name, email address, phone number, GitHub profile, educational details, and technical background. We also collect usage data to improve our services and your experience.",
    details: [
      "Personal Information: Name, email, phone, GitHub profile",
      "Educational Details: Course, semester, institution",
      "Technical Information: Skills, experience level, interests",
      "Application Data: Your responses to application questions",
      "Usage Data: How you interact with our platform"
    ]
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: "Your information is used to process your application, communicate with you about community activities, and improve our services. We may also use it to send you important updates about OpenGeek events and opportunities.",
    details: [
      "Process and evaluate your community membership application",
      "Send you updates about your application status",
      "Notify you about upcoming events and opportunities",
      "Improve our community services and programs",
      "Customize your experience based on interests"
    ]
  },
  {
    icon: Eye,
    title: "Information Sharing",
    content: "We do not sell, trade, or otherwise transfer your personal information to outside parties. Your information is only accessible to authorized OpenGeek administrators for community management purposes.",
    details: [
      "Access limited to authorized administrators",
      "No data selling or trading with third parties",
      "Strict access controls and monitoring",
      "Regular security audits of access patterns",
      "Transparent sharing practices"
    ]
  },
  {
    icon: Server,
    title: "Data Storage",
    content: "Your data is stored securely using industry-standard encryption and security measures. We regularly review and update our security practices to ensure your information remains protected.",
    details: [
      "End-to-end encryption for sensitive data",
      "Regular security updates and patches",
      "Automated backup systems",
      "Industry-standard security protocols",
      "24/7 security monitoring"
    ]
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: "You have the right to access, update, or request deletion of your personal information. You can also opt-out of communications at any time by contacting us.",
    details: [
      "Access your personal data anytime",
      "Request data corrections or updates",
      "Ask for data deletion",
      "Opt-out of communications",
      "Export your data in common formats"
    ]
  },
  {
    icon: Trash2,
    title: "Data Retention",
    content: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy. If you request deletion of your data, we will promptly comply with your request.",
    details: [
      "Clear retention timelines",
      "Automatic data cleanup processes",
      "Prompt handling of deletion requests",
      "Secure data disposal methods",
      "Regular data audits"
    ]
  }
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-black antialiased relative">
      <SpaceBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400">
              Privacy Policy
            </h1>
            <p className="mt-4 text-neutral-400 text-sm sm:text-base">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-neutral-800/50 text-white">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      {section.title}
                    </h2>
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                      {section.content}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {section.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-sm text-neutral-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-neutral-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="mt-4 text-neutral-400 text-sm">
              If you have any questions about our privacy policy, please{" "}
              <a href="mailto:contact@opengeek.dev" className="text-blue-400 hover:text-blue-300">
                contact us
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 