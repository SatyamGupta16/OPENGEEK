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
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count
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
                <div className="relative">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-zinc-400" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </div>
                <Avatar className="h-8 w-8">
                  <Avatar.Image 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                    alt={user.email || 'User avatar'} 
                  />
                  <Avatar.Fallback>
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </Avatar.Fallback>
                </Avatar>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="icon"
                >
                  <LogOut className="h-5 w-5 text-zinc-400" />
                </Button>
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
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
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
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-zinc-400" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                  <Avatar className="h-8 w-8">
                    <Avatar.Image 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                      alt={user.email || 'User avatar'} 
                    />
                    <Avatar.Fallback>
                      {user.email ? user.email[0].toUpperCase() : 'U'}
                    </Avatar.Fallback>
                  </Avatar>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="icon"
                  >
                    <LogOut className="h-5 w-5 text-zinc-400" />
                  </Button>
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