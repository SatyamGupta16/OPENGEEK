"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about OpenGeek. Can't find what you're looking for?{" "}
              <a href="mailto:support@opengeek.in" className="text-primary hover:underline">
                Contact our support team
              </a>
              .
            </p>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is OpenGeek?</AccordionTrigger>
              <AccordionContent>
                OpenGeek is a platform dedicated to empowering students with quality educational resources and fostering a community of tech enthusiasts. We provide learning materials, project opportunities, and mentorship to help students excel in their tech journey.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How can I join OpenGeek?</AccordionTrigger>
              <AccordionContent>
                You can join OpenGeek by signing up on our platform. We welcome students, developers, and tech enthusiasts. Once registered, you'll have access to our resources, community features, and learning materials.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What resources do you provide?</AccordionTrigger>
              <AccordionContent>
                We offer a wide range of resources including:
                <ul className="list-disc pl-6 mt-2">
                  <li>Programming tutorials and courses</li>
                  <li>Project templates and starter kits</li>
                  <li>Coding challenges and exercises</li>
                  <li>Hackathon opportunities</li>
                  <li>Mentorship programs</li>
                  <li>Community forums and discussions</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Is OpenGeek free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, OpenGeek's core features are free to use. We believe in making quality education accessible to everyone. Some premium features and specialized courses may require a subscription.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How can I contribute to OpenGeek?</AccordionTrigger>
              <AccordionContent>
                There are several ways to contribute:
                <ul className="list-disc pl-6 mt-2">
                  <li>Share your knowledge through tutorials or articles</li>
                  <li>Participate in community discussions</li>
                  <li>Create educational content</li>
                  <li>Help fellow members with their questions</li>
                  <li>Contribute to our open-source projects</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How do I get help if I'm stuck?</AccordionTrigger>
              <AccordionContent>
                We offer multiple support channels:
                <ul className="list-disc pl-6 mt-2">
                  <li>Community forums for general questions</li>
                  <li>Direct mentorship for specific issues</li>
                  <li>Live chat support during business hours</li>
                  <li>Comprehensive documentation and guides</li>
                  <li>Video tutorials and walkthroughs</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>What technologies do you cover?</AccordionTrigger>
              <AccordionContent>
                We cover a wide range of technologies including:
                <ul className="list-disc pl-6 mt-2">
                  <li>Web Development (HTML, CSS, JavaScript)</li>
                  <li>Frontend Frameworks (React, Vue, Angular)</li>
                  <li>Backend Development (Node.js, Python, Java)</li>
                  <li>Mobile Development (React Native, Flutter)</li>
                  <li>Database Technologies (SQL, MongoDB)</li>
                  <li>Cloud Services (AWS, Azure, GCP)</li>
                  <li>DevOps and CI/CD</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}