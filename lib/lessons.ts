// Content model for Forge lessons.
// Lessons are authored as typed TS objects (content/system-design/*) and rendered
// by components/lesson/LessonBody. Quiz answers stay server-friendly typed data.

export type InlinePart =
  | string
  | { hl: string } // amber highlighter phrase
  | { code: string } // inline mono code chip
  | { em: string }
  | { strong: string };

export type Block =
  | { type: "lede"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; parts: InlinePart[] }
  | { type: "callout"; label: string; body: string }
  | { type: "diagram"; id: string; height: number; alt: string }
  | { type: "rows"; items: { name: string; description: string }[] }
  | {
      type: "table";
      cols: [string, string];
      rows: { label: string; a: string; b: string }[];
    }
  | { type: "takeaways"; items: string[] }
  | {
      type: "quiz";
      question: string;
      options: string[];
      correctIndex: number;
      correctMsg: string;
      wrongMsg: string;
    };

export interface LessonMeta {
  slug: string;
  title: string;
  blurb: string;
  xp: number;
  minutes: number;
  stage: 0 | 1 | 2 | 3 | 4;
  position: number; // 1-based position in the track
}

export interface LessonContent {
  blocks: Block[];
}
