"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using OpenGeek's services, you agree to be bound by these Terms of Service.",
      "If you disagree with any part of these terms, you may not access our services.",
      "We reserve the right to update these terms at any time without notice.",
      "Your continued use of our platform following any changes constitutes acceptance of those changes."
    ]
  },
  {
    title: "2. User Responsibilities",
    content: [
      "You must be at least 13 years old to use our services.",
      "You are responsible for maintaining the security of your account credentials.",
      "You agree not to share your account credentials with any third party.",
      "You must provide accurate and complete information when creating an account.",
      "You are responsible for all activities that occur under your account."
    ]
  },
  {
    title: "3. Content Guidelines",
    content: [
      "You retain ownership of any content you create and share on our platform.",
      "By posting content, you grant OpenGeek a non-exclusive license to use, modify, and distribute it.",
      "You must not post content that:",
      "- Infringes on intellectual property rights",
      "- Contains malicious code or viruses",
      "- Promotes hate speech or discrimination",
      "- Violates any applicable laws or regulations"
    ]
  },
  {
    title: "4. Privacy and Data Protection",
    content: [
      "We collect and process your data as described in our Privacy Policy.",
      "We implement reasonable security measures to protect your personal information.",
      "We do not sell your personal information to third parties.",
      "You have the right to request access to, correction of, or deletion of your data.",
      "We use cookies and similar technologies as detailed in our Cookie Policy."
    ]
  },
  {
    title: "5. Service Availability",
    content: [
      "We strive to maintain 99.9% service uptime but do not guarantee uninterrupted access.",
      "We reserve the right to modify or discontinue any feature without notice.",
      "We may perform maintenance or updates that could temporarily affect service availability.",
      "We are not liable for any service interruptions due to factors beyond our control."
    ]
  },
  {
    title: "6. Termination",
    content: [
      "We reserve the right to terminate or suspend accounts that violate these terms.",
      "You may terminate your account at any time by contacting our support team.",
      "Upon termination:",
      "- You lose access to our services and features",
      "- Your content may remain accessible if shared with others",
      "- You remain bound by relevant terms (e.g., confidentiality obligations)"
    ]
  }
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12 m-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using OpenGeek's services.
              <Badge variant="secondary" className="ml-2">Last updated: April 2024</Badge>
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              If you have any questions about these terms, please contact us at{" "}
              <a href="mailto:support@opengeek.in" className="text-primary hover:underline">
                support@opengeek.in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 