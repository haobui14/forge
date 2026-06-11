-- Profiles: one row per auth user, holds gamification state.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  handle text not null unique check (handle ~ '^[a-z0-9_.]{3,24}$'),
  display_name text,
  xp integer not null default 0 check (xp >= 0),
  streak integer not null default 0 check (streak >= 0),
  last_activity_date date,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read own profile"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

-- xp / streak / last_activity_date are mutated only by the complete_lesson
-- RPC (security definer). No update policy for authenticated users keeps
-- identity edits out of scope for v1 and gamification fields tamper-proof.

-- Auto-create a profile when a user signs up. Handle comes from signup
-- metadata; collisions get a short suffix from the user id.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_handle text;
begin
  v_handle := lower(coalesce(
    nullif(new.raw_user_meta_data ->> 'handle', ''),
    split_part(new.email, '@', 1)
  ));
  v_handle := regexp_replace(v_handle, '[^a-z0-9_.]', '_', 'g');
  v_handle := substr(v_handle, 1, 20);
  if length(v_handle) < 3 then
    v_handle := 'builder_' || substr(new.id::text, 1, 4);
  end if;
  if exists (select 1 from public.profiles where handle = v_handle) then
    v_handle := substr(v_handle, 1, 15) || '_' || substr(replace(new.id::text, '-', ''), 1, 4);
  end if;

  insert into public.profiles (id, handle, display_name)
  values (
    new.id,
    v_handle,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), v_handle)
  );
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
