import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { cn } from '../../lib/utils';
import { AdsSection } from '../ui/ads-section';

const ClientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isProjectShowcase = location.pathname === '/projects';

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const navbarToggle = document.getElementById('navbar-toggle');

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        navbarToggle &&
        !navbarToggle.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

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
            <Sidebar isOpen={isSidebarOpen} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 min-h-[calc(100vh-64px)] transition-all duration-300 pt-[64px]",
          isProjectShowcase 
            ? "lg:ml-64" // Only left margin for project showcase
            : "lg:ml-64 lg:mr-80" // Both margins for other pages
        )}>
          <div className={cn(
            isProjectShowcase 
              ? "w-full" // Full width for project showcase
              : "max-w-2xl mx-auto px-4 py-6" // Contained width for other pages
          )}>
            <Outlet />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className={cn(
          "hidden lg:block fixed right-0 top-16 w-80 h-[calc(100vh-4rem)] bg-black border-l border-zinc-800/50",
          isProjectShowcase && "lg:hidden" // Hide right sidebar for project showcase
        )}>
          <div className="h-full p-6">
            <AdsSection />
          </div>
        </aside>
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
};

export default ClientLayout; 