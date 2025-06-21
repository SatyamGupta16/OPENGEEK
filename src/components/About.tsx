"use client";

import { Code2, Target, Users2, BookOpen, DollarSign, Award } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { BackgroundLines } from "@/components/ui/background-lines";

const featureCards = [
  {
    icon: Target,
    title: "Curated Projects",
    description: "Access vetted, real-world projects from startups and businesses looking for fresh talent.",
  },
  {
    icon: DollarSign,
    title: "Fair Compensation",
    description: "Get paid fairly for your work while building your portfolio with meaningful projects.",
  },
  {
    icon: BookOpen,
    title: "Guided Learning",
    description: "Learn from experienced mentors and get feedback on your work to improve your skills.",
  },
  {
    icon: Users2,
    title: "Active Community",
    description: "Join a supportive community of like-minded developers, share experiences, and grow together.",
  },
  {
    icon: Code2,
    title: "Modern Tech Stack",
    description: "Work with the latest technologies and frameworks used in the industry today.",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Earn certificates and badges as you complete projects and develop new skills.",
  }
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="about" className="relative w-full py-16 sm:py-20 md:py-32 bg-black overflow-hidden min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <div ref={containerRef}>
      <BackgroundLines className="container px-4 md:px-6 pb-16 sm:pb-20 md:pb-32">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold flex flex-col sm:flex-row items-center gap-2 sm:gap-3 relative z-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Empowering Student</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-gradient bg-[200%_auto] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Developers</span>
          </motion.h2>
          <motion.p 
            className="max-w-[90%] sm:max-w-xl mx-auto text-xs sm:text-sm md:text-lg text-white/70 text-center relative z-20 px-4 leading-relaxed whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {"We bridge the gap between learning and real-world experience,helping students and aspiring developers kickstart their careers through hands-on projects."}
          </motion.p>
        </motion.div>

        <div className="px-4 sm:px-0 mt-12 sm:mt-16 md:mt-20">
          <FocusCards 
            cards={featureCards.map(card => ({
              title: card.title,
              content: card.description
            }))}
          />
        </div>
      </BackgroundLines>
      </div>
    </section>
  );
}
