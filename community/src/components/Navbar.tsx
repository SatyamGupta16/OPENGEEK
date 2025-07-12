import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  User,
  Menu,
  X,
  Search,
  LogOut,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/auth-context';
import { signOut } from '../lib/supabase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-zinc-800 z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-tighter text-white">
                OPENGEEK
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-600 text-zinc-100"
                />
                <Search className="absolute right-3 top-1.5 h-5 w-5 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                  <Bell className="h-5 w-5 text-zinc-400" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                  <User className="h-5 w-5 text-zinc-400" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors"
                >
                  <LogOut className="h-5 w-5 text-zinc-400" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn('md:hidden', isOpen ? 'block' : 'hidden')}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-600 text-zinc-100"
              />
              <Search className="absolute right-3 top-2 h-5 w-5 text-zinc-400" />
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
              {user ? (
                <>
                  <button className="p-2 rounded-md hover:bg-zinc-800 transition-colors">
                    <Bell className="h-5 w-5 text-zinc-400" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-zinc-800 transition-colors">
                    <User className="h-5 w-5 text-zinc-400" />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    <LogOut className="h-5 w-5 text-zinc-400" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 