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
    <section id="about" className="relative w-full min-h-screen bg-black overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <div ref={containerRef} className="w-full py-16 sm:py-20 md:py-24 lg:py-32">
        <BackgroundLines className="container mx-auto px-3 xs:px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold max-w-7xl mx-auto text-center mt-4 sm:mt-6 relative z-20 py-3 sm:py-4 md:py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white flex flex-col xs:flex-row items-center gap-1 xs:gap-2 sm:gap-3"
            >
              <span>Empowering Student</span>
              <span>Developers</span>
            </h2>
            <p className="max-w-[95%] xs:max-w-[90%] sm:max-w-xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg text-white/70 text-center relative z-20 px-2 xs:px-4 leading-relaxed">
              We bridge the gap between learning and real-world experience, helping students and aspiring developers kickstart their careers through hands-on projects and mentorship.
            </p>
          </motion.div>

          <div className="w-full px-2 xs:px-4 sm:px-0 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
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
