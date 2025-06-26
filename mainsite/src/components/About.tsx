"use client";

import {
  Code2,
  Target,
  Users2,
  BookOpen,
  DollarSign,
  Award,
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

interface Card {
  title: string;
  description: string;
}

interface BackgroundLinesProps {
  children: React.ReactNode;
  className?: string;
}

interface FocusCardsProps {
  cards: Card[];
}

const featureCards = [
  {
    icon: Target,
    title: "Curated Projects",
    description: "Access vetted, real-world projects from startups and businesses.",
  },
  {
    icon: DollarSign,
    title: "Fair Compensation",
    description: "Get paid fairly while building your portfolio.",
  },
  {
    icon: BookOpen,
    title: "Guided Learning",
    description: "Learn from mentors and get feedback to improve your skills.",
  },
  {
    icon: Users2,
    title: "Active Community",
    description: "Join a supportive community of developers.",
  },
  {
    icon: Code2,
    title: "Modern Tech Stack",
    description: "Work with the latest industry technologies.",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Earn certificates as you complete projects.",
  },
];

function BackgroundLines({ children, className = "" }: BackgroundLinesProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 opacity-5">
        {/* Horizontal Lines */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ top: `${(i + 1) * 15}%` }}
            />
          ))}
        </div>
        
        {/* Vertical Lines */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ left: `${(i + 1) * 12}%` }}
            />
          ))}
        </div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/2 to-transparent opacity-20" />
      </div>
      {children}
    </div>
  );
}

function FocusCards({ cards }: FocusCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {cards.map((card, index) => {
        const IconComponent = featureCards[index]?.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative p-6 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle Background Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            {/* Subtle Edge Highlight */}
            <div className="absolute inset-px rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

            <div className="relative z-10">
              {IconComponent && (
                <div className="relative">
                  {/* Icon Glow */}
                  <div className="absolute -inset-1 bg-white/10 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  
                  <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-white/20 to-white/10 p-2.5 mb-4 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-white/10 transition-all duration-300">
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                </div>
              )}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                {card.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="about" className="relative w-full min-h-screen bg-black">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/30 to-white/20 origin-left z-50"
        style={{ scaleX }}
      />

      <div ref={containerRef} className="w-full min-h-screen">
        <BackgroundLines className="container mx-auto px-4 py-10 flex flex-col justify-center">
          {/* Hero Section */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 rounded-lg blur opacity-20"
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                  Empowering Student Developers
                </h2>
              </div>

              <p className="max-w-3xl text-sm sm:text-base lg:text-lg text-white/80 leading-normal">
                We bridge the gap between learning and real-world experience, helping students and developers kickstart their careers through hands-on projects and mentorship.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="relative w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/2 to-transparent blur-2xl -z-10"
              />
              <FocusCards
                cards={featureCards.map((card) => ({
                  title: card.title,
                  description: card.description,
                }))}
              />
            </div>
          </div>
        </BackgroundLines>
      </div>
    </section>
  );
}
