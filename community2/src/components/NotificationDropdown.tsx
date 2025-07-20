import { Bell, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '../lib/notifications-context';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '../lib/utils';

export function NotificationDropdown() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'mention':
        return '👋';
      case 'reply':
        return '💬';
      case 'update':
        return '📢';
      case 'event':
        return '📅';
      case 'feature':
        return '✨';
      default:
        return '🔔';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-zinc-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={() => markAllAsRead()}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="text-center py-4 text-sm text-zinc-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex items-start gap-2 p-3 cursor-default",
                  !notification.read && "bg-zinc-900"
                )}
              >
                <span className="text-xl mt-0.5">{getNotificationIcon(notification.type)}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      "text-sm line-clamp-2",
                      !notification.read && "font-medium text-zinc-100"
                    )}>
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-900/10"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {formatTimestamp(notification.created_at)}
                    </span>
                    {notification.category && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                        {notification.category}
                      </span>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 