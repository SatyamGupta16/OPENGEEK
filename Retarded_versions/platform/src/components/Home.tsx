import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '../lib/supabase';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

interface UserProfile {
  username?: string;
  email: string;
  id: string;
  status?: 'online' | 'offline' | 'away';
  role?: string;
  lastActive?: string;
}

interface Stats {
  projects: number;
  tasks: number;
  messages: number;
}

interface Activity {
  id: number;
  type: 'project' | 'task' | 'message';
  title: string;
  description: string;
  timestamp: string;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ projects: 0, tasks: 0, messages: 0 });
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
    // Simulated data loading
    setTimeout(() => {
      setStats({ projects: 12, tasks: 34, messages: 56 });
      setActivities([
        {
          id: 1,
          type: 'project',
          title: 'New Project Created',
          description: 'Started working on the dashboard redesign',
          timestamp: '2 hours ago'
        },
        {
          id: 2,
          type: 'task',
          title: 'Task Completed',
          description: 'Implemented new authentication flow',
          timestamp: '4 hours ago'
        },
        {
          id: 3,
          type: 'message',
          title: 'New Message',
          description: 'Team meeting scheduled for tomorrow',
          timestamp: '1 day ago'
        }
      ]);
    }, 1000);
  }, );

  const loadUser = async () => {
    const { user, error } = await getCurrentUser();
    if (error || !user) {
      navigate('/login');
      return;
    }
    setUser({
      ...(user as UserProfile),
      status: 'online',
      role: 'Developer',
      lastActive: 'Now'
    });
    setLoading(false);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out', {
        description: 'Please try again later.'
      });
      return;
    }
    toast.success('Signed out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background-start)] to-[var(--background-end)]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-[var(--primary)] animate-spin3D" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[var(--primary)] animate-pulse flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-white font-medium animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background-start)] to-[var(--background-end)] text-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar className="w-64 hidden lg:block animate-slideLeft" />
        <MobileSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="animate-slideRight">
                <h1 className="text-4xl font-bold tracking-tight gradient-text">
                  Welcome back{user?.username ? `, ${user.username}` : ''}!
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className={cn("status-dot", user?.status)}></div>
                  <p className="text-sm text-gray-400">
                    {user?.role} • Last active: {user?.lastActive}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 animate-slideLeft">
                <button
                  onClick={() => toast.info('Notifications coming soon!')}
                  className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors press-effect"
                >
                  <BellIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-all press-effect interactive-shine"
                >
                  Sign out
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-slideUp delay-100">
              <StatCard
                icon={<FolderIcon className="w-6 h-6" />}
                title="Active Projects"
                value={stats.projects}
                change={+2}
              />
              <StatCard
                icon={<TaskIcon className="w-6 h-6" />}
                title="Pending Tasks"
                value={stats.tasks}
                change={-5}
              />
              <StatCard
                icon={<InboxIcon className="w-6 h-6" />}
                title="Unread Messages"
                value={stats.messages}
                change={+3}
              />
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3 animate-slideUp delay-200">
              {/* Profile Card */}
              <div className="glass-effect rounded-xl p-6 card-hover">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-[var(--primary)]" />
                    </div>
                    <div className={cn(
                      "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[var(--surface)]",
                      user?.status === 'online' && "bg-[var(--success)]",
                      user?.status === 'away' && "bg-[var(--warning)]",
                      user?.status === 'offline' && "bg-[var(--error)]"
                    )}></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{user?.username || 'User'}</h2>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Profile Completion</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.info('Profile settings coming soon!')}
                    className="w-full py-2 px-4 rounded-lg border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all press-effect"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="lg:col-span-2 glass-effect rounded-xl p-6 card-hover">
                <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 animate-slideRight"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={cn(
                        "p-2 rounded-lg",
                        activity.type === 'project' && "bg-[var(--primary)]/10",
                        activity.type === 'task' && "bg-[var(--success)]/10",
                        activity.type === 'message' && "bg-[var(--warning)]/10"
                      )}>
                        {activity.type === 'project' && <FolderIcon className="w-5 h-5 text-[var(--primary)]" />}
                        {activity.type === 'task' && <TaskIcon className="w-5 h-5 text-[var(--success)]" />}
                        {activity.type === 'message' && <InboxIcon className="w-5 h-5 text-[var(--warning)]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{activity.title}</h3>
                          <span className="text-sm text-gray-400">{activity.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.info('View all activities coming soon!')}
                  className="w-full mt-6 py-2 px-4 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors press-effect"
                >
                  View All Activities
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change }: { icon: React.ReactNode, title: string, value: number, change: number }) {
  return (
    <div className="glass-effect rounded-xl p-6 card-hover">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-[var(--primary)]/10">
          {icon}
        </div>
        <div className={cn(
          "badge",
          change > 0 ? "badge-success" : "badge-error"
        )}>
          <span>{change > 0 ? '+' : ''}{change}%</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mt-4">{value}</h3>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
    </div>
  );
}

function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 min-h-screen glass-effect border-r border-white/10", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-6 transition-transform hover:scale-105 press-effect">
            <div className="h-8 w-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center animate-float">
              <HomeIcon className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <h2 className="text-xl font-semibold gradient-text">Platform</h2>
          </div>
          <div className="space-y-1">
            <SidebarButton icon={<HomeIcon />} text="Home" active />
            <SidebarButton icon={<UsersIcon />} text="Team" />
            <SidebarButton icon={<FolderIcon />} text="Projects" />
            <SidebarButton icon={<CalendarIcon />} text="Calendar" />
            <SidebarButton icon={<InboxIcon />} text="Messages" />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-medium text-gray-400">Settings</h2>
          <div className="space-y-1">
            <SidebarButton icon={<SettingsIcon />} text="Settings" />
            <SidebarButton icon={<UserIcon />} text="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ icon, text, active }: { icon: React.ReactNode, text: string, active?: boolean }) {
  return (
    <button
      className={cn(
        "w-full flex items-center py-2 px-4 text-sm rounded-lg transition-all press-effect",
        active
          ? "bg-[var(--primary)] text-white"
          : "text-gray-400 hover:text-white hover:bg-[var(--surface-hover)]"
      )}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
}

function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed z-90 bottom-10 right-8 bg-[var(--primary)] w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-[var(--primary-hover)] focus:outline-none transition-all press-effect interactive-shine animate-glow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 animate-slideRight">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}

// Add TaskIcon
function TaskIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

// Add BellIcon
function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

// Icons
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function InboxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}