import React from "react"
import { SearchIcon, BellIcon, PlusIcon, MenuIcon, UserIcon, LogOutIcon, SettingsIcon, StarIcon, FolderIcon, Bell, MessageSquare, AlertCircle, RefreshCw, Calendar, Sparkles, AtSign } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { useNotifications } from "@/lib/notifications-context"
import { signOut } from "@/lib/supabase"
import { toast } from "sonner"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-mobile"
import { Input } from "@/components/ui/input"

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: 'system' | 'update' | 'event' | 'feature' | 'mention' | 'reply';
    category?: 'system' | 'community' | 'learning' | 'achievement' | 'announcement';
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    icon?: string;
    link?: string;
    is_public?: boolean;
    read: boolean;
    created_at: string;
  };
  onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'system':
        return <AlertCircle className="h-4 w-4" />;
      case 'update':
        return <RefreshCw className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'feature':
        return <Sparkles className="h-4 w-4" />;
      case 'mention':
        return <AtSign className="h-4 w-4" />;
      case 'reply':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getIconColor = () => {
    switch (notification.category || 'system') {
      case 'system':
        return 'text-blue-400';
      case 'community':
        return 'text-green-400';
      case 'learning':
        return 'text-purple-400';
      case 'achievement':
        return 'text-yellow-400';
      case 'announcement':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const getBgColor = () => {
    switch (notification.category || 'system') {
      case 'system':
        return 'bg-blue-400/10';
      case 'community':
        return 'bg-green-400/10';
      case 'learning':
        return 'bg-purple-400/10';
      case 'achievement':
        return 'bg-yellow-400/10';
      case 'announcement':
        return 'bg-orange-400/10';
      default:
        return 'bg-gray-400/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-4 border-b border-[#21262d] hover:bg-[#1f6feb]/5 transition-colors cursor-pointer ${
        !notification.read ? 'bg-[#1f6feb]/10' : ''
      }`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getBgColor()}`}>
          <div className={getIconColor()}>{getIcon()}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-[#c9d1d9] line-clamp-2">
              {notification.title}
            </p>
            <span className="text-xs text-[#8b949e] whitespace-nowrap">
              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-xs text-[#8b949e] mt-1 line-clamp-2">
            {notification.message}
          </p>
          {notification.link && (
            <Link 
              to={notification.link}
              className="text-xs text-[#58a6ff] hover:text-[#58a6ff]/80 hover:underline mt-2 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              View details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export function SiteHeader() {
  const { user } = useAuth()
  const { notifications, unreadCount, markAsRead } = useNotifications()
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully")
      navigate('/login')
    } catch (error) {
      toast.error("Error signing out")
    }
  }

  const menuItems = [
    {
      label: "Your Profile",
      icon: UserIcon,
      href: `/profile`,
      shortcut: "",
    },
    {
      label: "Your Projects",
      icon: FolderIcon,
      href: "/projects",
      count: "12",
      shortcut: "",
    },
    {
      label: "Your Stars",
      icon: StarIcon,
      href: "/stars",
      count: "48",
      shortcut: "",
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/settings",
      shortcut: "⌘,",
      divider: true,
    },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#21262d] bg-[#0d1117]">
      <div className="flex h-14 w-full items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9]"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          )}
          <Link to="/" className="text-lg font-semibold text-[#c9d1d9] flex items-center gap-2 hover:text-white transition-colors">
            <span className="hidden sm:inline">OpenGeek Community Platform</span>
            <span className="sm:hidden">OG</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="hidden md:block max-w-[24rem] min-w-[20rem] relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
            <Input 
              className="w-full bg-[#0d1117] border-[#30363d] pl-10 text-[#c9d1d9] placeholder:text-[#8b949e] focus:border-[#58a6ff] h-8"
              placeholder="Search or jump to..."
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-[#30363d] bg-[#161b22] px-1.5 font-mono text-[10px] font-medium text-[#8b949e]">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9]"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9]"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Create new</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#161b22] border-[#21262d]" align="end">
                  <Link to="/projects/new">
                    <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white cursor-pointer">
                      New Project
                      <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/discussions/new">
                    <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white cursor-pointer">
                      New Discussion
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-[#21262d]" />
                  <Link to="/projects/import">
                    <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white cursor-pointer">
                      Import Project
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9] relative"
                  >
                    <AnimatePresence>
                      {unreadCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center"
                        >
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f6feb] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#1f6feb] text-[10px] text-white items-center justify-center">
                            {unreadCount}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <BellIcon className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-[400px] bg-[#161b22] border-[#21262d]" 
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-[#c9d1d9]">Notifications</h3>
                      {unreadCount > 0 && (
                        <Badge variant="secondary" className="bg-[#1f6feb]/20 text-[#58a6ff]">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-[#8b949e] hover:text-[#c9d1d9]"
                          onClick={() => notifications.filter(n => !n.read).forEach(n => markAsRead(n.id))}
                        >
                          Mark all as read
                        </Button>
                      )}
                      <Link 
                        to="/notifications"
                        className="text-xs text-[#58a6ff] hover:text-[#58a6ff]/80 hover:underline"
                        onClick={() => setIsOpen(false)}
                      >
                        See all
                      </Link>
                    </div>
                  </div>
                  <ScrollArea className="h-[400px] overflow-y-auto">
                    <AnimatePresence>
                      {notifications.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-8 text-center"
                        >
                          <BellIcon className="h-8 w-8 text-[#8b949e] mx-auto mb-3" />
                          <p className="text-sm text-[#8b949e]">No notifications yet</p>
                          <p className="text-xs text-[#8b949e] mt-1">
                            We'll notify you when something important happens
                          </p>
                        </motion.div>
                      ) : (
                        notifications.slice(0, 5).map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                          />
                        ))
                      )}
                    </AnimatePresence>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-[#1f6feb] hover:ring-offset-2"
                  >
                    <Avatar className="h-8 w-8 transition-all">
                      <AvatarImage
                        src={user.user_metadata?.avatar_url}
                        alt={user.user_metadata?.full_name || user.email}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-[#1f6feb] to-[#1f8feb] text-white">
                        {(user.user_metadata?.full_name?.[0] ||
                          user.email?.[0] ||
                          "U").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-80 bg-[#161b22] border-[#21262d] p-2" 
                  align="end" 
                  forceMount
                >
                  
                    <div className="flex items-center gap-4 p-2 rounded-md hover:bg-[#1f6feb]/10 transition-colors cursor-pointer">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={user.user_metadata?.avatar_url}
                          alt={user.user_metadata?.full_name || user.email}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#1f6feb] to-[#1f8feb] text-xl text-white">
                          {(user.user_metadata?.full_name?.[0] ||
                            user.email?.[0] ||
                            "U").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-base font-medium leading-none text-[#c9d1d9]">
                          {user.user_metadata?.full_name || "User"}
                        </p>
                        <p className="text-sm leading-none text-[#8b949e]">
                          {user.email}
                        </p>
                        <div className="mt-2 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-xs text-[#8b949e]">Active</span>
                        </div>
                      </div>
                    </div>
                  

                  <DropdownMenuSeparator className="my-2 bg-[#21262d]" />
                  
                  <div className="grid gap-1">
                    {menuItems.map((item) => (
                      <React.Fragment key={item.href}>
                        <Link to={item.href}>
                          <DropdownMenuItem 
                            className={`flex items-center gap-2 rounded-md p-2 cursor-pointer ${
                              isActive(item.href)
                                ? 'bg-[#1f6feb] text-white'
                                : 'text-[#c9d1d9] hover:bg-[#1f6feb]/10'
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                            {item.count && (
                              <span className="ml-auto text-xs text-[#8b949e]">{item.count}</span>
                            )}
                            {item.shortcut && (
                              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                            )}
                          </DropdownMenuItem>
                        </Link>
                        {item.divider && <DropdownMenuSeparator className="my-2 bg-[#21262d]" />}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <DropdownMenuItem
                    className="flex items-center gap-2 rounded-md p-2 text-red-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="border-[#21262d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#30363d]"
                asChild
              >
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
