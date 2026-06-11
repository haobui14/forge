import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  SIGNED_OUT_USER,
  type LeaderboardRow,
  type UserState,
} from "./user-state";

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Mon..Sun (UTC) of the current week as ISO date strings. */
function currentWeekDays(): string[] {
  const now = new Date();
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - ((now.getUTCDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return isoDate(d);
  });
}

// One round of fetches per request (React cache dedupes across layout + page).
export const getUserState = cache(async (): Promise<UserState> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return SIGNED_OUT_USER;

  const week = currentWeekDays();
  const [profileRes, completionsRes, attemptsRes, activityRes, boardRes] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("handle, xp, streak, last_activity_date")
        .eq("id", user.id)
        .single(),
      supabase.from("lesson_completions").select("lesson_slug").eq("user_id", user.id),
      supabase
        .from("quiz_attempts")
        .select("is_correct")
        .eq("user_id", user.id)
        .order("attempted_at", { ascending: false })
        .limit(10),
      supabase
        .from("daily_activity")
        .select("activity_date")
        .eq("user_id", user.id)
        .gte("activity_date", week[0]),
      supabase.rpc("get_leaderboard", { p_limit: 5 }),
    ]);

  const profile = profileRes.data;
  if (!profile) return SIGNED_OUT_USER;

  const today = isoDate(new Date());
  const yesterday = isoDate(new Date(Date.now() - 86_400_000));
  const lastActivity = profile.last_activity_date as string | null;
  // A streak only counts while it's alive: last activity today or yesterday.
  const streak =
    lastActivity === today || lastActivity === yesterday ? profile.streak : 0;

  const activeDays = new Set(
    (activityRes.data ?? []).map((r) => r.activity_date as string),
  );
  const attempts = attemptsRes.data ?? [];

  const leaderboard: LeaderboardRow[] = ((boardRes.data as
    | { rank: number; handle: string; xp: number; level: number; is_me: boolean }[]
    | null) ?? []).map((r) => ({
    rank: Number(r.rank),
    handle: r.handle,
    level: r.level,
    xp: r.xp,
    isMe: r.is_me,
  }));

  return {
    signedIn: true,
    handle: profile.handle,
    xp: profile.xp,
    streak,
    activeToday: lastActivity === today,
    weekActivity: week.map((d) => activeDays.has(d)),
    completedSlugs: (completionsRes.data ?? []).map((r) => r.lesson_slug as string),
    quizWhiz: attempts.length === 10 && attempts.every((a) => a.is_correct),
    leaderboard,
  };
});
