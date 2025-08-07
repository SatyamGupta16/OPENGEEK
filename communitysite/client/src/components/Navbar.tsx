'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu, X, Search, LogOut, Settings, User,
  Plus, Bell, ChevronDown, Book, GitPullRequest,
  MessageSquare, Star, FileText, Gift
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
import { CreatePostModal } from './ui/create-post-modal';
import { usePostContext } from '@/contexts/PostContext';

interface NavbarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onSidebarToggle, isSidebarOpen }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { onPostCreated } = usePostContext();

  // Prevent layout shifts by ensuring consistent scrollbar space
  useEffect(() => {
    // Add consistent scrollbar gutter to prevent layout shifts
    document.documentElement.style.scrollbarGutter = 'stable';

    // Listen for custom event to open create post modal
    const handleOpenCreatePost = () => {
      setIsCreatePostOpen(true);
    };

    window.addEventListener('open-create-post-modal', handleOpenCreatePost);

    return () => {
      document.documentElement.style.scrollbarGutter = '';
      window.removeEventListener('open-create-post-modal', handleOpenCreatePost);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black border-b border-[#111111] z-50 will-change-transform">
      <div className="px-3 mx-auto max-w-[1440px] sm:px-4 lg:px-6">
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


          </div>

          {/* Center search - shorter and more compact */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 px-4 pl-10 text-sm bg-zinc-900/50 border border-white/25 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-zinc-100 placeholder:text-zinc-500 transition-all duration-200"
              />
              <kbd className="absolute right-3 top-2 px-1.5 text-[10px] font-medium text-zinc-500 bg-zinc-800 border border-zinc-700 rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right section - improved mobile responsiveness */}
          <div className="flex items-center space-x-4 sm:space-x-2 md:space-x-3 lg:space-x-4">
            {/* Mobile search button - hidden on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg border border-transparent hover:border-zinc-700/50 transition-all duration-200 shrink-0"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {isSignedIn ? (
              <>
                {/* Create dropdown - mobile optimized */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 sm:gap-2 text-white hover:text-white hover:bg-zinc-800/50 border border-white/25 hover:border-zinc-600/50 rounded-lg px-2 sm:px-3 py-2 transition-all duration-200 shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline text-xs sm:text-sm">Create</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-48 sm:w-52 bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-xl z-[60]"
                    avoidCollisions={true}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer"
                        onClick={() => setIsCreatePostOpen(true)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>New Post</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer" asChild>
                        <Link href="/projects">
                          <Book className="mr-2 h-4 w-4" />
                          <span>New Project</span>
                        </Link>
                      </DropdownMenuItem>

                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications - mobile optimized */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-white hover:text-white hover:bg-zinc-800/50 border border-white/25 hover:border-zinc-600/50 rounded-lg w-8 h-8 sm:w-10 sm:h-10 transition-all duration-200 shrink-0"
                    >
                      <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="absolute -right-0.5 -top-0.5 sm:-right-1 sm:-top-1 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-emerald-500 text-[8px] sm:text-[10px] font-medium text-white">
                        2
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-72 sm:w-80 bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-xl z-[60]"
                    avoidCollisions={true}
                  >
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Notifications</span>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-emerald-400 hover:text-emerald-300">
                        Mark all as read
                      </Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    <div className="max-h-[60vh] sm:max-h-[calc(100vh-200px)] overflow-y-auto">
                      <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 sm:p-4 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 mt-1 text-zinc-400 shrink-0" />
                          <div>
                            <p className="text-sm text-zinc-300">Someone starred your project</p>
                            <p className="text-xs text-zinc-500">2h ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 sm:p-4 hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 mt-1 text-zinc-400 shrink-0" />
                          <div>
                            <p className="text-sm text-zinc-300">New comment on your discussion</p>
                            <p className="text-xs text-zinc-500">5h ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User avatar - mobile optimized */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-8 w-8 sm:h-10 sm:w-10  rounded-full border-2 border-white/25 transition-all duration-200 "
                    >
                      <Avatar className="h-9 w-9 sm:h-9 sm:w-9">
                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                        <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs sm:text-sm">{user?.firstName?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-52 sm:w-56 bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-xl z-[60]"
                    align="end"
                    sideOffset={8}
                    avoidCollisions={true}
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
                        <p className="text-xs text-zinc-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer" asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer" asChild>
                      <Link href="/claim/my-claims">
                        <Gift className="mr-2 h-4 w-4" />
                        <span>My Claims</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    <DropdownMenuItem onClick={handleSignOut} className="hover:bg-zinc-800 focus:bg-zinc-800 text-red-400 hover:text-red-300 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="outline" className="text-xs sm:text-sm font-medium text-zinc-100 border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-200 px-3 sm:px-4 shrink-0">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile search - improved styling */}
        <div
          className={cn(
            'lg:hidden pb-3 transition-all duration-300 ease-in-out overflow-hidden',
            isSearchOpen ? 'h-12 opacity-100' : 'h-0 opacity-0'
          )}
        >
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search OpenGeek..."
              className="w-full h-9 px-4 pl-10 text-sm bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-zinc-100 placeholder:text-zinc-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={onPostCreated}
      />
    </nav>
  );
}
