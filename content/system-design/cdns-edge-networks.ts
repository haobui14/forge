import type { LessonContent } from "@/lib/lessons";

export const cdnsEdgeNetworks: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Light travels 200 km per millisecond in fiber — that sounds fast until your origin server is in Virginia and your user is in Singapore. The speed of light isn't a setting you can tune. Distance is.",
    },
    { type: "h2", text: "Distance is latency" },
    {
      type: "p",
      parts: [
        "A cross-Atlantic round trip is about ",
        { hl: "70–80 ms" },
        " just from physics — electrons in glass. Add TCP handshakes, TLS negotiation, and server processing and you're looking at 200–400 ms before a single byte of content arrives. For a user in Jakarta hitting a London origin, a page load can feel like a different internet entirely.",
      ],
    },
    {
      type: "p",
      parts: [
        "The fix is to move content closer. A ",
        { hl: "Content Delivery Network" },
        " is a globally distributed network of servers — called ",
        { em: "Points of Presence" },
        " (POPs) — sitting at internet exchange points (the physical hubs where ISPs interconnect) around the world. A user in Singapore hits a POP 5 ms away instead of London 180 ms away. The CDN gets the data from your origin once; every subsequent user pays the cheap local price.",
      ],
    },
    { type: "h2", text: "How CDNs actually work" },
    {
      type: "p",
      parts: [
        "Traffic reaches the nearest POP via ",
        { hl: "anycast routing" },
        " — the same IP address is announced from hundreds of locations, and BGP (the routing protocol that stitches the internet's networks together) steers each user to the topologically closest one automatically. Once there, the POP checks its cache. A ",
        { em: "cache hit" },
        " returns the asset in milliseconds. A ",
        { em: "cache miss" },
        " triggers a fetch from origin, stores the response, and serves it — that first user pays the full round trip, every subsequent user does not.",
      ],
    },
    {
      type: "p",
      parts: [
        "Cache behavior is controlled by TTLs in the ",
        { code: "Cache-Control" },
        " header and by the ",
        { hl: "cache key" },
        " — usually the URL, optionally plus headers like ",
        { code: "Accept-Language" },
        " or ",
        { code: "Accept-Encoding" },
        ". Keep cache keys narrow: every distinct key variant is stored separately, fragmenting your cache and reducing hit rates.",
      ],
    },
    { type: "h2", text: "Pull vs push CDNs" },
    {
      type: "p",
      parts: [
        "CDNs fill their edge caches in one of two ways. ",
        { hl: "Pull CDNs" },
        " are lazy — the POP fetches from origin only when a user requests something not already cached. ",
        { hl: "Push CDNs" },
        " are eager — you upload assets to the CDN up front, before any user asks. Each approach suits different traffic shapes:",
      ],
    },
    {
      type: "table",
      cols: ["PULL", "PUSH"],
      rows: [
        {
          label: "HOW IT FILLS",
          a: "On first cache miss — origin fetched on demand",
          b: "You upload assets explicitly before any request",
        },
        {
          label: "FIRST REQUEST",
          a: "Slow — pays full origin round-trip once per POP",
          b: "Fast — content already at the edge",
        },
        {
          label: "BEST FOR",
          a: "Unpredictable traffic, large catalogues, blogs",
          b: "Large files (video, software), known release dates",
        },
        {
          label: "OPS BURDEN",
          a: "Low — just set Cache-Control headers",
          b: "Higher — must manage uploads and purges manually",
        },
      ],
    },
    { type: "h2", text: "What to put on a CDN" },
    {
      type: "p",
      parts: [
        "The obvious candidates are ",
        { hl: "static assets" },
        " — images, CSS, JS bundles, fonts, video — anything that doesn't change per-user. But modern CDNs cache far more: entire HTML pages for logged-out users, API responses with short TTLs, and even ",
        { hl: "edge compute" },
        " functions that run your code at the POP. Edge functions can personalize responses, run A/B tests, or rewrite headers — all without a round trip to your origin. Cloudflare Workers and Vercel Edge Functions are the most common examples.",
      ],
    },
    {
      type: "diagram",
      id: "cdn-edge",
      height: 330,
      alt: "Origin server, three edge POPs, users hitting nearest POP with cache-miss path",
    },
    { type: "h2", text: "Invalidation: the hard part" },
    {
      type: "p",
      parts: [
        "Long TTLs mean fast sites; short TTLs mean fresh content. The escape hatch is ",
        { hl: "cache-busting via fingerprinted filenames" },
        " — embed a content hash in the filename (",
        { code: "app.3f9a2c.js" },
        ") so you can set ",
        { code: "Cache-Control: max-age=31536000, immutable" },
        " (one year) with zero risk. When the file changes, the hash changes, the URL changes, and the CDN treats it as a brand-new asset. For mutable URLs you'll need explicit purge API calls — CDNs propagate purges to all POPs in seconds.",
      ],
    },
    {
      type: "callout",
      label: "PRO TIP",
      body: "Never cache URLs that include user-specific data in the response unless you vary the cache key on a session cookie — otherwise one user's private data leaks to the next. When in doubt, set Cache-Control: private on authenticated responses.",
    },
    {
      type: "takeaways",
      items: [
        "Physics caps your speed — a CDN wins by serving from a nearby POP rather than racing across the globe to your origin; it shortens the path, it doesn't break the laws of physics.",
        "Pull CDNs need minimal ops; push CDNs suit large, pre-known assets like video releases.",
        "Fingerprint static filenames so you can cache them forever and invalidate instantly by changing the URL.",
      ],
    },
    {
      type: "quiz",
      question:
        "A user in Tokyo requests an image that has never been fetched by that edge POP. What happens?",
      options: [
        "The CDN returns a 404 — it only serves pre-uploaded assets",
        "The POP fetches from origin, caches the response, and serves it — all in the same request",
        "The CDN redirects the user's browser directly to the origin server",
        "The request is queued until another Tokyo user triggers a cache warm",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — on a cache miss the POP fetches from origin, stores the result, and serves it to the requesting user in one round trip.",
      wrongMsg: "Not quite — think about what a pull CDN does on a cache miss. Try again.",
    },
  ],
};
