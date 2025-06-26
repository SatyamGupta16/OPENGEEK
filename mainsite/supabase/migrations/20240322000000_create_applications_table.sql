-- Begin transaction
begin;

-- Drop existing table and related objects if they exist
drop table if exists applications cascade;

-- Create applications table with all fields
create table applications (
    -- Primary key and status
    id uuid primary key default gen_random_uuid(),
    status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
    submitted_at timestamp with time zone not null default now(),
    last_updated timestamp with time zone default now(),

    -- Personal Information
    name text not null,
    email text not null,
    phone text not null,
    gender text not null default 'other' check (gender in ('male', 'female', 'other')),
    github_profile text not null,
    has_laptop boolean not null default false,

    -- Academic Information
    course text not null,
    semester text not null,

    -- Login Credentials
    username text not null,
    hashed_password text not null,
    temp_password text, -- Added for welcome email

    -- Technical Background
    experience text not null check (experience in ('beginner', 'intermediate', 'advanced')),
    skills text[] not null default '{}',
    additional_skills text[] not null default '{}',
    interests text not null,

    -- Community Interest
    why_join text not null,
    expectations text not null,

    -- Additional Metadata
    is_email_sent boolean default false, -- Track if welcome email was sent
    email_sent_at timestamp with time zone -- Track when welcome email was sent
);

-- Add unique constraints
alter table applications
    add constraint applications_email_unique unique (email),
    add constraint applications_username_unique unique (username);

-- Create indexes for better query performance
create index applications_email_idx on applications(email);
create index applications_username_idx on applications(username);
create index applications_submitted_at_idx on applications(submitted_at desc);
create index applications_status_idx on applications(status);

-- Enable Row Level Security (RLS)
alter table applications enable row level security;

-- Create RLS policies
create policy "Allow public to read all applications"
    on applications for select
    using (true);

create policy "Allow public application submissions"
    on applications for insert
    with check (true);

create policy "Allow public to update applications"
    on applications for update
    using (true)
    with check (true);

-- Create function to automatically update last_updated timestamp
create or replace function update_last_updated_column()
returns trigger as $$
begin
    new.last_updated = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger to update last_updated timestamp
create trigger update_applications_last_updated
    before update on applications
    for each row
    execute function update_last_updated_column();

-- Optional: Add some test data
insert into applications (
    name,
    email,
    phone,
    gender,
    github_profile,
    has_laptop,
    course,
    semester,
    username,
    hashed_password,
    temp_password,
    experience,
    skills,
    additional_skills,
    interests,
    why_join,
    expectations
) values (
    'Test User',
    'test@example.com',
    '+1234567890',
    'male',
    'https://github.com/testuser',
    true,
    'Computer Science',
    '3rd',
    'testuser',
    'hashed_password_here',
    'original_password_here',
    'intermediate',
    array['JavaScript', 'React', 'Node.js', 'Supabase'],
    array['AWS', 'Docker'],
    'Web Development, Cloud Computing',
    'I want to learn and contribute to open source projects',
    'To gain practical experience and collaborate with others'
);

-- Commit transaction
commit; 