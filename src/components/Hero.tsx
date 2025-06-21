"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Users, Briefcase, Trophy } from "lucide-react";

import { motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { SpaceBackground } from "@/components/ui/space-background";

export function Hero() {
  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-black antialiased relative overflow-hidden py-20 sm:py-24 md:py-32">
      <SpaceBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative rounded-full px-3 py-1 text-xs sm:text-sm leading-6 text-white/80 ring-1 ring-white/20 hover:ring-white/30 backdrop-blur-sm">
            Start earning while learning{" "}
            <a href="#" className="font-semibold text-white hover:text-white/80">
               Join now <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-4 sm:py-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70"
        >
          Turn Your Code into Real <br className="hidden sm:block" /> 
          <div className="relative inline-block">
            <Cover>
              <ContainerTextFlip
                words={["Projects", "Money", "Income"]}
                interval={4000}
                className="!text-5xl sm:!text-5xl md:!text-6xl lg:!text-7xl bg-clip-text"
                textClassName="overflow-hidden"
                animationDuration={500}
              />
            </Cover>
          </div>
      </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 mb-8 sm:mb-10 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-4 backdrop-blur-sm"
        >
          Connect with real clients, build your portfolio, and start earning today. Join our community of students who are turning their coding skills into income.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 px-4"
        >
          <Button 
            size="lg" 
            className="group relative w-full sm:w-auto text-base font-medium bg-gradient-to-r from-white/90 via-white/90 to-white/90 text-black hover:from-white hover:via-white hover:to-white transition-all duration-300 h-12 px-6 sm:px-8 overflow-hidden rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_2px_rgba(255,255,255,0.4),0_4px_6px_-1px_rgba(255,255,255,0.1),0_2px_4px_-1px_rgba(255,255,255,0.06)] backdrop-blur-sm"
          >
            <span className="relative z-10 flex items-center justify-center">
              Find Internship
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="group relative w-full sm:w-auto text-base font-medium bg-black/30 text-white hover:text-white hover:bg-black/50 transition-all duration-300 h-12 px-6 sm:px-8 overflow-hidden rounded-lg border border-white/20 hover:border-white/40 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_2px_rgba(255,255,255,0.2),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
          >
            <span className="relative z-10">Join Community</span>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 sm:mt-16 md:mt-20 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4"
        >
          <motion.div 
            className="flex flex-col items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-2 sm:p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse group-hover:animate-none" />
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 relative z-10" />
            </div>
            <p className="text-xs sm:text-sm text-white/80">Build Skills</p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-2 sm:p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-green-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse group-hover:animate-none" />
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 relative z-10" />
            </div>
            <p className="text-xs sm:text-sm text-white/80">Get Paid</p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-2 sm:p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse group-hover:animate-none" />
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 relative z-10" />
            </div>
            <p className="text-xs sm:text-sm text-white/80">Grow Fast</p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-2 sm:p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-green-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse group-hover:animate-none" />
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 relative z-10" />
            </div>
            <p className="text-xs sm:text-sm text-white/80">Network</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 