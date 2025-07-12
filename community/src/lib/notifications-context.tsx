import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from './auth-context';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  user_id: string | null; // null indicates public notification
  title: string;
  message: string;
  type: 'update' | 'event' | 'feature' | 'mention' | 'reply' | 'system';
  read: boolean;
  link?: string;
  created_at: string;
  is_public?: boolean;
  icon?: string;
  category?: 'system' | 'community' | 'learning' | 'achievement' | 'announcement';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

interface NotificationsContextType {
  notifications: Notification[];
  publicNotifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [publicNotifications, setPublicNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  // Fetch public notifications
  const fetchPublicNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .is('user_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPublicNotifications(data || []);
    } catch (error) {
      console.error('Error fetching public notifications:', error);
    }
  };

  // Fetch personal notifications
  const fetchPersonalNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching personal notifications:', error);
      toast.error('Failed to load notifications');
    }
  };

  useEffect(() => {
    // Fetch initial notifications
    fetchPublicNotifications();
    if (user) {
      fetchPersonalNotifications();
    }

    // Subscribe to personal notifications
    const personalChannel = user && supabase
      .channel('personal-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications(prev => [newNotification, ...prev]);
          toast(newNotification.title, {
            description: newNotification.message,
            icon: newNotification.icon,
            duration: 5000,
          });
        }
      )
      .subscribe();

    // Subscribe to public notifications
    const publicChannel = supabase
      .channel('public-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: 'user_id=is.null',
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setPublicNotifications(prev => [newNotification, ...prev]);
          toast(newNotification.title, {
            description: newNotification.message,
            icon: newNotification.icon,
            duration: 5000,
          });
        }
      )
      .subscribe();

    return () => {
      if (personalChannel) supabase.removeChannel(personalChannel);
      supabase.removeChannel(publicChannel);
    };
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to update notification');
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev =>
        prev.filter(notification => notification.id !== id)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications: [...notifications, ...publicNotifications],
        publicNotifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
} 