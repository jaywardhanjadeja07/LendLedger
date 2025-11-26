-- OPTION 2: If you ALREADY have the 'loans' table, run these commands to update it:

-- 1. Add missing columns (safe to run even if they exist)
alter table public.loans add column if not exists user_id uuid references auth.users(id);
alter table public.loans add column if not exists type text check (type in ('lent', 'borrowed'));
alter table public.loans add column if not exists contact_name text;
alter table public.loans add column if not exists contact_email text;
alter table public.loans add column if not exists contact_phone text;
alter table public.loans add column if not exists amount numeric;
alter table public.loans add column if not exists currency text default 'USD';
alter table public.loans add column if not exists due_date date;
alter table public.loans add column if not exists created_date timestamp with time zone default timezone('utc'::text, now());
alter table public.loans add column if not exists status text check (status in ('active', 'overdue', 'settled')) default 'active';
alter table public.loans add column if not exists interest_rate numeric;
alter table public.loans add column if not exists notes text;
alter table public.loans add column if not exists settled_date timestamp with time zone;

-- 2. Enable Row Level Security (if not already enabled)
alter table public.loans enable row level security;

-- 3. Create policies (Dropping them first to avoid "policy already exists" errors)
drop policy if exists "Users can view their own loans" on public.loans;
drop policy if exists "Users can insert their own loans" on public.loans;
drop policy if exists "Users can update their own loans" on public.loans;
drop policy if exists "Users can delete their own loans" on public.loans;

create policy "Users can view their own loans"
on public.loans for select
using (auth.uid() = user_id);

create policy "Users can insert their own loans"
on public.loans for insert
with check (auth.uid() = user_id);

create policy "Users can update their own loans"
on public.loans for update
using (auth.uid() = user_id);

create policy "Users can delete their own loans"
on public.loans for delete
using (auth.uid() = user_id);
