-- Progress tables. All writes flow through security-definer RPCs; RLS grants
-- users read access to their own rows only.

create table public.lesson_completions (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_slug text not null references public.lesson_catalog (slug),
  track_id text not null default 'system-design',
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_slug)
);

create index lesson_completions_user_idx on public.lesson_completions (user_id);

alter table public.lesson_completions enable row level security;

create policy "read own completions"
  on public.lesson_completions for select
  to authenticated
  using (user_id = (select auth.uid()));

create table public.quiz_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_slug text not null references public.lesson_catalog (slug),
  is_correct boolean not null,
  attempted_at timestamptz not null default now()
);

create index quiz_attempts_user_time_idx on public.quiz_attempts (user_id, attempted_at desc);

alter table public.quiz_attempts enable row level security;

create policy "read own quiz attempts"
  on public.quiz_attempts for select
  to authenticated
  using (user_id = (select auth.uid()));

-- One row per user per UTC day with at least one completion; feeds the
-- dashboard week dots.
create table public.daily_activity (
  user_id uuid not null references public.profiles (id) on delete cascade,
  activity_date date not null,
  primary key (user_id, activity_date)
);

alter table public.daily_activity enable row level security;

create policy "read own activity"
  on public.daily_activity for select
  to authenticated
  using (user_id = (select auth.uid()));
