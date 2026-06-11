import { signOut } from "@/lib/actions";

export function Footer({ signedIn }: { signedIn: boolean }) {
  return (
    <footer className="bg-dark text-muted px-14 py-7 flex justify-between items-center font-mono text-xs">
      <div>
        <span className="text-amber font-bold">forge://</span> learn the craft · © 2026
      </div>
      {signedIn ? (
        <form action={signOut}>
          <button
            type="submit"
            className="cursor-pointer underline underline-offset-[3px] hover:text-amber"
          >
            sign out
          </button>
        </form>
      ) : (
        <div>built for builders</div>
      )}
    </footer>
  );
}
