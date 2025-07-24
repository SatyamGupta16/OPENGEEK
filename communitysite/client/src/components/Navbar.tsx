'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu, X, Search, LogOut, Settings, User,
  Plus, Bell, ChevronDown, Book, GitPullRequest,
  MessageSquare, Star
} from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from './ui/dropdown-menu';

interface NavbarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onSidebarToggle, isSidebarOpen }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-[#111111] z-50">
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-zinc-400 hover:text-white"
              onClick={onSidebarToggle}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tighter text-white">OPENGEEK</h1>
              <span className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-[#111111] text-zinc-400 rounded-full">
                Community
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" className="text-zinc-400 hover:text-white" asChild>
                <Link href="/projects">Projects</Link>
              </Button>
              <Button variant="ghost" className="text-zinc-400 hover:text-white">Discussions</Button>
              <Button variant="ghost" className="text-zinc-400 hover:text-white">Blog</Button>
            </div>
          </div>

          {/* Center search */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search or jump to..."
                className="w-full h-9 px-4 pl-10 text-sm bg-black border border-[#111111] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-zinc-100 placeholder:text-zinc-500"
              />
              <kbd className="absolute right-3 top-2 px-1.5 text-[10px] font-medium text-zinc-500 bg-[#111111] border border-[#111111] rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-zinc-400 hover:text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {isSignedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white">
                      <Plus className="h-4 w-4" />
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 bg-black border border-[#111111] text-zinc-100">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Book className="mr-2 h-4 w-4" />
                        <span>New Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>New Discussion</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <GitPullRequest className="mr-2 h-4 w-4" />
                        <span>New Pull Request</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                        2
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-black border border-[#111111] text-zinc-100">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Notifications</span>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-500 hover:text-blue-400">
                        Mark all as read
                      </Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                      <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 focus:bg-[#111111]">
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 mt-1 text-zinc-400" />
                          <div>
                            <p className="text-sm text-zinc-300">Someone starred your project</p>
                            <p className="text-xs text-zinc-500">2h ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 focus:bg-[#111111]">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 mt-1 text-zinc-400" />
                          <div>
                            <p className="text-sm text-zinc-300">New comment on your discussion</p>
                            <p className="text-xs text-zinc-500">5h ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                        <AvatarFallback>{user?.firstName?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-black border border-[#111111] text-zinc-100" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-white">{user?.fullName}</p>
                        <p className="text-xs text-zinc-500">{user?.primaryEmailAddress?.emailAddress}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="outline" className="text-sm font-medium text-zinc-100">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div
          className={cn(
            'lg:hidden pb-3 transition-all duration-200 ease-in-out',
            isSearchOpen ? 'h-12 opacity-100' : 'h-0 opacity-0'
          )}
        >
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search OpenGeek..."
              className="w-full h-9 px-4 pl-10 text-sm bg-black border border-[#111111] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
