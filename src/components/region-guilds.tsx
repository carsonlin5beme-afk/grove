import { Button } from "@/components/ui/button";
import { farmRegion } from "@/lib/regions";
import { LAYER_LABEL, type Layer } from "@/lib/types";
import { useFarmStore } from "@/lib/farm-store";
import { cn } from "@/lib/cn";

export function RegionGuilds() {
  const farm = useFarmStore((s) => s.farm);
  const applyGuild = useFarmStore((s) => s.applyGuild);
  const setSystem = useFarmStore((s) => s.setSystem);
  const region = farmRegion(farm);
  if (!region || region.guilds.length === 0) return null;

  return (
    <section className="rounded-[24px] bg-paper-soft p-3 shadow-border sm:p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Starter guilds · {region.short}</p>
      <p className="font-display text-xl leading-tight text-ink">Filtered for this water table</p>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {region.guilds.map((g) => {
          const locked = g.id === "mound-mango" && !farm.mounds;
          return (
            <article key={g.id} className={cn("flex flex-col rounded-2xl bg-paper p-3 shadow-border", locked && "opacity-70")}>
              <p className="text-[11px] uppercase tracking-[0.12em] text-ink-faint">{g.system.replace("-", " ")}</p>
              <h3 className="mt-0.5 font-display text-xl leading-none">{g.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{g.hook}</p>
              <ul className="mt-2 space-y-0.5 text-xs text-ink-faint">
                {Object.entries(g.layers).slice(0, 5).map(([layer, ids]) => (
                  <li key={layer}>
                    <span className="text-ink-soft">{LAYER_LABEL[layer as Layer]} · </span>
                    {ids?.join(", ")}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">{g.caution}</p>
              <Button
                size="sm"
                className="mt-3"
                disabled={locked}
                onClick={() => {
                  setSystem(g.system);
                  applyGuild(g.members);
                }}
              >
                {locked ? "Mark mounds first" : "Place this guild"}
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
