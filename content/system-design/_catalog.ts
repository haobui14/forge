import type { LessonMeta } from "@/lib/lessons";

// Single source of truth for the System Design track: ordering, stages, XP.
// Mirrored into the Supabase lesson_catalog table by migration so XP awards
// are decided server-side.
export const CATALOG: LessonMeta[] = [
  {
    slug: "what-is-system-design",
    title: "What is System Design?",
    blurb: "Scope, requirements and back-of-envelope math",
    xp: 100,
    minutes: 8,
    stage: 0,
    position: 1,
  },
  {
    slug: "client-server-model",
    title: "Client–Server Model",
    blurb: "Requests, responses and the anatomy of the web",
    xp: 100,
    minutes: 9,
    stage: 0,
    position: 2,
  },
  {
    slug: "latency-throughput-availability",
    title: "Latency, Throughput & Availability",
    blurb: "The numbers every engineer should know",
    xp: 120,
    minutes: 10,
    stage: 0,
    position: 3,
  },
  {
    slug: "http-rest-grpc",
    title: "HTTP, REST & gRPC",
    blurb: "Designing contracts between services",
    xp: 120,
    minutes: 11,
    stage: 1,
    position: 4,
  },
  {
    slug: "load-balancing",
    title: "Load Balancing",
    blurb: "Spreading traffic without dropping a request",
    xp: 150,
    minutes: 12,
    stage: 1,
    position: 5,
  },
  {
    slug: "cdns-edge-networks",
    title: "CDNs & Edge Networks",
    blurb: "Serving the world from 200 locations",
    xp: 130,
    minutes: 9,
    stage: 1,
    position: 6,
  },
  {
    slug: "sql-vs-nosql",
    title: "SQL vs NoSQL",
    blurb: "Choosing the right database for the job",
    xp: 130,
    minutes: 10,
    stage: 2,
    position: 7,
  },
  {
    slug: "replication-sharding",
    title: "Replication & Sharding",
    blurb: "Scaling data beyond a single machine",
    xp: 150,
    minutes: 12,
    stage: 2,
    position: 8,
  },
  {
    slug: "caching-strategies",
    title: "Caching Strategies",
    blurb: "Redis, invalidation and the two hard problems",
    xp: 140,
    minutes: 11,
    stage: 2,
    position: 9,
  },
  {
    slug: "message-queues-async-work",
    title: "Message Queues & Async Work",
    blurb: "Decoupling services with durable logs",
    xp: 140,
    minutes: 10,
    stage: 3,
    position: 10,
  },
  {
    slug: "microservices-api-gateways",
    title: "Microservices & API Gateways",
    blurb: "Splitting the monolith without regret",
    xp: 150,
    minutes: 12,
    stage: 3,
    position: 11,
  },
  {
    slug: "cap-theorem-consistency",
    title: "CAP Theorem & Consistency",
    blurb: "What you give up when networks fail",
    xp: 160,
    minutes: 12,
    stage: 3,
    position: 12,
  },
  {
    slug: "design-url-shortener",
    title: "Design a URL Shortener",
    blurb: "Your first end-to-end system, step by step",
    xp: 180,
    minutes: 15,
    stage: 4,
    position: 13,
  },
  {
    slug: "design-news-feed",
    title: "Design a News Feed",
    blurb: "Fan-out, ranking and timelines at scale",
    xp: 200,
    minutes: 18,
    stage: 4,
    position: 14,
  },
  {
    slug: "capstone-mock-interview",
    title: "Capstone: Mock Interview",
    blurb: "A full 45-minute design interview, graded",
    xp: 250,
    minutes: 25,
    stage: 4,
    position: 15,
  },
];

export function getLessonMeta(slug: string): LessonMeta | undefined {
  return CATALOG.find((l) => l.slug === slug);
}

export function nextLesson(slug: string): LessonMeta | undefined {
  const i = CATALOG.findIndex((l) => l.slug === slug);
  return i >= 0 ? CATALOG[i + 1] : undefined;
}

export const TRACK_XP_TOTAL = CATALOG.reduce((s, l) => s + l.xp, 0);
