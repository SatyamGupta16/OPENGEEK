'use client';

import { useState } from 'react';
import { SparklesCore } from "@/components/ui/sparkles";
import Aurora from "@/components/ui/aurora";
import { useSignUp } from '@clerk/nextjs';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Start the sign-up process using the email method
      const result = await signUp?.create({
        emailAddress: email,
      });

      if (result?.status === 'missing_requirements') {
        // Redirect to verification page or handle next step
        console.log('Verification needed');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_github') => {
    if (!signUp) return;

    setIsLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (error) {
      console.error('Social sign-up error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
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
              <h3 className="text-white font-semibold mb-2">✨ Join Our Community</h3>
              <p className="text-zinc-400 text-sm">
                Create your account to access exclusive content, connect with fellow developers,
                and start your journey in our thriving tech community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Form - Responsive Layout */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-20 py-8 lg:py-0">
        <div className="w-full max-w-md lg:max-w-lg">
          

          {/* Custom Sign-Up Form - Black Theme */}
          <div className="bg-zinc-900/80 rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800/50">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Join OPENGEEK
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base">
                Create your account to get started
              </p>
            </div>

            {/* Social Sign-Up Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              <button
                onClick={() => handleSocialSignUp('oauth_apple')}
                disabled={isLoading}
                className="flex items-center justify-center h-11 sm:h-12 bg-zinc-700/50 hover:bg-zinc-800/70 border border-zinc-700/50 hover:border-zinc-600/50 rounded-xl transition-all duration-200 disabled:opacity-50 backdrop-blur-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>

              <button
                onClick={() => handleSocialSignUp('oauth_github')}
                disabled={isLoading}
                className="flex items-center justify-center h-11 sm:h-12 bg-zinc-700/50 hover:bg-zinc-800/70 border border-zinc-700/50 hover:border-zinc-600/50 rounded-xl transition-all duration-200 disabled:opacity-50 backdrop-blur-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>

              <button
                onClick={() => handleSocialSignUp('oauth_google')}
                disabled={isLoading}
                className="flex items-center justify-center h-11 sm:h-12 bg-zinc-700/50 hover:bg-zinc-800/70 border border-zinc-700/50 hover:border-zinc-600/50 rounded-xl transition-all duration-200 disabled:opacity-50 backdrop-blur-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-zinc-400 font-medium">OR</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-11 sm:h-12 px-4 bg-zinc-900/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full h-11 sm:h-12 bg-white hover:bg-zinc-100 text-black font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    Continue
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-zinc-400 text-sm">
                Already have an account?{' '}
                <a href="/sign-in" className="text-white font-semibold hover:text-zinc-300 transition-colors duration-200">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
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