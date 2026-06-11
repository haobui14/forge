import type { LessonContent } from "@/lib/lessons";

export const sqlVsNosql: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Every system design interview eventually asks the same question: relational or not? The answer is rarely philosophical — it comes down to what shape your data has, how it grows, and what queries keep you up at night.",
    },
    { type: "h2", text: "The relational model and ACID" },
    {
      type: "p",
      parts: [
        "A relational database organizes everything into tables — rows and columns with a strict schema declared up front. That rigidity buys you something valuable: ",
        { hl: "ACID guarantees" },
        ". Atomicity means a multi-step transaction either fully commits or fully rolls back. Consistency means no write can leave the database in a state that violates your constraints (this is constraint-validity within one database — not the same \"consistency\" as in distributed systems, where it means all replicas agreeing; that distinction is covered in the CAP Theorem lesson). Isolation means concurrent transactions don't see each other's half-finished work. Durability means once the database says ",
        { code: "COMMIT" },
        ", the data survives a crash.",
      ],
    },
    {
      type: "p",
      parts: [
        "Those guarantees matter enormously for anything involving money, inventory, or user accounts — anywhere a partial write is worse than a failed write. Postgres and MySQL have spent decades hardening them. A normalized schema also makes ad-hoc queries trivially composable with ",
        { code: "JOIN" },
        ", which is why SQL still dominates analytic workloads decades after NoSQL was supposed to kill it.",
      ],
    },
    { type: "h2", text: "Why NoSQL exists" },
    {
      type: "p",
      parts: [
        "The web-scale era exposed three pressure points where relational databases bend. First, ",
        { hl: "schema rigidity" },
        " — if your data is a bag of optional fields that vary per record (think product catalogs or user profiles), changing the schema (an ALTER TABLE migration) becomes a liability on large tables. Second, ",
        { hl: "horizontal scale-out" },
        " — sharding a traditional relational database is painful enough that most teams avoid it until forced (modern distributed SQL engines like CockroachDB, Spanner, and Vitess close this gap, though at operational cost). Third, ",
        { hl: "specialized access patterns" },
        " — a graph traversal, a time-series rollup, or a sub-millisecond cache hit are each solved better by a purpose-built engine than a general-purpose SQL planner.",
      ],
    },
    {
      type: "p",
      parts: [
        "NoSQL doesn't mean \"no schema\" — it means the schema lives in your application code instead of the database. That flexibility has a cost: you lose the database's ability to enforce invariants, and cross-document transactions are either missing or expensive. Pick NoSQL because the access pattern demands it, not to avoid writing migrations.",
      ],
    },
    { type: "h2", text: "The four NoSQL families" },
    {
      type: "p",
      parts: [
        "Every NoSQL system belongs to one of four families, each optimized for a different shape of problem:",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "document_store",
          description:
            "Stores self-contained JSON/BSON documents. Great for content, catalogs, or user profiles where the whole object is fetched together. MongoDB is the canonical example; DynamoDB can behave this way too.",
        },
        {
          name: "key_value",
          description:
            "Pure lookup: hash a key, get a value. Microsecond latency at any scale. Redis dominates for caches and sessions; DynamoDB doubles as a durable key-value store at AWS scale.",
        },
        {
          name: "wide_column",
          description:
            "Data is grouped by partition key so rows that belong together are stored together — sequential scans over time-series ranges are extremely fast. Columns are organized into families and the model excels at append-heavy workloads at petabyte scale. Cassandra powers time-series, IoT, and messaging at companies like Netflix.",
        },
        {
          name: "graph",
          description:
            "First-class nodes and edges with properties. Traversal queries that would be dozens of self-JOINs in SQL run in constant time. Neo4j is the standard — used for fraud detection, recommendation engines, and social graphs.",
        },
      ],
    },
    {
      type: "diagram",
      id: "db-families",
      height: 300,
      alt: "Relational on the left, four NoSQL families branching on the right",
    },
    { type: "h2", text: "SQL vs NoSQL at a glance" },
    {
      type: "table",
      cols: ["SQL", "NOSQL"],
      rows: [
        {
          label: "SCHEMA",
          a: "Strict, declared upfront",
          b: "Flexible, enforced in app code",
        },
        {
          label: "SCALING",
          a: "Scale up; sharding is hard",
          b: "Built for horizontal scale-out",
        },
        {
          label: "QUERIES",
          a: "Arbitrary JOINs, ad-hoc SQL",
          b: "Access patterns baked in at design time",
        },
        {
          label: "REACH FOR IT",
          a: "Transactions, reporting, relational data",
          b: "Scale, flexible schemas, specialized access",
        },
      ],
    },
    {
      type: "callout",
      label: "RULE OF THUMB",
      body: "Start with Postgres. It handles more scale than most apps ever need, and you can always migrate data to a specialized store once your access patterns are proven. Premature NoSQL is a schema you can't enforce.",
    },
    {
      type: "takeaways",
      items: [
        "SQL gives you ACID transactions and flexible queries — the right default until data shape or scale forces otherwise.",
        "The four NoSQL families each solve a specific shape: document for bags-of-fields, key-value for lookups, wide-column for append-heavy workloads (time-series, IoT, messaging), graph for traversals.",
        "Choose by access pattern: know the queries you must run before you pick the database that runs them best.",
      ],
    },
    {
      type: "quiz",
      question:
        "A fraud-detection system needs to find all accounts connected through shared devices within two hops. Which database family handles this most naturally?",
      options: ["Document store", "Wide-column store", "Key-value store", "Graph database"],
      correctIndex: 3,
      correctMsg:
        "Graph databases store relationships as first-class edges, so multi-hop traversals run in constant time instead of compounding JOINs.",
      wrongMsg:
        "That family optimizes for a different access pattern — relationship traversals are where graph databases shine. Try again.",
    },
  ],
};
