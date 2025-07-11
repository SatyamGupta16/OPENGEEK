import {
  Home,
  Trophy,
  Monitor,
  Calendar,
  Code,
  MessageSquare,
  Hash,
  Settings,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: any;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ icon: Icon, label, isActive }: NavItemProps) => (
  <a
    href="#"
    className={cn(
      'flex items-center py-2 px-3 rounded-md text-sm group transition-colors',
      isActive
        ? 'bg-zinc-800 text-white'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
    )}
  >
    <Icon className="h-5 w-5 shrink-0" />
    <span className="ml-3">{label}</span>
  </a>
);

const Sidebar = () => {
  const mainNavItems = [
    { icon: Home, label: 'Home', isActive: true },
    { icon: Trophy, label: 'Leaderboards' },
    { icon: Monitor, label: 'Project Showcase' },
    { icon: Calendar, label: 'Monthly Challenge' },
    { icon: Code, label: '#30NitesOfCode' },
    { icon: MessageSquare, label: 'General' },
  ];

  const channelItems = [
    { icon: Hash, label: 'general' },
    { icon: Hash, label: 'help' },
    { icon: Hash, label: 'showcase' },
    { icon: Hash, label: 'resources' },
    { icon: Hash, label: 'announcements' },
    { icon: Hash, label: 'feedback' },
    { icon: Hash, label: 'introductions' },
    { icon: Hash, label: 'off-topic' },
  ];

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-black border-r border-zinc-800">
      <div className="flex flex-col h-full">
        {/* Main navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="space-y-1">
            {mainNavItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                isActive={item.isActive}
              />
            ))}
          </nav>

          {/* Channels section */}
          <div className="mt-8 mb-4 px-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Channels
            </h3>
          </div>
          <nav className="space-y-1 px-3">
            {channelItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>
        </div>

        {/* Bottom section - Fixed */}
        <div className="p-3 border-t border-zinc-800 bg-black">
          <NavItem
            icon={Settings}
            label="Settings"
          />
          <div className="mt-4 flex items-center px-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-zinc-800" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-zinc-200">User Name</p>
              <p className="text-xs text-zinc-400">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 