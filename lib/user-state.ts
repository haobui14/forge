// Shape of the signed-in user's progress as consumed by every screen.
// Phase 1–3 serve a stub; phase 4 swaps the source to Supabase without
// touching the components.

export interface LeaderboardRow {
  rank: number;
  handle: string;
  level: number;
  xp: number;
  isMe: boolean;
}

export interface UserState {
  signedIn: boolean;
  handle: string;
  xp: number;
  streak: number;
  /** true once a lesson has been completed today (drives today's streak dot) */
  activeToday: boolean;
  /** trailing 7 calendar days, Monday-first, true = completed a lesson that day */
  weekActivity: boolean[];
  completedSlugs: string[];
  quizWhiz: boolean;
  leaderboard: LeaderboardRow[];
}

export const STUB_USER: UserState = {
  signedIn: true,
  handle: "you",
  xp: 560,
  streak: 6,
  activeToday: false,
  weekActivity: [true, true, true, true, true, true, false],
  completedSlugs: [
    "what-is-system-design",
    "client-server-model",
    "latency-throughput-availability",
    "http-rest-grpc",
  ],
  quizWhiz: false,
  leaderboard: [
    { rank: 1, handle: "mira.dev", level: 6, xp: 2840, isMe: false },
    { rank: 2, handle: "kt_builds", level: 5, xp: 2310, isMe: false },
    { rank: 3, handle: "octocache", level: 3, xp: 890, isMe: false },
    { rank: 4, handle: "you", level: 2, xp: 560, isMe: true },
    { rank: 5, handle: "newgrad_sam", level: 1, xp: 410, isMe: false },
  ],
};

export const SIGNED_OUT_USER: UserState = {
  signedIn: false,
  handle: "",
  xp: 0,
  streak: 0,
  activeToday: false,
  weekActivity: [false, false, false, false, false, false, false],
  completedSlugs: [],
  quizWhiz: false,
  leaderboard: [],
};
