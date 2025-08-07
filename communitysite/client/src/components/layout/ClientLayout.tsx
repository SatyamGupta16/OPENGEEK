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
    <div className="min-h-screen bg-background">
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
          "w-full min-h-[calc(100vh-64px)] transition-all duration-300 pt-[64px]",
          isHomePage ? "lg:pl-64 lg:pr-80" : "lg:pl-64" // Padding instead of margin for better control
        )}>
          <div className={cn(
            "h-full w-full",
            isHomePage ? "px-4 pt-6" : "px-6 pt-6"
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