"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Users, Briefcase, Trophy } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-black antialiased relative overflow-hidden py-20 sm:py-32 md:py-40">
      <div className="absolute inset-0 bg-black" />
      <Spotlight 
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .15) 0, hsla(210, 100%, 55%, .05) 50%, hsla(210, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .12) 0, hsla(210, 100%, 55%, .05) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .1) 0, hsla(210, 100%, 45%, .05) 80%, transparent 100%)"
        translateY={-250}
        width={800}
        height={1500}
        smallWidth={300}
        duration={10}
        xOffset={150}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative rounded-full px-3 py-1 text-xs sm:text-sm leading-6 text-white/80 ring-1 ring-white/20 hover:ring-white/30">
            Start earning while learning{" "}
            <a href="#" className="font-semibold text-blue-400">
               Join now <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="inline-block animate-gradient bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-[200%_auto] bg-clip-text text-transparent">
              Turn Your Code
            </span>
            <span className="inline-block animate-gradient bg-gradient-to-r from-white via-white to-white/70 bg-[200%_auto] bg-clip-text text-transparent">
              Into Real
            </span>
          </div>
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl border border-neutral-800/50 p-2 shadow-xl flex items-center justify-center min-w-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-400/10 to-green-500/10 rounded-xl" />
            <ContainerTextFlip
              words={["World Projects", "Money", "Income", "Revenue"]}
              interval={4000}
              className="bg-clip-text"
              animationDuration={500}
            />
          </div>
        </h1>
        <p className="mt-6 mb-10 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
          Connect with real clients, build your portfolio, and start earning today. Join our community of students who are turning their coding skills into income.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 px-4">
          <Button 
            size="lg" 
            className="group relative w-full sm:w-auto text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors h-12 px-8 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[700ms] ease-out" />
            <span className="relative z-10 flex items-center justify-center">
              Find Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="group relative w-full sm:w-auto text-base bg-transparent border-white/20 text-white hover:bg-white/10 transition-colors h-12 px-8 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[700ms] ease-out" />
            <span className="relative z-10">Join Community</span>
          </Button>
        </div>

        <div className="mt-16 sm:mt-20 mb-8 sm:mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 md:gap-12 px-4">
          <motion.div 
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse group-hover:animate-none" />
              <Briefcase className="w-6 h-6 text-blue-400 relative z-10" />
            </div>
            <p className="text-white/80">Build Skills</p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-green-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse group-hover:animate-none" />
              <Trophy className="w-6 h-6 text-green-400 relative z-10" />
            </div>
            <p className="text-white/80">Get Paid</p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse group-hover:animate-none" />
              <Code2 className="w-6 h-6 text-blue-400 relative z-10" />
            </div>
            <p className="text-white/80">Grow Fast</p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative p-3 rounded-full bg-white/5 ring-1 ring-white/20 group hover:ring-green-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse group-hover:animate-none" />
              <Users className="w-6 h-6 text-green-400 relative z-10" />
            </div>
            <p className="text-white/80">Network</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 