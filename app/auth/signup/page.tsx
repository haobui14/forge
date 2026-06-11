import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, Field, FormNotice } from "@/components/auth/AuthCard";
import { AccountsDisabledNotice } from "@/components/auth/AccountsDisabledNotice";
import { signup } from "@/lib/actions";
import { supabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  if (!supabaseConfigured()) {
    return <AccountsDisabledNotice kicker="$ forge init --new-builder" />;
  }

  return (
    <AuthCard kicker="$ forge init --new-builder" title="Start your quest line.">
      <FormNotice error={error} />
      <form action={signup} className="flex flex-col gap-4">
        <input type="hidden" name="next" value={next ?? "/dashboard"} />
        <Field label="HANDLE" name="handle" placeholder="your_handle" autoComplete="username" />
        <Field label="EMAIL" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <Field label="PASSWORD" name="password" type="password" placeholder="8+ characters" autoComplete="new-password" />
        <button
          type="submit"
          className="font-mono font-bold text-sm px-[26px] py-4 rounded-xl bg-terracotta text-cream cursor-pointer shadow-[0_4px_0_#7e3014] transition-transform hover:-translate-y-0.5 mt-1"
        >
          Create account →
        </button>
      </form>
      <div className="text-sm text-muted text-center">
        Already forging?{" "}
        <Link
          href={`/auth/login${next ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-bold text-terracotta-deep hover:underline"
        >
          Sign in
        </Link>
      </div>
    </AuthCard>
  );
}
