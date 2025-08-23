import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart3, 
  LogOut, 
  Menu,
  Shield,
  ShieldCheck,
  User,
  Activity,
  FolderOpen,
  MessageSquare,
  TrendingUp,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

type NavItemType = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
  requiresRole?: string[];
};

type NavSectionType = {
  title: string;
  items: NavItemType[];
};

interface UserProfile {
  id: number;
  username: string;
  role: 'super_admin' | 'admin' | 'moderator';
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [pendingCount, setPendingCount] = useState(0);

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPendingCounts();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/admin-users/profile', axiosConfig);
      setUserProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchPendingCounts = async () => {
    try {
      const response = await axios.get('/api/community/analytics?period=30', axiosConfig);
      setPendingCount(response.data.data.summary.pending_projects || 0);
    } catch (error) {
      console.error('Error fetching pending counts:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
    console.log('User logged out successfully');
  };

  const hasRole = (requiredRoles?: string[]) => {
    if (!requiredRoles || !userProfile) return true;
    return requiredRoles.includes(userProfile.role);
  };

  const navSections: NavSectionType[] = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/admin', icon: BarChart3 },
      ]
    },
    {
      title: 'Community Management',
      items: [
        { name: 'Community Overview', href: '/admin/community', icon: Activity },
        { name: 'Posts', href: '/admin/community/posts', icon: MessageSquare },
        { 
          name: 'Projects', 
          href: '/admin/community/projects', 
          icon: FolderOpen,
          badge: pendingCount > 0 ? pendingCount.toString() : undefined
        },
        { name: 'Community Users', href: '/admin/community/users', icon: Users },
        { name: 'Analytics', href: '/admin/community/analytics', icon: TrendingUp },
      ]
    },
    {
      title: 'System Management',
      items: [
        { 
          name: 'Admin Users', 
          href: '/admin/admin-users', 
          icon: ShieldCheck,
          requiresRole: ['super_admin']
        },
        { name: 'Legacy Users', href: '/admin/users', icon: Users },
        { name: 'Content', href: '/admin/content', icon: FileText },
        { name: 'Blogs', href: '/admin/blogs', icon: FileText },
      ]
    },
    {
      title: 'Account',
      items: [
        { name: 'Profile Settings', href: '/admin/profile', icon: Settings },
      ]
    }
  ];

  const NavItem = ({ item }: { item: NavItemType }) => {
    if (!hasRole(item.requiresRole)) return null;
    
    return (
      <Link
        to={item.href}
        className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
          location.pathname === item.href
            ? 'bg-muted text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          {item.name}
        </div>
        {item.badge && (
          <Badge variant="destructive" className="text-xs">
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  const NavSection = ({ section }: { section: NavSectionType }) => (
    <div className="space-y-2">
      <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {section.title}
      </h3>
      <div className="space-y-1">
        {section.items.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="flex items-center gap-2 text-lg font-semibold p-4">
            <BarChart3 className="h-6 w-6" />
            <span>Admin Panel</span>
            {userProfile && (
              <Badge variant="outline" className="ml-auto text-xs">
                {userProfile.role.replace('_', ' ')}
              </Badge>
            )}
          </div>
          <nav className="flex-1 space-y-4 p-4">
            {navSections.map((section) => (
              <NavSection key={section.title} section={section} />
            ))}
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground justify-start"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/admin" className="flex items-center gap-2 font-semibold">
              <BarChart3 className="h-6 w-6" />
              <span>Admin Panel</span>
            </Link>
            {userProfile && (
              <Badge variant="outline" className="text-xs">
                {userProfile.role.replace('_', ' ')}
              </Badge>
            )}
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="space-y-4 px-2 py-4 lg:px-4">
              {navSections.map((section) => (
                <NavSection key={section.title} section={section} />
              ))}
              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
