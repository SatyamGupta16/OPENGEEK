import { useNavigate } from 'react-router-dom';
import { Settings, User, LogOut, BookMarked, Users, HelpCircle } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { signOut } from '../lib/supabase';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function ProfileDropdown() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
              alt={user.email || 'User avatar'}
            />
            <AvatarFallback>{user.email ? user.email[0].toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-zinc-100">
              {user.email?.split('@')[0]}
            </p>
            <p className="text-xs leading-none text-zinc-400">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/connections')}>
          <Users className="mr-2 h-4 w-4" />
          <span>Connections</span>
          <span className="ml-auto text-xs text-zinc-500">128</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/saved')}>
          <BookMarked className="mr-2 h-4 w-4" />
          <span>Saved Posts</span>
          <span className="ml-auto text-xs text-zinc-500">24</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/help')}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-400 focus:text-red-400 focus:bg-red-900/10"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 