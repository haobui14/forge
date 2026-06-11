import { AuthCard } from "./AuthCard";
import { Button } from "@/components/ui/Button";

// Shown in place of the auth forms on content-only deployments
// (no Supabase configured).
export function AccountsDisabledNotice({ kicker }: { kicker: string }) {
  return (
    <AuthCard kicker={kicker} title="Accounts are still in the forge.">
      <p className="m-0 text-[15px] text-muted leading-[1.6]">
        Sign-ups aren&apos;t enabled on this deployment yet — but every lesson is open. Read the
        full System Design track, take the quizzes, and check back soon for XP, streaks and
        badges.
      </p>
      <Button variant="terracotta" href="/roadmap" className="text-center">
        Browse the roadmap →
      </Button>
    </AuthCard>
  );
}
