import type { LessonContent } from "@/lib/lessons";

export const cachingStrategies: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Phil Karlton famously said there are only two hard things in computer science: cache invalidation and naming things. He was making a joke. Both problems will cost you production incidents until you treat them seriously.",
    },
    { type: "h2", text: "Where caches live" },
    {
      type: "p",
      parts: [
        "Caching isn't a single layer — it's a stack. The ",
        { hl: "browser cache" },
        " stores assets locally so return visits skip the network entirely. A ",
        { hl: "CDN" },
        " caches responses at edge nodes 10–50 ms from users worldwide. Your ",
        { hl: "application cache" },
        " — typically Redis — sits between your app servers and the database, absorbing repeated reads. Finally, the database itself maintains a ",
        { hl: "buffer pool" },
        " — an in-memory page cache that keeps recently-read data blocks in RAM — so queries that hit it skip disk entirely.",
      ],
    },
    {
      type: "p",
      parts: [
        "Each layer has a different scope and eviction policy, but the economics are the same: memory is ~1,000× faster than disk, and a local read is ~10× faster than a network round-trip. A 95 % cache hit ratio on a service handling 10,000 req/s means your database sees 500 req/s instead of 10,000 — a 20× reduction in database load from one number.",
      ],
    },
    { type: "h2", text: "The four caching patterns" },
    {
      type: "p",
      parts: [
        "How your application reads and writes through the cache determines correctness and performance. Each pattern makes a different trade-off:",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "cache_aside",
          description:
            "The app checks the cache first. On a miss, it fetches from the database, then writes the result back to the cache. Simple and lazy — only popular data ever lands in cache. The most common pattern; Redis plus your ORM.",
        },
        {
          name: "write_through",
          description:
            "Every write goes to the cache and the database synchronously. Reads always hit warm cache, but writes pay extra latency. Ideal when read-after-write consistency is critical.",
        },
        {
          name: "write_behind",
          description:
            "Writes land in cache immediately; the database is updated asynchronously in the background. Low write latency, but a crash before the flush loses data. Use only where some data loss is acceptable. Rarely the right choice for user data or financial records — reach for write-through or cache-aside where losing a write is unacceptable.",
        },
        {
          name: "refresh_ahead",
          description:
            "The cache proactively refreshes entries before they expire, based on access frequency predictions. Eliminates miss spikes on popular keys at the cost of over-fetching data that may not be read again.",
        },
      ],
    },
    {
      type: "diagram",
      id: "cache-aside",
      height: 300,
      alt: "App checking cache — hit path in amber, miss path going to DB and writing back",
    },
    { type: "h2", text: "Invalidation: the hard part" },
    {
      type: "p",
      parts: [
        "Stale data is the original cache sin. Two strategies cover most cases. ",
        { hl: "TTL-based expiry" },
        " — every key gets a time-to-live and silently expires after it. Simple, but you're trading correctness for simplicity: a record updated 1 second after the TTL resets might serve stale data for almost its full TTL. ",
        { hl: "Explicit invalidation" },
        " — your write path deletes or updates the cache key immediately — gives you fresh data but couples your write code to the cache topology.",
      ],
    },
    {
      type: "p",
      parts: [
        "TTLs with some jitter handle most workloads. Add ",
        { code: "Math.random() * 30" },
        " seconds to your base TTL so a wave of simultaneous expiries doesn't send every request racing to the database at once — that race is the ",
        { hl: "cache stampede" },
        " problem. A stampede happens when a popular key expires under load: hundreds of threads all see a miss, all query the database, and all write the same value back. The fix is a short distributed lock (Redis ",
        { code: "SET NX" },
        " works) so only one thread fetches; the others wait a millisecond and then read the freshly populated key.",
      ],
    },
    {
      type: "callout",
      label: "TWO HARD THINGS",
      body: "Cache invalidation is hard because it is a distributed consistency problem dressed in performance clothing. When in doubt: short TTL + jitter beats clever invalidation logic, and explicit invalidation on write beats hoping expiry clears stale data in time.",
    },
    { type: "h2", text: "Redis as the default shared cache" },
    {
      type: "p",
      parts: [
        "Redis is the industry default for a shared application cache — in-memory, sub-millisecond latency at p99. Command execution is single-threaded (which makes operations atomic without locks), while Redis 6+ handles network I/O on multiple threads for higher throughput. A single Redis node handles ~100,000 ops/sec; Redis Cluster partitions data across nodes when you outgrow one. Beyond caching, the same Redis instance can serve session storage, rate-limit counters, pub/sub, and distributed locks — making it one of the highest-leverage infrastructure choices in a backend stack.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Caching is a stack — browser, CDN, app cache, DB buffer pool — each layer absorbing a different class of repeated reads.",
        "Cache-aside is the default pattern; add TTLs with jitter to prevent stampedes, and explicit invalidation on write for correctness-critical data.",
        "Redis is the go-to shared cache: sub-millisecond latency, atomic operations, and enough data structures to replace several other services.",
      ],
    },
    {
      type: "quiz",
      question:
        "A popular key expires simultaneously for hundreds of concurrent requests. All of them query the database at once. What is this failure mode called?",
      options: [
        "Cache poisoning",
        "Write-behind failure",
        "Cache stampede",
        "Hot key overload — a single key receiving too many reads",
      ],
      correctIndex: 2,
      correctMsg:
        "A cache stampede occurs when a popular key expires under load and many concurrent requests simultaneously race to repopulate it from the database.",
      wrongMsg:
        "Close, but that term describes a different caching problem. Try again.",
    },
  ],
};
