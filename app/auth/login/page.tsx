import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, Field, FormNotice } from "@/components/auth/AuthCard";
import { AccountsDisabledNotice } from "@/components/auth/AccountsDisabledNotice";
import { login } from "@/lib/actions";
import { supabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>;
}) {
  const { error, message, next } = await searchParams;

  if (!supabaseConfigured()) {
    return <AccountsDisabledNotice kicker="$ forge login" />;
  }

  return (
    <AuthCard kicker="$ forge login" title="Welcome back, builder.">
      <FormNotice error={error} message={message} />
      <form action={login} className="flex flex-col gap-4">
        <input type="hidden" name="next" value={next ?? "/dashboard"} />
        <Field label="EMAIL" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <Field label="PASSWORD" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
        <button
          type="submit"
          className="font-mono font-bold text-sm px-[26px] py-4 rounded-xl bg-terracotta text-cream cursor-pointer shadow-[0_4px_0_#7e3014] transition-transform hover:-translate-y-0.5 mt-1"
        >
          Sign in →
        </button>
      </form>
      <div className="text-sm text-muted text-center">
        New here?{" "}
        <Link
          href={`/auth/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-bold text-terracotta-deep hover:underline"
        >
          Create an account
        </Link>
      </div>
    </AuthCard>
  );
}
