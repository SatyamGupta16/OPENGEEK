import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotifications } from '@/lib/notifications-context';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Bell, Check, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NotificationIcon = {
  update: Bell,
  event: Bell,
  feature: Bell,
  mention: Bell,
  reply: Bell,
  system: Bell,
};

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#c9d1d9]">Notifications</h1>
        {notifications.length > 0 && (
          <Button
            variant="outline"
            className="text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d]"
            onClick={() => markAllAsRead()}
          >
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        {notifications.length === 0 ? (
          <Card className="p-8 text-center bg-[#161b22] border-[#30363d]">
            <Bell className="w-12 h-12 mx-auto mb-4 text-[#8b949e]" />
            <h3 className="text-lg font-medium text-[#c9d1d9] mb-2">No notifications</h3>
            <p className="text-[#8b949e]">When you have notifications, they'll show up here.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = NotificationIcon[notification.type];
              return (
                <Card
                  key={notification.id}
                  className={`p-4 transition-colors ${
                    notification.read
                      ? 'bg-[#161b22] border-[#30363d]'
                      : 'bg-[#1f6feb]/5 border-[#1f6feb]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      notification.read
                        ? 'bg-[#21262d] text-[#8b949e]'
                        : 'bg-[#1f6feb]/10 text-[#1f6feb]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-[#c9d1d9] mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-[#8b949e] mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[#8b949e]">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9]"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#8b949e] hover:text-red-400"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      {notification.link && (
                        <Link
                          to={notification.link}
                          className="mt-2 text-sm text-[#58a6ff] hover:underline block"
                        >
                          View details →
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
} 