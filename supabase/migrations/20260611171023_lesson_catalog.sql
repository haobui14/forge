-- Server-authoritative lesson catalog: the complete_lesson RPC reads XP from
-- here, never from the client. Mirrors content/system-design/_catalog.ts.
create table public.lesson_catalog (
  slug text primary key,
  track_id text not null default 'system-design',
  position integer not null,
  stage integer not null check (stage between 0 and 4),
  title text not null,
  xp integer not null check (xp > 0),
  minutes integer not null,
  unique (track_id, position)
);

alter table public.lesson_catalog enable row level security;

create policy "catalog is public"
  on public.lesson_catalog for select
  to anon, authenticated
  using (true);

insert into public.lesson_catalog (slug, track_id, position, stage, title, xp, minutes) values
  ('what-is-system-design',           'system-design', 1,  0, 'What is System Design?',             100, 8),
  ('client-server-model',             'system-design', 2,  0, 'Client–Server Model',                100, 9),
  ('latency-throughput-availability', 'system-design', 3,  0, 'Latency, Throughput & Availability', 120, 10),
  ('http-rest-grpc',                  'system-design', 4,  1, 'HTTP, REST & gRPC',                  120, 11),
  ('load-balancing',                  'system-design', 5,  1, 'Load Balancing',                     150, 12),
  ('cdns-edge-networks',              'system-design', 6,  1, 'CDNs & Edge Networks',               130, 9),
  ('sql-vs-nosql',                    'system-design', 7,  2, 'SQL vs NoSQL',                       130, 10),
  ('replication-sharding',            'system-design', 8,  2, 'Replication & Sharding',             150, 12),
  ('caching-strategies',              'system-design', 9,  2, 'Caching Strategies',                 140, 11),
  ('message-queues-async-work',       'system-design', 10, 3, 'Message Queues & Async Work',        140, 10),
  ('microservices-api-gateways',      'system-design', 11, 3, 'Microservices & API Gateways',       150, 12),
  ('cap-theorem-consistency',         'system-design', 12, 3, 'CAP Theorem & Consistency',          160, 12),
  ('design-url-shortener',            'system-design', 13, 4, 'Design a URL Shortener',             180, 15),
  ('design-news-feed',                'system-design', 14, 4, 'Design a News Feed',                 200, 18),
  ('capstone-mock-interview',         'system-design', 15, 4, 'Capstone: Mock Interview',           250, 25);
