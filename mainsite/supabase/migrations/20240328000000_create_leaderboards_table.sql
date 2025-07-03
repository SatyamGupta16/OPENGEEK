-- Drop existing type if exists
DROP TYPE IF EXISTS member_tier CASCADE;

-- Create enum for member tiers
CREATE TYPE member_tier AS ENUM ('Pro', 'Classic', 'Beginner');

-- Drop existing table if exists
DROP TABLE IF EXISTS public.leaderboards CASCADE;

-- Create the leaderboards table
CREATE TABLE public.leaderboards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    tier member_tier NOT NULL,
    rank INTEGER NOT NULL UNIQUE,
    tag TEXT,
    github_url TEXT,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster querying
CREATE INDEX leaderboards_rank_idx ON public.leaderboards(rank);

-- Enable RLS
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
ON public.leaderboards FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated insert"
ON public.leaderboards FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
ON public.leaderboards FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    new.updated_at = timezone('utc'::text, now());
    RETURN new;
END;
$$;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS handle_updated_at ON public.leaderboards;
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.leaderboards
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert test data
INSERT INTO public.leaderboards 
(name, tier, rank, tag, github_url, points)
VALUES
(
    'David Chen',
    'Pro',
    1,
    'AI/ML Expert',
    'https://github.com/david',
    2500
),
(
    'Michael Park',
    'Classic',
    2,
    'Full Stack',
    'https://github.com/michael',
    1500
),
(
    'Lisa Zhang',
    'Beginner',
    3,
    'Frontend',
    'https://github.com/lisa',
    500
); 