import { useNavigate } from 'react-router-dom';
import { Settings, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { signOut } from '../lib/supabase';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function ProfileDialog() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/login');
    }
  };

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
              alt={user.email || 'User avatar'}
            />
            <AvatarFallback>{user.email ? user.email[0].toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Profile Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.email || 'User avatar'}
              />
              <AvatarFallback>{user.email ? user.email[0].toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-semibold text-zinc-100">{user.email?.split('@')[0]}</h4>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-zinc-100"
              onClick={() => navigate('/profile')}
            >
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-zinc-100"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-zinc-100"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/10"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-100">12</div>
              <div className="text-xs text-zinc-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-100">1.2k</div>
              <div className="text-xs text-zinc-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-100">348</div>
              <div className="text-xs text-zinc-400">Following</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 