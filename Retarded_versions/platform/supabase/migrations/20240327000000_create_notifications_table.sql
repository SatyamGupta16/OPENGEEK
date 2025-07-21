-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create basic enum types
CREATE TYPE notification_category AS ENUM (
  'system',
  'community',
  'learning',
  'achievement',
  'announcement'
);

CREATE TYPE notification_priority AS ENUM (
  'low',
  'normal',
  'high',
  'urgent'
);

CREATE TYPE notification_type AS ENUM (
  'system',
  'update',
  'event',
  'feature',
  'mention',
  'reply'
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL DEFAULT 'system',
  category notification_category NOT NULL DEFAULT 'system',
  priority notification_priority NOT NULL DEFAULT 'normal',
  icon TEXT,
  link TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create basic indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX idx_notifications_is_public ON public.notifications(is_public);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_notifications_type ON public.notifications(type);
CREATE INDEX idx_notifications_category ON public.notifications(category);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can view their own and public notifications" ON public.notifications
  FOR SELECT
  USING (
    auth.uid() = user_id OR 
    is_public = true
  );

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON public.notifications
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to mark notification as read
CREATE OR REPLACE FUNCTION public.mark_notification_as_read(notification_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.notifications
  SET read = true, updated_at = NOW()
  WHERE id = notification_id AND user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to mark all notifications as read
CREATE OR REPLACE FUNCTION public.mark_all_notifications_as_read()
RETURNS VOID AS $$
BEGIN
  UPDATE public.notifications
  SET read = true, updated_at = NOW()
  WHERE user_id = auth.uid() AND read = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to delete old notifications
CREATE OR REPLACE FUNCTION public.delete_old_notifications()
RETURNS VOID AS $$
BEGIN
  DELETE FROM public.notifications
  WHERE created_at < NOW() - INTERVAL '30 days'
  AND read = true
  AND is_public = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a cron job to clean up old notifications (runs daily at midnight)
SELECT cron.schedule(
  'cleanup-old-notifications',
  '0 0 * * *',
  $$SELECT public.delete_old_notifications();$$
);

-- Grant permissions
GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_notification_as_read TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_all_notifications_as_read TO authenticated;

-- Example notifications for the community launch workshop
INSERT INTO public.notifications (
  title,
  message,
  type,
  category,
  priority,
  link,
  is_public
) VALUES (
  'Mandatory: Community Launch Workshop',
  'Join us for our first official community workshop on July 5th, 2024, at 2:00 PM UTC. Learn about OpenGeek''s vision, community guidelines, and upcoming features.',
  'event',
  'announcement',
  'high',
  '/events/community-launch',
  true
);

-- Example system notification
INSERT INTO public.notifications (
  title,
  message,
  type,
  category,
  priority,
  is_public
) VALUES (
  'Welcome to OpenGeek Platform Beta',
  'We''re excited to have you join our growing community of developers. Explore our learning paths and connect with fellow developers.',
  'system',
  'system',
  'normal',
  true
);

-- Example queries for manual insertion:

/*
-- Add a public announcement (visible to all users)
INSERT INTO public.notifications (
  title,
  message,
  type,
  category,
  priority,
  icon,
  link,
  is_public
) VALUES (
  'Welcome to OpenGeek Platform!',
  'Start your journey by exploring our learning paths and connecting with fellow developers.',
  'system',
  'announcement',
  'normal',
  '👋',
  '/learn',
  true
);

-- Add a personal notification (for specific user)
INSERT INTO public.notifications (
  user_id,
  title,
  message,
  type,
  category,
  priority,
  icon,
  link
) VALUES (
  'USER_ID_HERE', -- Replace with actual user ID
  'Achievement Unlocked: Quick Learner',
  'You completed your first course module. Keep up the great work!',
  'feature',
  'achievement',
  'normal',
  '🏆',
  '/profile/achievements'
);

-- Mark notification as read
UPDATE public.notifications
SET read = true
WHERE id = 'NOTIFICATION_ID_HERE'; -- Replace with actual notification ID

-- Get user's notifications (including public ones)
SELECT * FROM public.notifications
WHERE user_id = 'USER_ID_HERE' OR is_public = true
ORDER BY created_at DESC;

-- Get only unread notifications
SELECT * FROM public.notifications
WHERE (user_id = 'USER_ID_HERE' OR is_public = true)
AND read = false
ORDER BY created_at DESC;
*/