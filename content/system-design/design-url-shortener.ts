import type { LessonContent } from "@/lib/lessons";

export const designUrlShortener: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "A URL shortener looks trivial until you run the numbers. Ten lines of code handle one redirect; a production system handles ten thousand per second — and must stay fast, cheap, and collision-free for years. Walk through it like an interview.",
    },
    { type: "h2", text: "Clarify requirements first" },
    {
      type: "p",
      parts: [
        "Before sketching boxes, ask: which operations matter? At minimum you need ",
        { hl: "shorten a URL" },
        " and ",
        { hl: "redirect a short code" },
        ". But do you also need custom aliases (",
        { code: "https://acme.co/launch" },
        ")? Per-link analytics — click counts, referrers, geo? TTL on links that expire after 30 days? Each feature multiplies complexity. Agree on scope before estimating or designing anything.",
      ],
    },
    {
      type: "p",
      parts: [
        "For a standard interview scope: yes to custom aliases, yes to basic analytics (click count only), no to TTL. Write that down. Now you can do math.",
      ],
    },
    { type: "h2", text: "Napkin math" },
    {
      type: "p",
      parts: [
        "URL shorteners are ",
        { hl: "read-heavy by a wide margin" },
        " — assume a 100:1 read-to-write ratio. At 100 million new URLs per month, that's roughly ",
        { code: "~40 writes/sec" },
        " and ",
        { code: "~4,000 redirects/sec" },
        " sustained. Peak traffic will spike 5–10× — plan for ",
        { code: "~30,000 redirects/sec" },
        " at the top of a viral event.",
      ],
    },
    {
      type: "p",
      parts: [
        "Storage: one URL row is about 500 bytes (short code, long URL, created_at, click count). 100 M rows/month × 12 months × 5 years = 6 billion rows. At 500 bytes each that's ",
        { code: "~3 TB" },
        " — comfortably fits on a single large relational database, but you'll want read replicas to handle those 4,000 redirects/sec.",
      ],
    },
    { type: "h2", text: "API design" },
    {
      type: "p",
      parts: [
        "Two endpoints cover everything. The write path is ",
        { code: "POST /urls" },
        " with a JSON body carrying the long URL and an optional custom alias; it returns the short code. The read path is ",
        { code: "GET /:code" },
        " — the server looks up the code and responds with a redirect. That's the whole public contract.",
      ],
    },
    {
      type: "p",
      parts: [
        "Rate-limit the write endpoint aggressively — an unauthenticated caller can generate unbounded short codes otherwise. A simple ",
        { hl: "token-bucket limiter" },
        " per IP — each caller gets a quota of tokens that refills over time, so short bursts are allowed but sustained abuse is blocked — (say, 10 creates/minute for anonymous callers) keeps abuse in check without building an auth system in your 45-minute interview.",
      ],
    },
    { type: "h2", text: "Short-code generation" },
    {
      type: "p",
      parts: [
        "How do you turn a long URL into a short, unique code? Three strategies, each with a different trade-off profile:",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "base62_counter",
          description:
            "Auto-increment a global counter, then encode it in base62 (a–z, A–Z, 0–9). Counter 1 → \"1\", counter 3,521,614,606,207 → \"zzzzzzz\" (62^7 − 1, the highest 7-character code). 7 base62 chars give 62^7 ≈ 3.5 trillion unique codes. Deterministic, no collisions — but requires a centralized counter or distributed ID generator (Snowflake-style, like Twitter's Snowflake — nodes mint unique IDs from timestamp + machine-ID bits).",
        },
        {
          name: "random_hash",
          description:
            "MD5 or SHA-256 the long URL, take the first 7 characters. Fast, stateless — but different long URLs can collide on the same 7-character prefix, so every write must check for and handle collisions. The flip side: the same URL always hashes to the same code, so you can't issue multiple distinct short codes for one long URL without adding a random salt per request.",
        },
        {
          name: "pregenerated_pool",
          description:
            "A background job pre-generates millions of random codes and stores them in a \"free\" table. Writes pop one out atomically. Zero collision risk at write time; adds operational complexity — you must monitor pool depth and keep it stocked.",
        },
      ],
    },
    {
      type: "p",
      parts: [
        "Base62 over a counter is the interview-safe answer: deterministic, easy to reason about, and scales to ",
        { code: "3.5 trillion" },
        " codes before you'd need an 8th character. Pair it with a distributed ID generator if you need multiple write nodes.",
      ],
    },
    { type: "h2", text: "Data model" },
    {
      type: "p",
      parts: [
        "You need one primary table. The ",
        { code: "short_urls" },
        " table holds: ",
        { code: "code VARCHAR(8) PRIMARY KEY" },
        ", ",
        { code: "long_url TEXT NOT NULL" },
        ", ",
        { code: "created_at TIMESTAMP" },
        ", ",
        { code: "click_count BIGINT DEFAULT 0" },
        ". Index on ",
        { code: "long_url" },
        " if you want deduplication (\"this URL already has a short code — return it\"). That's it. Resist the temptation to over-normalize.",
      ],
    },
    {
      type: "p",
      parts: [
        "Click count updates are high-frequency. Rather than a ",
        { code: "UPDATE" },
        " per redirect — which serializes writes — consider async batching: each app server accumulates counts in memory and flushes to the DB every few seconds. You accept slightly stale counts in exchange for not hammering the primary.",
      ],
    },
    { type: "h2", text: "The read path: cache, then redirect" },
    {
      type: "p",
      parts: [
        "Redirects dominate at 100:1. Put a ",
        { hl: "cache-aside layer" },
        " (Redis) in front of the database. On a redirect request: check Redis for the code — if it's there, redirect immediately. Cache miss? Fetch from DB, write to Redis with a TTL, then redirect. Hot codes live in RAM; cold codes rarely get fetched anyway.",
      ],
    },
    {
      type: "p",
      parts: [
        "That cache hit rate is the system's leverage point — most traffic concentrates on a small set of popular links. A modest Redis cluster with ",
        { code: "~20 GB" },
        " of RAM can cache tens of millions of the most active codes and absorb the vast majority of redirect traffic before the DB sees it.",
      ],
    },
    {
      type: "callout",
      label: "301 VS 302",
      body: "301 Moved Permanently tells browsers to cache the redirect forever — the client never hits your server again for that code. Great for CDN efficiency, terrible for analytics: you lose the click. 302 Found is temporary; browsers re-request every time, so you can count clicks and update the destination. Default to 302 unless caching is the explicit priority.",
    },
    {
      type: "diagram",
      id: "urlshort-arch",
      height: 360,
      alt: "URL shortener architecture: client → LB → app servers → cache → DB, write and redirect paths",
    },
    { type: "h2", text: "Scaling reads with replicas and a CDN" },
    {
      type: "p",
      parts: [
        "Redirects are stateless and cacheable — a perfect fit for a ",
        { hl: "CDN at the edge" },
        ". Push 302 responses (or even 301s for truly static links) to CDN PoPs worldwide. A user in Tokyo follows a link; the CDN edge node in Tokyo answers within single-digit milliseconds, never touching your origin. This collapses redirect latency and takes the sustained 4,000 req/sec off your app tier entirely.",
      ],
    },
    {
      type: "p",
      parts: [
        "For the DB tier, add read replicas to handle cache misses and analytics queries. The write primary handles only new shortens — that's the low-QPS path at ~40 writes/sec. Reads fan out across replicas. If you grow large enough to outgrow a single shard, partition by the first character of the short code — 62 shards, each owning roughly equal traffic.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Base62 over an auto-increment counter gives you 3.5 trillion collision-free codes with 7 characters — the safe default for code generation.",
        "Cache-aside on Redis absorbs the 100:1 read skew; most redirect traffic never reaches the database.",
        "Use 302 redirects by default so analytics counts are accurate — switch to 301 only when CDN cacheability is more valuable than per-click telemetry.",
      ],
    },
    {
      type: "quiz",
      question:
        "A URL shortener serves 100 million new URLs per month with a 100:1 read-to-write ratio. Which component most directly reduces load on the primary database for redirect traffic?",
      options: [
        "Adding more write replicas",
        "A cache-aside layer (e.g., Redis) keyed by short code",
        "Switching from base62 to a random hash",
        "Using 301 instead of 302 redirects",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — a cache-aside layer keyed by short code absorbs the dominant read traffic so most redirects never reach the database.",
      wrongMsg:
        "Not quite — think about where the 100:1 read skew lands and what sits between the client and the database. Try again.",
    },
  ],
};
