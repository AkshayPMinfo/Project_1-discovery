import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL for Supabase Table Initialisation
 * Users can execute this SQL in Supabase SQL editor to bootstrap constraints & tables.
 */
export const SUPABASE_BOOTSTRAP_SQL = `-- 1. CREATE USER PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text default 'Active Learner',
  role text default 'Active PM Learner',
  avatar text default 'Y',
  xp integer default 0,
  xp_today integer default 0,
  day_streak integer default 0,
  weekly_goal_days integer default 0,
  completed_lessons text[] default '{}',
  completed_videos text[] default '{}',
  completed_articles text[] default '{}',
  claimed_module_bonuses text[] default '{}',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies for Profiles
create policy "Allow public read access to profiles"
  on public.profiles for select
  using (true);

create policy "Allow users to insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Allow users to update their own profile"
  on public.profiles for update
  using (auth.uid() = id);


-- 2. CREATE COMMUNITY DISCUSSIONS TABLE
create table if not exists public.community_posts (
  id text primary key,
  author text not null,
  role text not null,
  avatar text not null,
  body text not null,
  likes integer default 0,
  replies integer default 0,
  liked boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete set null
);

alter table public.community_posts enable row level security;

create policy "Allow public read access to posts"
  on public.community_posts for select
  using (true);

create policy "Allow authenticated users to insert posts"
  on public.community_posts for insert
  with check (auth.uid() is not null);

create policy "Allow post owners to update notes"
  on public.community_posts for update
  using (auth.uid() = user_id);
`;
