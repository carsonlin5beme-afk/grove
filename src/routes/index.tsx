import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CoverHero } from "@/components/cover-hero";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/")({ component: Cover });

function Cover() {
  const { isPending } = useCurrentUserState();
  const [bloom, setBloom] = useState<"enter" | "guilds" | null>(null);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <div className="cover-rays pointer-events-none absolute inset-0" aria-hidden />

      <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-10">
        <span className="text-xs uppercase tracking-[0.22em] text-ink-faint">Grove</span>
        {isPending ? (
          <span className="h-8 w-16 rounded-full bg-ink/8" />
        ) : (
          <>
            <SignedIn>
              <Link to="/studio" className="text-sm text-ink-soft hover:text-ink">
                Open studio
              </Link>
            </SignedIn>
            <SignedOut>
              <Link to="/login" className="text-sm text-ink-soft hover:text-ink">
                Sign in
              </Link>
            </SignedOut>
          </>
        )}
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col lg:flex-row lg:items-center">
        <section className="animate-[fade-up_0.7s_var(--ease-out-soft)_both] px-6 pb-4 pt-4 text-center sm:px-10 lg:w-[38%] lg:pb-16 lg:pt-0 lg:text-left">
          <h1 className="font-display text-7xl leading-none tracking-tight text-ink sm:text-8xl">Grove</h1>
          <p className="mt-1 font-display text-2xl italic text-ink sm:text-3xl">a living farm</p>
          <p className="mx-auto mt-5 max-w-sm text-pretty text-base text-ink-soft lg:mx-0">
            Compose plant and animal guilds the way a forest would.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link
                to="/studio"
                onMouseEnter={() => setBloom("enter")}
                onMouseLeave={() => setBloom(null)}
                onFocus={() => setBloom("enter")}
                onBlur={() => setBloom(null)}
              >
                Enter the grove
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                to="/guilds"
                onMouseEnter={() => setBloom("guilds")}
                onMouseLeave={() => setBloom(null)}
                onFocus={() => setBloom("guilds")}
                onBlur={() => setBloom(null)}
              >
                Browse guilds
              </Link>
            </Button>
          </div>
        </section>

        <div className="relative flex-1 px-2 pb-6 sm:px-6 lg:px-0 lg:pb-8">
          <CoverHero bloom={bloom} className="mx-auto w-full max-w-3xl lg:max-w-none lg:translate-x-4" />
        </div>
      </div>
    </main>
  );
}
