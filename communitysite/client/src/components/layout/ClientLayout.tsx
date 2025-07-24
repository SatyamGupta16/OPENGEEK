'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { cn } from '@/lib/utils';
import { AdsSection } from '../ui/ads-section';
import { usePreventScrollLock } from '@/hooks/usePreventScrollLock';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on the home page
  const isHomePage = pathname === '/';
  
  // Prevent scroll lock from dropdown menus
  usePreventScrollLock();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Fixed Navbar */}
      <Navbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex">
        {/* Left Sidebar */}
        <aside className={cn(
          "fixed left-0 top-[64px] h-[calc(100vh-64px)] w-64 bg-black border-r border-zinc-800/50 transition-transform duration-300 z-40",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="h-full overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 min-h-[calc(100vh-64px)] transition-all duration-300 pt-[64px]",
          "lg:ml-64", // Left margin for sidebar
          isHomePage ? "lg:mr-80" : "lg:mr-0" // Right margin only on home page
        )}>
          <div className={cn(
            "h-full",
            isHomePage ? "max-w-2xl mx-auto px-4 py-6" : "px-6 py-6" // Full width for non-home pages
          )}>
            {children}
          </div>
        </main>

        {/* Right Sidebar - Only show on home page */}
        {isHomePage && (
          <aside className="hidden lg:block fixed right-0 top-16 w-80 h-[calc(100vh-4rem)] bg-black border-l border-zinc-800/50">
            <div className="h-full p-6">
              <AdsSection />
            </div>
          </aside>
        )}
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 