"use client";

import { useState } from "react";
import { recordQuizAttempt } from "@/lib/actions";

interface Props {
  lessonSlug: string;
  signedIn: boolean;
  question: string;
  options: string[];
  correctIndex: number;
  correctMsg: string;
  wrongMsg: string;
}

export function Quiz({
  lessonSlug,
  signedIn,
  question,
  options,
  correctIndex,
  correctMsg,
  wrongMsg,
}: Props) {
  const [choice, setChoice] = useState(-1);

  const pick = (i: number) => {
    setChoice(i);
    // Only the first pick per question-view counts toward Quiz Whiz.
    if (signedIn && choice < 0) {
      void recordQuizAttempt(lessonSlug, i === correctIndex).catch(() => {});
    }
  };

  return (
    <div className="bg-card border border-line rounded-2xl px-5 sm:px-[30px] py-[26px] flex flex-col gap-3.5 mt-[18px]">
      <div className="flex justify-between items-baseline">
        <div className="text-xl font-extrabold">Check your understanding</div>
        <div className="font-mono text-[11px] tracking-[.1em] text-muted">1 OF 1</div>
      </div>
      <div className="text-base leading-[1.55] text-ink">{question}</div>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const selected = choice === i;
          const stateCls = selected
            ? i === correctIndex
              ? "bg-quiz-correct-bg border-quiz-correct-border"
              : "bg-quiz-wrong-bg border-terracotta"
            : "bg-card border-line hover:border-terracotta";
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`flex gap-3 items-baseline px-[18px] py-[13px] rounded-[11px] border-[1.5px] cursor-pointer text-[15px] text-left transition-colors ${stateCls}`}
            >
              <span className="font-mono text-[13px] text-muted">
                {String.fromCharCode(97 + i)})
              </span>
              <span className="font-semibold">{opt}</span>
            </button>
          );
        })}
      </div>
      {choice >= 0 && (
        <div
          className={`text-sm font-semibold ${
            choice === correctIndex ? "text-quiz-correct-text" : "text-terracotta-border"
          }`}
        >
          {choice === correctIndex ? `✓ ${correctMsg}` : `✗ ${wrongMsg}`}
        </div>
      )}
    </div>
  );
}
