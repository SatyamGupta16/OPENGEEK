'use client';

import { SparklesCore } from "@/components/ui/sparkles";
import Aurora from "@/components/ui/aurora";
import { SignIn } from "@clerk/nextjs";

export function Login() {
  return (
    <div className="min-h-screen w-full flex bg-black relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={0.4}
          speed={0.5}
        />
        
        <SparklesCore
          className="absolute inset-0 w-full h-full opacity-50"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          particleColor="#ffffff"
          speed={0}
        />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-3xl" />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="hidden lg:flex relative flex-1 items-center justify-center">
        <div className="max-w-xl px-12">
          <h1 className="text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80">
              OPENGEEK COMMUNITY
            </span>
          </h1>
          <div className="space-y-6">
            <p className="text-zinc-400 text-xl font-light leading-relaxed animate-fade-in-up">
              Where passionate developers unite to create, learn, and grow together.
            </p>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 animate-fade-in-up">
              <h3 className="text-white font-semibold mb-2">✨ New Platform Experience</h3>
              <p className="text-zinc-400 text-sm">
                We've redesigned our platform UI with a fresh new look and enhanced features. 
                Join our community to explore interactive learning paths, real-world projects, 
                and connect with fellow developers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Left side - Login Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-20">
        <SignIn 
          routing="path"
          path="/sign-in"
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "bg-zinc-900/80 border-zinc-800/50 backdrop-blur-xl shadow-xl",
              headerTitle: "text-3xl font-bold tracking-tight text-white",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton: "bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 text-white",
              socialButtonsBlockButtonText: "text-white font-medium",
              formButtonPrimary: "bg-white text-black hover:bg-zinc-200 font-semibold",
              formFieldLabel: "text-zinc-300",
              formFieldInput: "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white focus:ring-1 focus:ring-white",
              dividerLine: "bg-zinc-800",
              dividerText: "text-zinc-500 bg-zinc-900/80",
              footerActionLink: "text-white hover:text-zinc-300",
              identityPreviewText: "text-zinc-400",
              identityPreviewEditButton: "text-zinc-300 hover:text-white",
            },
          }}
        />
      </div>

      {/* Add styles for the animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

 