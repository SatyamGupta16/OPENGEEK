'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface NavbarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onSidebarToggle, isSidebarOpen }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-zinc-800 z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section with menu and logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4 lg:hidden"
              onClick={onSidebarToggle}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5 text-zinc-400" />
              ) : (
                <Menu className="h-5 w-5 text-zinc-400" />
              )}
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tighter text-white">
                OPENGEEK
              </h1>
              <span className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-400 rounded-full">
                Community
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-auto px-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search OpenGeek..."
                className="w-full px-4 py-1.5 pl-10 text-sm bg-zinc-900 border border-zinc-800 rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-600 text-zinc-100"
              />
              <Search className="absolute left-3 top-1.5 h-5 w-5 text-zinc-400" />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 text-zinc-400" />
            </Button>

            <Button
              asChild
              className="px-4 py-1.5 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
            >
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={cn(
            'md:hidden pb-3 transition-all duration-200 ease-in-out',
            isSearchOpen ? 'h-12 opacity-100' : 'h-0 opacity-0'
          )}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search OpenGeek..."
              className="w-full px-4 py-1.5 pl-10 text-sm bg-zinc-900 border border-zinc-800 rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-600 text-zinc-100"
            />
            <Search className="absolute left-3 top-1.5 h-5 w-5 text-zinc-400" />
          </div>
        </div>
      </div>
    </nav>
  );
} 