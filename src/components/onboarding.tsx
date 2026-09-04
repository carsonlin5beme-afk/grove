import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SYSTEM_HINT, SYSTEM_LABEL, type FarmSystem } from "@/lib/types";
import { useFarmStore } from "@/lib/farm-store";
import { REGIONS, applyRegion, getRegion } from "@/lib/regions";
import { cn } from "@/lib/cn";

const SYSTEMS: FarmSystem[] = ["food-forest", "alley", "silvopasture", "polycrop"];

export function Onboarding() {
  const farm = useFarmStore((s) => s.farm);
  const setFarm = useFarmStore((s) => s.setFarm);
  const setSystem = useFarmStore((s) => s.setSystem);
  const setZoning = useFarmStore((s) => s.setZoning);
  const setMounds = useFarmStore((s) => s.setMounds);
  const finish = useFarmStore((s) => s.finishOnboarding);
  const plantOptimal = useFarmStore((s) => s.plantOptimal);
  const rename = useFarmStore((s) => s.rename);
  const region = getRegion(farm.regionId);
  const [systemHover, setSystemHover] = useState<FarmSystem | null>(null);

  function choose(id: string) {
    const r = getRegion(id);
    if (!r || !r.ready) return;
    setFarm(applyRegion(farm, r, { name: farm.name === "New grove" ? `${r.short} grove` : farm.name }));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">First acre</p>
      <h1 className="mt-2 font-display text-3xl leading-none text-ink sm:text-4xl">Where is the land?</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Grove starts from a real county, not a blank zone slider. Climate, drainage, and zoning
        decide what may be planted. Zephyrhills / Pasco is the first fully mapped region.
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            disabled={!r.ready}
            onClick={() => choose(r.id)}
            className={cn(
              "rounded-2xl px-3 py-3 text-left shadow-border transition-colors",
              farm.regionId === r.id ? "bg-ink text-paper" : "bg-paper-soft text-ink",
              !r.ready && "opacity-50",
            )}
          >
            <p className="text-[11px] uppercase tracking-[0.14em] opacity-70">
              {r.ready ? `Zone ${r.zoneLabel}` : "Soon"}
            </p>
            <p className="mt-1 font-display text-xl leading-none">{r.short}</p>
            <p className="mt-1 text-xs opacity-80">{r.county === "—" ? r.state : `${r.county} County`}</p>
          </button>
        ))}
      </div>

      {region ? (
        <>
          <div className="mt-6 rounded-2xl bg-paper-soft p-4 shadow-border">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">This station</p>
            <p className="mt-1 font-display text-2xl leading-none">{region.name}</p>
            <ul className="mt-3 grid gap-1.5 text-sm text-ink-soft sm:grid-cols-2">
              <li>USDA {region.zoneLabel} · {region.koppen}</li>
              <li>{region.rainfallIn[0]}–{region.rainfallIn[1]} in rain</li>
              <li>{region.heatDays}</li>
              <li>{region.frost}</li>
              <li className="sm:col-span-2">{region.ecoregion}</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{region.soilNote}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-faint">{region.agClass}</p>
          </div>

          <label className="mt-5 block text-xs font-medium text-ink-soft">Grove name</label>
          <input
            value={farm.name}
            onChange={(e) => rename(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl bg-paper-soft px-3.5 text-sm shadow-border outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />

          <p className="mt-4 text-xs font-medium text-ink-soft">Zoning district</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {region.zoning.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZoning(z.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm shadow-border",
                  farm.zoning === z.id ? "bg-ink text-paper" : "bg-paper-soft text-ink-soft",
                )}
                title={z.note}
              >
                {z.id}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            {region.zoning.find((z) => z.id === farm.zoning)?.note ?? "Pick the district on the parcel."}
          </p>

          <button
            type="button"
            onClick={() => setMounds(!farm.mounds)}
            className={cn(
              "mt-4 w-full rounded-2xl px-4 py-3 text-left text-sm shadow-border",
              farm.mounds ? "bg-sage/20 text-ink" : "bg-paper-soft text-ink-soft",
            )}
          >
            <span className="font-medium text-ink">{farm.mounds ? "Mounds / raised beds — yes" : "Mounds / raised beds — not yet"}</span>
            <span className="mt-0.5 block text-xs">
              Avocado, mango, citrus, and pineapple stay locked until you mark this. Drainage is the first crop.
            </span>
          </button>

          <p className="mt-4 text-xs font-medium text-ink-soft">System</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SYSTEMS.map((id, i) => (
              <span key={id} className="relative">
                <button
                  type="button"
                  onClick={() => setSystem(id)}
                  onMouseEnter={() => setSystemHover(id)}
                  onMouseLeave={() => setSystemHover(null)}
                  onFocus={() => setSystemHover(id)}
                  onBlur={() => setSystemHover((h) => (h === id ? null : h))}
                  aria-describedby="system-hint"
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm shadow-border",
                    farm.system === id ? "bg-ink text-paper" : "bg-paper-soft text-ink-soft",
                  )}
                >
                  {SYSTEM_LABEL[id]}
                </button>
                {systemHover === id ? (
                  <span
                    role="tooltip"
                    className={cn(
                      "pointer-events-none absolute bottom-[calc(100%+8px)] z-20 w-56 rounded-xl bg-ink px-3 py-2 text-xs leading-relaxed text-paper shadow-border",
                      i >= 2 ? "right-0" : "left-0 sm:left-1/2 sm:-translate-x-1/2",
                    )}
                  >
                    {SYSTEM_HINT[id]}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
          <p id="system-hint" className="mt-2 text-xs leading-relaxed text-ink-faint">
            {SYSTEM_HINT[systemHover ?? farm.system]}
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={() => plantOptimal()}>
              Plant the regional mix
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => finish()}>
              Empty acre — I’ll place
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-8 text-sm text-ink-faint">Choose Zephyrhills to load Zone 9b, the flatwoods soils, and Pasco zoning.</p>
      )}
    </div>
  );
}
