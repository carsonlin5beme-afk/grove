import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { GuildDeck } from "@/components/guild-deck";

export const Route = createFileRoute("/guilds")({ component: GuildsPage });

function GuildsPage() {
  return (
    <div className="min-h-dvh bg-paper">
      <AppNav current="/guilds" />
      <main className="mx-auto max-w-6xl overflow-x-hidden px-4 py-8 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">Mini presentations</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight">Guilds</h1>
        <p className="mt-3 max-w-xl text-sm text-ink-soft">
          Each stack is a short talk. Swipe, drag, or use the arrows (or A/D). Scroll down for the next guild.
        </p>
        <div className="mt-8">
          <GuildDeck />
        </div>
      </main>
    </div>
  );
}
