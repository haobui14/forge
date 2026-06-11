import type { LessonContent } from "@/lib/lessons";

export const designNewsFeed: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Every social app needs a feed — a ranked, personalized timeline that loads instantly and stays fresh. The core decision shapes the entire data model, cache strategy, and write pipeline: do you compute the feed when a post is written, or when a user opens the app?",
    },
    { type: "h2", text: "Requirements and scale" },
    {
      type: "p",
      parts: [
        "Scope it before you design it. Users can ",
        { hl: "follow other users" },
        ", post text and images, and see a ",
        { hl: "ranked, paginated timeline" },
        " of posts from people they follow. The timeline must load in under 200 ms and support infinite scroll. Writes (new posts) can tolerate a few seconds of propagation lag — users won't notice if a friend's post takes three seconds to appear.",
      ],
    },
    {
      type: "p",
      parts: [
        "At Twitter scale: 300 M daily active users, ~500 M posts per day, average follow graph of 200 followers per user — meaning each post fans out to roughly 200 follower feeds on average. A single viral post from someone with 10 M followers must fan out to 10 M feed caches. That number — ",
        { code: "10,000,000 cache writes from one post" },
        " — is the design's central stress test.",
      ],
    },
    { type: "h2", text: "Fan-out on write vs fan-out on read" },
    {
      type: "p",
      parts: [
        "Two pure strategies, diametrically opposed. ",
        { hl: "Fan-out on write" },
        " precomputes every follower's feed the moment a post lands. Each follower has a pre-sorted feed list in cache — reads are instant, just fetch the list. ",
        { hl: "Fan-out on read" },
        " does the opposite: store nothing extra at write time; at read time, fetch the IDs of everyone the user follows, query their posts, merge, and rank. Writes are trivial; reads are expensive.",
      ],
    },
    {
      type: "table",
      cols: ["FAN-OUT ON WRITE", "FAN-OUT ON READ"],
      rows: [
        {
          label: "POST COST",
          a: "High — write to every follower's feed cache",
          b: "Low — just write the post once",
        },
        {
          label: "READ COST",
          a: "Low — feed is precomputed, just fetch",
          b: "High — merge N followee timelines at request time",
        },
        {
          label: "STALENESS",
          a: "Near-real-time for most users",
          b: "Always fresh — computed on demand",
        },
        {
          label: "BREAKS WHEN",
          a: "A user has 10M followers — 10M cache writes per post",
          b: "A user follows 5,000 accounts — massive fan-in at read time",
        },
      ],
    },
    {
      type: "p",
      parts: [
        "Neither extreme survives real scale on its own. The read path collapses when a power user follows thousands of accounts. The write path collapses when a celebrity posts to millions of followers. The solution is to pick a threshold and mix.",
      ],
    },
    { type: "h2", text: "The celebrity problem and the hybrid answer" },
    {
      type: "p",
      parts: [
        "Define a ",
        { hl: "celebrity threshold" },
        " — say, 1 M followers. For normal users (below the threshold), use fan-out on write: when they post, push the post ID to every follower's feed cache via a message queue. For celebrities (above the threshold), skip fan-out entirely. Instead, at read time, inject their recent posts into the viewer's feed after the precomputed portion is fetched.",
      ],
    },
    {
      type: "p",
      parts: [
        "This hybrid caps worst-case write amplification while keeping reads fast. The extra read-time join for celebrity posts is bounded — you only fetch the last N posts from a small, known set of followed celebrities, not an unbounded merge across all followees.",
      ],
    },
    {
      type: "callout",
      label: "THE CELEBRITY HYBRID",
      body: "Fan-out on write for ordinary users (fast reads, bounded write cost). Fan-out on read for celebrities (prevents catastrophic write amplification on viral posts). The threshold is a tunable config, not a hard architectural boundary.",
    },
    {
      type: "diagram",
      id: "feed-fanout",
      height: 330,
      alt: "Write path: normal post fans out to follower feed caches. Celebrity post pulled at read time instead.",
    },
    { type: "h2", text: "Ranking" },
    {
      type: "p",
      parts: [
        "Raw reverse-chronological feeds work but give up engagement you could have earned. Real ranking uses a ",
        { hl: "scoring function" },
        " that blends multiple signals: recency (exponential decay over time), engagement on the post so far (likes, comments, reshares — normalized by reach), relationship strength (how often does this viewer interact with the author?), and content type (video posts often get a slight boost if the platform monetizes video).",
      ],
    },
    {
      type: "p",
      parts: [
        "In practice, you don't re-rank the entire feed on every load. Rank at write time when the post is fanned out, re-rank the top N posts periodically as engagement signals update. A ",
        { code: "score FLOAT" },
        " column in the feed cache entry is updated by a background worker — reads just sort by score descending.",
      ],
    },
    { type: "h2", text: "Pagination: cursors over offsets" },
    {
      type: "p",
      parts: [
        "Infinite scroll requires pagination that stays stable as new content is inserted. ",
        { hl: "Offset pagination" },
        " — ",
        { code: "LIMIT 20 OFFSET 40" },
        " — breaks the moment a new post is inserted above the current page: the user sees a duplicate or skips an item. Cursor-based pagination solves this by encoding the last-seen position as an opaque token (typically a ",
        { code: "post_id" },
        " or a ",
        { code: "(score, post_id)" },
        " tuple). The next page query is ",
        { code: "WHERE score < cursor_score ORDER BY score DESC LIMIT 20" },
        " — stable regardless of concurrent inserts.",
      ],
    },
    {
      type: "p",
      parts: [
        "Return the next cursor in every API response. The client holds state; the server is stateless. This pattern also makes the API safe to retry — re-fetching with the same cursor always returns the same page.",
      ],
    },
    { type: "h2", text: "Putting it together: the write and read paths" },
    {
      type: "p",
      parts: [
        "Write path: user posts → API server writes post to DB and publishes a ",
        { code: "post_created" },
        " event to a message queue (Kafka). A fleet of fan-out workers consumes the event, looks up the poster's followers in the social graph store (the table or graph database holding who-follows-whom), and pushes the post ID + initial score into each follower's feed cache (Redis sorted set, scored by rank). Celebrity posters are skipped by the fan-out workers.",
      ],
    },
    {
      type: "p",
      parts: [
        "Read path: user opens feed → API server fetches the top 50 entries from the user's Redis sorted set, hydrates full post objects from a post cache (or DB), injects recent posts from any followed celebrities, applies final ranking, returns with a cursor. The happy path never touches the primary DB — it's all cache.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Fan-out on write gives fast reads but explodes write cost for celebrities — the hybrid approach (write fan-out for normal users, read fan-out for celebrities) is how real systems survive viral posts.",
        "Use cursor-based pagination instead of offsets so infinite scroll stays stable as new posts arrive.",
        "Ranking is a scoring function applied at write time and refreshed by background workers — not a full re-sort on every feed request.",
      ],
    },
    {
      type: "quiz",
      question:
        "A celebrity with 10 million followers posts a photo. Which strategy prevents catastrophically high write amplification?",
      options: [
        "Fan-out on write to all 10 million follower caches immediately",
        "Skip fan-out for the celebrity and inject their posts at read time instead",
        "Use cursor pagination to spread the writes across multiple pages",
        "Store the post only in the celebrity's own cache and nowhere else",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — skipping fan-out for celebrities and merging their posts at read time prevents a single post from triggering 10 million cache writes.",
      wrongMsg:
        "Not quite — think about which path gets triggered on every post by a high-follower-count account. Try again.",
    },
  ],
};
