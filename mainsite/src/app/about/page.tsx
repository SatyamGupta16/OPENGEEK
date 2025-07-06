"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Users, Laptop, BookOpen, Sparkles, Coffee } from "lucide-react";
import Squares from "@/components/ui/Squares";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const stats = [
  { number: "500+", label: "Active Members" },
  { number: "20+", label: "Tech Workshops" },
  { number: "10+", label: "Tech Stacks" },
  { number: "24/7", label: "Community Support" },
];

const features = [
  {
    icon: Code2,
    title: "Hands-on Learning",
    description: "Build real projects using the latest tech stacks. From web dev to AI, explore what interests you with hands-on guidance.",
  },
  {
    icon: Users,
    title: "Peer Learning Culture",
    description: "Connect with fellow coders, share knowledge, and grow together. Regular code reviews and pair programming sessions.",
  },
  {
    icon: BookOpen,
    title: "Tech Exploration",
    description: "Stay updated with emerging technologies. Weekly sessions on new frameworks, languages, and development practices.",
  },
  {
    icon: Coffee,
    title: "Coding Hangouts",
    description: "Join our casual coding sessions, hackathons, and tech talks. Build friendships while building cool stuff.",
  },
];

const highlights = [
  {
    title: "Weekly Tech Workshops",
    description: "Deep-dive into different technologies each week. Recent topics: Next.js 14, Rust basics, AI with Python, and System Design fundamentals.",
    icon: Laptop,
  },
  {
    title: "Project Showcases",
    description: "Share your projects, get feedback, and learn from others. Monthly demo days where members showcase what they've built.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white antialiased relative overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[#000000]" />
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-[150%] h-[150%] -translate-x-[10%] -translate-y-[10%]">
            <Squares 
              speed={0.7} 
              squareSize={40}
              direction='diagonal'
              borderColor='rgba(255, 255, 255, 0.1)'
              hoverFillColor='rgba(255, 255, 255, 0.05)'
            />
          </div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative min-h-screen flex items-center justify-center py-20 sm:py-32"
        >
          <div className="absolute inset-0 bg-[#000000]" />
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                Where Coding Meets Community
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-[#888888]">
                OpenGeek is your tech community where passion for coding meets collaborative learning. Join fellow students in exploring new technologies, building projects, and growing together.
              </p>
            </motion.div>
          </div>
        </motion.section>

        

        {/* Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full py-16 sm:py-20 relative"
        >
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-[#0A0A0A] border border-[#222222]">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Mission</h2>
              <p className="mt-6 text-lg text-[#888888]">
                We're building a vibrant community where students can explore their passion for coding, learn modern tech stacks, and grow together. Our focus is on creating an inclusive space for hands-on learning, collaboration, and technical growth.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full py-16 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={cardVariant}
                  className="relative group rounded-2xl bg-[#0A0A0A] hover:bg-[#151515] transition-all duration-300 p-6 sm:p-8 border border-[#222222]"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#151515] group-hover:bg-[#1A1A1A] transition-colors border border-[#222222]">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-[#888888] text-sm sm:text-base">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Community Highlights */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full py-16 sm:py-20 relative"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Community Highlights</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  variants={cardVariant}
                  className="relative rounded-2xl bg-[#0A0A0A] hover:bg-[#151515] transition-all duration-300 p-6 sm:p-8 border border-[#222222]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#151515] group-hover:bg-[#1A1A1A] transition-colors border border-[#222222]">
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{highlight.title}</h3>
                  </div>
                  <p className="text-[#888888]">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Join the Community Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full py-16 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center p-8 rounded-2xl bg-[#0A0A0A] border border-[#222222]">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Join Our Tech Community</h2>
              <p className="mt-4 text-lg text-[#888888] max-w-2xl mx-auto">
                Whether you're just starting out or looking to explore new technologies, OpenGeek is your space to learn, build, and grow with fellow tech enthusiasts.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/join">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto group relative text-base font-medium bg-white text-[#000000] hover:bg-[#EEEEEE] transition-all duration-300"
                  >
                    Join OpenGeek
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base font-medium border-[#222222] hover:bg-[#151515]"
                  >
                    Chat with Members
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 