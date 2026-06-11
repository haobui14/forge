import type { ReactNode } from "react";

export function AuthCard({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="max-w-[440px] mx-auto px-6 pt-16 pb-24">
      <div className="bg-card border border-line rounded-[20px] p-8 flex flex-col gap-5 shadow-[0_12px_30px_rgba(43,26,14,.08)]">
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[11px] tracking-[.14em] text-terracotta-deep">
            {kicker}
          </div>
          <h1 className="m-0 text-[32px] font-extrabold tracking-[-.02em]">{title}</h1>
        </div>
        {children}
      </div>
    </section>
  );
}

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] tracking-[.1em] text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="bg-paper border border-line rounded-[11px] px-4 py-3 text-[15px] text-ink outline-none focus:border-terracotta transition-colors placeholder:text-faint"
      />
    </label>
  );
}

export function FormNotice({ error, message }: { error?: string; message?: string }) {
  if (error) {
    return (
      <div className="text-sm font-semibold text-terracotta-border bg-quiz-wrong-bg border border-terracotta rounded-[11px] px-4 py-3">
        {error}
      </div>
    );
  }
  if (message) {
    return (
      <div className="text-sm font-semibold text-amber-text bg-amber-wash border border-amber-wash-border rounded-[11px] px-4 py-3">
        {message}
      </div>
    );
  }
  return null;
}
