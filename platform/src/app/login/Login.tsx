import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../lib/supabase';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { SparklesCore } from "@/components/ui/sparkles";
import Aurora from '@/components/ui/aurora';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/lib/auth-context';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formSuccess, setFormSuccess] = useState<{ [key: string]: boolean }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Reset success states when switching modes
    setFormSuccess({});
  }, [isResetMode]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const newSuccess: { [key: string]: boolean } = {};
    
    if (!usernameOrEmail) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail)) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      newSuccess.email = true;
    }
    
    if (!isResetMode) {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        newSuccess.password = true;
      }
    }

    setErrors(newErrors);
    setFormSuccess(newSuccess);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Implement password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
      toast.success('Password reset instructions sent!', {
        description: 'Please check your email to reset your password.'
      });
      setIsResetMode(false);
    } catch (err) {
      console.error("Failed to send reset instructions", err);
      toast.error('Failed to send reset instructions', {
        description: 'Please try again later or contact support.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data, error } = await signIn(usernameOrEmail, password);
      
      if (error) {
        toast.error('Login failed', {
          description: error.message || 'Please check your credentials and try again.'
        });
      } else if (data?.user) {
        setIsSuccess(true);
        toast.success('Welcome back!', {
          description: 'Successfully logged in to your account.'
        });
        // Add delay before navigation
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error("Failed to login", err);
      toast.error('An unexpected error occurred', {
        description: 'Please try again later or contact support.'
      });
    } finally {
      if (!isSuccess) {
        setLoading(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-white rounded-full animate-[ping_1s_ease-in-out_infinite]"></div>
            <div className="absolute inset-0 border-4 border-white rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white animate-pulse">
            Preparing your workspace...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-black relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        {/* Aurora effect */}
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={0.4}
          speed={0.5}
        />
        
        {/* Static stars effect */}
        <SparklesCore
          className="absolute inset-0 w-full h-full opacity-50"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          particleColor="#ffffff"
          speed={0}
        />

        {/* Subtle nebula effect */}
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
          <p className="text-zinc-400 text-xl font-light leading-relaxed animate-fade-in-up">
            Where passionate developers unite to create, learn, and grow together.
          </p>
        </div>
      </div>

      {/* Left side - Login Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-20">
        <Card className="w-full max-w-md border-zinc-800/50 bg-zinc-900/80 backdrop-blur-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              {isResetMode ? 'Reset password' : 'Welcome to OpenGeek!'}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {isResetMode
               ? "Enter your email to reset your password"
               : "Sign in to access your account"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={isResetMode ? handleResetPassword : handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={usernameOrEmail}
                    onChange={(e) => {
                      setUsernameOrEmail(e.target.value);
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: '' }));
                        setFormSuccess(prev => ({ ...prev, email: false }));
                      }
                    }}
                    onBlur={() => validateForm()}
                    className={cn(
                      "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500",
                      "focus:border-white focus:ring-1 focus:ring-white",
                      errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500",
                      formSuccess.email && "border-green-500 focus:border-green-500 focus:ring-green-500"
                    )}
                    placeholder="m@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {!isResetMode && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsResetMode(true)}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) {
                            setErrors(prev => ({ ...prev, password: '' }));
                            setFormSuccess(prev => ({ ...prev, password: false }));
                          }
                        }}
                        onBlur={() => validateForm()}
                        className={cn(
                          "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 pr-10",
                          "focus:border-white focus:ring-1 focus:ring-white",
                          errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500",
                          formSuccess.password && "border-green-500 focus:border-green-500 focus:ring-green-500"
                        )}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                      {errors.password && (
                        <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full bg-white text-black hover:bg-zinc-200 font-semibold",
                  "focus-visible:outline-white",
                  loading && "opacity-70"
                )}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isResetMode ? "Sending..." : "Signing in..."}
                  </div>
                ) : (
                  isResetMode ? "Reset password" : "Sign in"
                )}
              </Button>

              {!isResetMode && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-zinc-900 text-zinc-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toast.info('GitHub login coming soon!')}
                    className="w-full border-zinc-800 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                  >
                    <GitHubIcon className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                </>
              )}
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-center w-full text-sm text-zinc-400">
              {isResetMode ? (
                <>
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => setIsResetMode(false)}
                    className="font-semibold text-white hover:text-zinc-300 transition-colors"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New to OpenGeek?{' '}
                  <a
                    href="https://www.opengeek.in/join"
                    className="font-semibold text-white hover:text-zinc-300 transition-colors"
                  >
                    Create account
                  </a>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Add styles for the animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 100%;
            background-position: left center;
          }
          50% {
            background-position: right center;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }

        @keyframes shooting-star {
          0% {
            transform: translate(0, 0) rotate(315deg) scale(0);
            opacity: 0;
          }
          10%, 20% {
            transform: translate(-10vw, 10vh) rotate(315deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(315deg) scale(0);
            opacity: 0;
          }
        }

        .shooting-star {
          position: absolute;
          top: var(--top);
          left: var(--left);
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: shooting-star 8s linear infinite;
          animation-delay: var(--delay);
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, white, transparent);
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

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
      `}</style>
    </div>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EyeSlashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"
      />
    </svg>
  );
}

 