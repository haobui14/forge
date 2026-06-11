# forge://

A gamified software-engineering education platform. Learners follow a winding roadmap of
sequential lessons, read diagram-rich deep dives, and stay motivated through XP, levels,
streaks, milestone badges, and a leaderboard.

Built from the high-fidelity design handoff "Forge — Gamified Software-Engineering Learning
Platform". The first track — **System Design** — ships complete: 15 fully-authored lessons
across 5 stages, each with hand-built SVG architecture diagrams and a comprehension quiz.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **Supabase** — email/password auth (`@supabase/ssr`), Postgres with RLS, gamification
  awarded through `SECURITY DEFINER` RPCs so clients can never mint their own XP
- Fonts: Bricolage Grotesque (display/body) + JetBrains Mono (labels, stats, code) via `next/font`

## Running locally

Prereqs: Node 20+, Docker Desktop, Supabase CLI.

```bash
npm install
supabase start        # boots local Postgres/Auth, applies migrations + seed
npm run dev           # http://localhost:3000
```

`.env.local` points at the local Supabase stack (`http://127.0.0.1:54321` + the publishable
key printed by `supabase start`). Four demo accounts are seeded for leaderboard flavor
(password `forge-demo-123`): `mira@demo.forge`, `kt@demo.forge`, `octo@demo.forge`,
`sam@demo.forge`.

For a hosted deployment: create a Supabase project, `supabase link` + `supabase db push`,
and swap the env vars.

## Architecture

```
app/                    # routes: / (landing), /roadmap, /dashboard, /lessons/[slug], /auth/*
components/
  lesson/               # LessonBody block renderer, Quiz, LessonCompletion, diagrams/ (SVG)
  roadmap/              # RoadmapCanvas — sine-wave path + 20 nodes
  dashboard/ landing/ nav/ ui/
content/system-design/  # 15 lessons as typed TS objects (_catalog.ts = source of truth)
lib/
  lessons.ts            # Block type union for lesson content
  roadmap.ts            # roadmap geometry (ported verbatim from the design prototype)
  progress.ts           # levels (450 XP each, Novice→Legend), badge predicates
  data.ts               # getUserState() — one cached fetch round per request
  actions.ts            # server actions: login/signup/signOut/completeLesson/recordQuizAttempt
  supabase/             # @supabase/ssr server/browser clients + proxy session refresh
supabase/migrations/    # profiles, lesson_catalog, progress tables, RPCs, RLS
proxy.ts                # session refresh; hard-protects /dashboard only
```

### Key decisions

- **Lessons are typed data, not MDX.** Each lesson exports a `LessonContent` of typed blocks
  (lede, prose with highlight/code marks, callouts, definition rows, comparison tables,
  diagrams, takeaways, quiz). The renderer guarantees every lesson matches the design system.
- **Soft gate.** Landing, roadmap, and lessons are publicly readable; only `/dashboard` and
  progress writes require an account.
- **Server-authoritative gamification.** `complete_lesson(slug)` validates against the
  `lesson_catalog` table, is idempotent, row-locks the profile, and updates XP + streak
  (UTC calendar days: same day no-op, consecutive +1, gap resets) in one transaction.
  Direct table writes are blocked by RLS — verified.
- **Badges are derived, not stored** — computed from completions/streak/quiz attempts at
  read time. Quiz Whiz = last 10 quiz answers all correct.

## Adding content

- **New lesson:** add a row to `content/system-design/_catalog.ts`, author
  `content/system-design/<slug>.ts`, register it in `content/system-design/index.ts`, add the
  slug row to the `lesson_catalog` migration (or a new migration), and drop any new diagram
  components into `components/lesson/diagrams/` + its `index.ts` registry.
- **New track:** the landing grid, catalog, and DB schema are already track-aware
  (`track_id`); the roadmap page currently renders the System Design track.
