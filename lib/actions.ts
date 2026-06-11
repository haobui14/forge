"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";

const HANDLE_RE = /^[a-z0-9_.]{3,24}$/;
const ACCOUNTS_DISABLED = "Accounts aren't enabled on this deployment yet.";

function safeNext(next: unknown): string {
  const n = String(next ?? "");
  return n.startsWith("/") && !n.startsWith("//") ? n : "/dashboard";
}

export async function login(formData: FormData) {
  const next = safeNext(formData.get("next"));
  if (!supabaseConfigured()) {
    redirect(`/auth/login?error=${encodeURIComponent(ACCOUNTS_DISABLED)}`);
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  });
  if (error) {
    redirect(
      `/auth/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`,
    );
  }
  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const next = safeNext(formData.get("next"));
  const handle = String(formData.get("handle") ?? "")
    .trim()
    .toLowerCase();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!supabaseConfigured()) {
    redirect(`/auth/signup?error=${encodeURIComponent(ACCOUNTS_DISABLED)}`);
  }
  if (!HANDLE_RE.test(handle)) {
    redirect(
      `/auth/signup?error=${encodeURIComponent(
        "Handle must be 3-24 chars: lowercase letters, numbers, _ or .",
      )}&next=${encodeURIComponent(next)}`,
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { handle } },
  });
  if (error) {
    redirect(
      `/auth/signup?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`,
    );
  }
  if (!data.session) {
    redirect(
      `/auth/login?message=${encodeURIComponent(
        "Check your email to confirm your account, then sign in.",
      )}`,
    );
  }
  revalidatePath("/", "layout");
  redirect(next);
}

export async function signOut() {
  if (!supabaseConfigured()) redirect("/");
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export interface CompleteLessonResult {
  already_completed: boolean;
  xp_awarded: number;
  new_xp: number;
  new_streak: number;
}

export async function completeLesson(
  slug: string,
): Promise<CompleteLessonResult | { error: string }> {
  if (!supabaseConfigured()) return { error: ACCOUNTS_DISABLED };
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("complete_lesson", { p_slug: slug });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return data as CompleteLessonResult;
}

export async function recordQuizAttempt(slug: string, isCorrect: boolean) {
  if (!supabaseConfigured()) return;
  const supabase = await createClient();
  // Best-effort: signed-out users simply don't get Quiz Whiz credit.
  await supabase.rpc("record_quiz_attempt", { p_slug: slug, p_is_correct: isCorrect });
}
