"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Users, Briefcase, Trophy } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";

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
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white/80 ring-1 ring-white/20 hover:ring-white/30">
            Join our growing community of {" "}
            <a href="#" className="font-semibold text-blue-400">
              5000+ developers <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-4 tracking-tight">
          Turn Your Code Into{" "}
          <span className="text-blue-400">Real Projects</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Connect with real clients, build your portfolio, and earn while you learn. Join the community of student developers turning passion into profession.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 px-4">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors h-12 px-8"
          >
            Find Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto text-base bg-transparent border-white/20 text-white hover:bg-white/10 transition-colors h-12 px-8"
          >
            Join Community
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-white/5 ring-1 ring-white/20">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-white/80">Real Projects</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-white/5 ring-1 ring-white/20">
              <Trophy className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-white/80">Get Paid</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-white/5 ring-1 ring-white/20">
              <Code2 className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-white/80">Learn & Grow</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-white/5 ring-1 ring-white/20">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-white/80">Community</p>
          </div>
        </div>
      </div>
    </section>
  );
} 