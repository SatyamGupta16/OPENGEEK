-- Drop existing constraints and indexes if they exist
do $$ 
begin
    -- Drop existing constraints
    alter table if exists applications
        drop constraint if exists applications_email_unique,
        drop constraint if exists applications_username_unique;
        
    -- Drop existing indexes
    drop index if exists applications_email_idx;
    drop index if exists applications_username_idx;
    drop index if exists applications_submitted_at_idx;

    -- Drop existing policies
    drop policy if exists "Allow public application submissions" on applications;
    drop policy if exists "Allow public to read all applications" on applications;
    drop policy if exists "Allow public to update applications" on applications;
end $$;

-- Create applications table
create table if not exists applications (
    id uuid primary key,
    status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
    submitted_at timestamp with time zone not null default now(),
    name text not null,
    email text not null,
    phone text not null,
    github_profile text not null,
    course text not null,
    semester text not null,
    username text not null,
    hashed_password text not null,
    experience text not null,
    skills text[] not null default '{}',
    interests text not null,
    why_join text not null,
    expectations text not null,
    last_updated timestamp with time zone
);

-- Add unique constraints
alter table applications
    add constraint applications_email_unique unique (email),
    add constraint applications_username_unique unique (username);

-- Create indexes for better query performance
create index if not exists applications_email_idx on applications(email);
create index if not exists applications_username_idx on applications(username);
create index if not exists applications_submitted_at_idx on applications(submitted_at desc);

-- First, disable RLS to ensure it's in a clean state
alter table applications disable row level security;

-- Then enable RLS
alter table applications enable row level security;

-- Create policies with no authentication required
create policy "Allow public to read all applications"
    on applications for select
    using (true);

create policy "Allow public to insert applications"
    on applications for insert
    with check (true);

create policy "Allow public to update applications"
    on applications for update
    using (true)
    with check (true);

-- Add some test data (optional - comment out if not needed)
insert into applications (
    id,
    name,
    email,
    phone,
    github_profile,
    course,
    semester,
    username,
    hashed_password,
    experience,
    skills,
    interests,
    why_join,
    expectations
) values (
    gen_random_uuid(),
    'Test User',
    'test@example.com',
    '+1234567890',
    'https://github.com/testuser',
    'Computer Science',
    '3rd',
    'testuser',
    'hashed_password_here',
    'intermediate',
    array['JavaScript', 'React', 'Node.js'],
    'Web Development, AI/ML',
    'I want to learn and contribute to open source projects',
    'To gain practical experience and collaborate with others'
); 