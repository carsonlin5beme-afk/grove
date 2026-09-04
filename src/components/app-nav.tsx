import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/studio", label: "Studio" },
  { to: "/library", label: "Library" },
  { to: "/guilds", label: "Guilds" },
  { to: "/nutrients", label: "Nutrients" },
] as const;

export function AppNav({ current }: { current?: string }) {
  const { isPending } = useCurrentUserState();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-ink">Grove</span>
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-ink-faint sm:inline">
            living farm
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 overflow-x-auto sm:gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1.5 text-sm text-ink-soft transition-colors duration-150 hover:text-ink sm:px-3",
                current === l.to && "bg-ink/6 text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="min-w-16">
          {isPending ? (
            <div className="h-8 w-24 animate-pulse rounded-full bg-ink/8" />
          ) : (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link
                  to="/login"
                  className="rounded-full px-3 py-1.5 text-sm text-ink-soft hover:text-ink"
                >
                  Sign in
                </Link>
              </SignedOut>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
