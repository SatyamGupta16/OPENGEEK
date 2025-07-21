import { supabase } from './supabase';
import type { Notification } from './notifications-context';

type NotificationInput = {
  title: string;
  message: string;
  type: Notification['type'];
  link?: string;
  is_public?: boolean;
  icon?: string;
  category?: 'system' | 'community' | 'learning' | 'achievement' | 'announcement';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
};

const NOTIFICATION_TEMPLATES = {
  WELCOME: {
    title: 'Welcome to OpenGeek!',
    message: 'Start your journey by exploring our learning paths and connecting with fellow developers.',
    type: 'system' as const,
    category: 'system',
    icon: '👋',
    link: '/learn',
    priority: 'normal' as const,
    is_public: false
  },
  
  NEW_COURSE: {
    title: 'New Course: Advanced Web Development',
    message: 'Master modern web technologies with our comprehensive new course.',
    type: 'update' as const,
    category: 'learning',
    icon: '📚',
    link: '/learn/web-development',
    is_public: true,
    priority: 'high' as const
  },
  
  COMMUNITY_EVENT: {
    title: 'Upcoming Workshop: Open Source Contributing',
    message: 'Join us this weekend for a hands-on workshop on contributing to open source projects.',
    type: 'event' as const,
    category: 'community',
    icon: '🎯',
    link: '/events',
    is_public: true,
    priority: 'high' as const
  },
  
  PLATFORM_UPDATE: {
    title: 'Platform Update: New Features',
    message: "We've added new collaboration tools and improved the learning experience.",
    type: 'feature' as const,
    category: 'announcement',
    icon: '🚀',
    link: '/updates',
    is_public: true,
    priority: 'normal' as const
  },
  
  ACHIEVEMENT_UNLOCKED: {
    title: 'Achievement Unlocked: Quick Learner',
    message: 'You completed your first course module. Keep up the great work!',
    type: 'feature' as const,
    category: 'achievement',
    icon: '🏆',
    link: '/profile/achievements',
    is_public: false,
    priority: 'normal' as const
  },
  
  NEW_REPLY: {
    title: 'New Reply to Your Discussion',
    message: 'Someone has responded to your question about React hooks.',
    type: 'reply' as const,
    category: 'community',
    icon: '💬',
    link: '/discussions',
    is_public: false,
    priority: 'normal' as const
  }
} as const;

export async function addPublicNotification(template: keyof typeof NOTIFICATION_TEMPLATES): Promise<void> {
  const notificationTemplate = NOTIFICATION_TEMPLATES[template];
  if (!notificationTemplate.is_public) {
    throw new Error('Cannot send non-public notification template as public notification');
  }

  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: null,
        ...notificationTemplate,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error adding public notification:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to add public notification:', error);
    throw error;
  }
}

export async function addPersonalNotification(
  userId: string,
  template: keyof typeof NOTIFICATION_TEMPLATES,
  customData?: Partial<NotificationInput>
): Promise<Notification | null> {
  try {
    const baseNotification = NOTIFICATION_TEMPLATES[template];
    const notification = {
      ...baseNotification,
      ...customData,
      user_id: userId,
      is_public: false,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select('*')
      .single();

    if (error) {
      console.error('Error adding personal notification:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to add personal notification:', error);
    return null;
  }
}

export async function addTestNotification(userId: string): Promise<Notification | null> {
  const templates = Object.keys(NOTIFICATION_TEMPLATES) as (keyof typeof NOTIFICATION_TEMPLATES)[];
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  return addPersonalNotification(userId, randomTemplate);
}

export async function addMultipleTestNotifications(userId: string, count: number = 5): Promise<(Notification | null)[]> {
  const promises = Array(count).fill(null).map(() => addTestNotification(userId));
  return Promise.all(promises);
}

export async function clearAllNotifications(userId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error clearing notifications:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to clear notifications:', error);
    throw error;
  }
}

export async function announceNewFeature(title: string, message: string): Promise<void> {
  const notification: NotificationInput = {
    title,
    message,
    type: 'feature',
    category: 'announcement',
    icon: '✨',
    is_public: true,
    priority: 'high',
    link: '/updates'
  };

  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: null,
        ...notification,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to announce new feature:', error);
    throw error;
  }
}