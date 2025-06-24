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

-- Add RLS (Row Level Security) policies
alter table applications enable row level security;

-- Allow public access for inserts (new applications)
create policy "Allow public application submissions"
    on applications
    for insert
    with check (true);

-- Allow authenticated users to view their own applications
create policy "Users can view their own applications"
    on applications
    for select
    using (auth.uid()::text = id::text);

-- Allow admin access to all applications
create policy "Admins can do everything"
    on applications
    to authenticated
    using (auth.role() = 'admin')
    with check (auth.role() = 'admin'); 