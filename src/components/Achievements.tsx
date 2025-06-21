"use client";

import { motion } from "framer-motion";
import { Trophy, Code2, Target, DollarSign } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";

export function Achievements() {
  return (
    <section id="achievements" className="relative w-full min-h-screen bg-black overflow-x-hidden">
      <div className="w-full py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <motion.h2 
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Our Achievements
            </motion.h2>
            <motion.p 
              className="max-w-[95%] xs:max-w-[90%] sm:max-w-2xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg text-white/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Showcasing our team's success in hackathons and web development projects
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/20 p-4 sm:p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <GridPattern 
                  width={12} 
                  height={12} 
                  x={-1} 
                  y={-1} 
                  className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]" 
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <Trophy className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">2</h3>
                    <p className="text-xs sm:text-sm text-white/70">Hackathon Wins</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/20 p-4 sm:p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <GridPattern 
                  width={12} 
                  height={12} 
                  x={-1} 
                  y={-1} 
                  className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]" 
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <Code2 className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">20+</h3>
                    <p className="text-xs sm:text-sm text-white/70">Projects Completed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/20 p-4 sm:p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <GridPattern 
                  width={12} 
                  height={12} 
                  x={-1} 
                  y={-1} 
                  className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]" 
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <DollarSign className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">40-50K</h3>
                    <p className="text-xs sm:text-sm text-white/70">Per Project</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/20 p-4 sm:p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <GridPattern 
                  width={12} 
                  height={12} 
                  x={-1} 
                  y={-1} 
                  className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]" 
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    <Target className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">SIH</h3>
                    <p className="text-xs sm:text-sm text-white/70">Upcoming Goal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 