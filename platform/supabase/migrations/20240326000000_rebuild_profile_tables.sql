-- Drop existing tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS public.user_achievements;
DROP TABLE IF EXISTS public.user_skills;
DROP TABLE IF EXISTS public.achievements;
DROP TABLE IF EXISTS public.skills;
DROP TABLE IF EXISTS public.profiles;

-- Create the main user_profiles table that extends auth.users
CREATE TABLE public.user_profiles (
    -- Core Fields (from auth.users)
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    
    -- Profile Status
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    account_type TEXT DEFAULT 'personal' CHECK (account_type IN ('personal', 'student', 'professional', 'educator')),
    
    -- Basic Information
    bio TEXT,
    tagline TEXT,
    date_of_birth DATE,
    gender TEXT,
    phone TEXT,
    
    -- Location Information
    country TEXT,
    city TEXT,
    state TEXT,
    
    -- Professional Information
    current_position TEXT,
    company TEXT,
    education_level TEXT,
    institution TEXT,
    graduation_year INTEGER,
    
    -- Social Links
    website_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    portfolio_url TEXT,
    
    -- Platform Settings
    theme_preference TEXT DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system')),
    language_preference TEXT DEFAULT 'en',
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "newsletter": true}'::jsonb,
    privacy_settings JSONB DEFAULT '{"profile_visibility": "public", "show_email": false, "show_activity": true}'::jsonb,
    
    -- Engagement Metrics
    reputation_points INTEGER DEFAULT 0,
    activity_score INTEGER DEFAULT 0,
    last_active_at TIMESTAMP WITH TIME ZONE,
    profile_views INTEGER DEFAULT 0,
    
    -- Arrays for multiple values
    skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    languages TEXT[] DEFAULT ARRAY[]::TEXT[],
    certifications JSONB[] DEFAULT ARRAY[]::JSONB[],
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an achievements table
CREATE TABLE public.achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    badge_url TEXT,
    points INTEGER DEFAULT 0,
    category TEXT,
    requirements JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create a user_achievements junction table
CREATE TABLE public.user_achievements (
    user_id UUID REFERENCES public.user_profiles(id),
    achievement_id UUID REFERENCES public.achievements(id),
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    progress JSONB DEFAULT '{}'::jsonb,
    PRIMARY KEY (user_id, achievement_id)
);

-- Create a projects table
CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    title TEXT NOT NULL,
    description TEXT,
    project_url TEXT,
    repository_url TEXT,
    technologies TEXT[],
    thumbnail_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'unlisted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.user_profiles
    FOR SELECT USING (
        (privacy_settings->>'profile_visibility')::TEXT = 'public'
        OR auth.uid() = id
    );

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "System can create user profiles" ON public.user_profiles
    FOR INSERT WITH CHECK (true);

-- RLS Policies for achievements
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements
    FOR SELECT USING (is_active = true);

-- RLS Policies for user_achievements
CREATE POLICY "User achievements are viewable by profile viewers" ON public.user_achievements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = user_achievements.user_id
            AND ((privacy_settings->>'profile_visibility')::TEXT = 'public'
                OR auth.uid() = id)
        )
    );

-- RLS Policies for projects
CREATE POLICY "Public projects are viewable by everyone" ON public.projects
    FOR SELECT USING (
        visibility = 'public'
        OR auth.uid() = user_id
    );

CREATE POLICY "Users can manage own projects" ON public.projects
    FOR ALL USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (
        id,
        email,
        username,
        full_name,
        avatar_url,
        created_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'full_name',
        COALESCE(
            NEW.raw_user_meta_data->>'avatar_url',
            'https://ui-avatars.com/api/?name=' || 
            COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)) ||
            '&background=random'
        ),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating timestamps
CREATE TRIGGER handle_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id); 