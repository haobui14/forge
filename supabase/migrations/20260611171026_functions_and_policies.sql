-- Gamification RPCs. All are SECURITY DEFINER with a locked search_path and
-- are executable by authenticated users only — auth.uid() scopes every write,
-- and XP values come from lesson_catalog, never the client.

-- Award a lesson completion: idempotent, atomic, streak-aware (UTC days).
create or replace function public.complete_lesson(p_slug text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_xp_award integer;
  v_new_xp integer;
  v_streak integer;
  v_last date;
  v_today date := (now() at time zone 'utc')::date;
begin
  v_user_id := (select auth.uid());
  if v_user_id is null then
    raise exception 'not_authenticated';
  end if;

  select xp into v_xp_award from public.lesson_catalog where slug = p_slug;
  if not found then
    raise exception 'invalid_lesson';
  end if;

  if exists (
    select 1 from public.lesson_completions
    where user_id = v_user_id and lesson_slug = p_slug
  ) then
    select xp, streak into v_new_xp, v_streak from public.profiles where id = v_user_id;
    return jsonb_build_object(
      'already_completed', true,
      'xp_awarded', 0,
      'new_xp', v_new_xp,
      'new_streak', v_streak
    );
  end if;

  select streak, last_activity_date into v_streak, v_last
  from public.profiles
  where id = v_user_id
  for update;

  if v_last is null or v_last < v_today - 1 then
    v_streak := 1;                -- first ever, or gap: reset
  elsif v_last = v_today - 1 then
    v_streak := v_streak + 1;     -- consecutive day
  end if;                         -- same day: unchanged

  insert into public.lesson_completions (user_id, lesson_slug)
  values (v_user_id, p_slug);

  insert into public.daily_activity (user_id, activity_date)
  values (v_user_id, v_today)
  on conflict do nothing;

  update public.profiles
  set xp = xp + v_xp_award,
      streak = v_streak,
      last_activity_date = v_today
  where id = v_user_id
  returning xp into v_new_xp;

  return jsonb_build_object(
    'already_completed', false,
    'xp_awarded', v_xp_award,
    'new_xp', v_new_xp,
    'new_streak', v_streak
  );
end;
$$;

revoke execute on function public.complete_lesson(text) from public, anon;
grant execute on function public.complete_lesson(text) to authenticated;

-- Record a quiz answer (feeds the Quiz Whiz badge).
create or replace function public.record_quiz_attempt(p_slug text, p_is_correct boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then
    raise exception 'not_authenticated';
  end if;
  if not exists (select 1 from public.lesson_catalog where slug = p_slug) then
    raise exception 'invalid_lesson';
  end if;
  insert into public.quiz_attempts (user_id, lesson_slug, is_correct)
  values ((select auth.uid()), p_slug, p_is_correct);
end;
$$;

revoke execute on function public.record_quiz_attempt(text, boolean) from public, anon;
grant execute on function public.record_quiz_attempt(text, boolean) to authenticated;

-- Top-N by XP plus the caller's own row (for the highlighted "you" entry).
-- Security definer so the leaderboard works without exposing profiles broadly.
create or replace function public.get_leaderboard(p_limit integer default 5)
returns table (
  rank bigint,
  handle text,
  xp integer,
  level integer,
  is_me boolean
)
language sql
security definer
stable
set search_path = ''
as $$
  with ranked as (
    select
      rank() over (order by p.xp desc, p.created_at asc) as rank,
      p.id,
      p.handle,
      p.xp,
      least(6, floor(p.xp / 450.0)::integer + 1) as level
    from public.profiles p
  )
  select r.rank, r.handle, r.xp, r.level, (r.id = (select auth.uid())) as is_me
  from ranked r
  where r.rank <= p_limit or r.id = (select auth.uid())
  order by r.rank;
$$;

revoke execute on function public.get_leaderboard(integer) from public, anon;
grant execute on function public.get_leaderboard(integer) to authenticated;
