import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { AdvisorPanel } from "@/components/advisor-panel";
import { FarmStage } from "@/components/farm-stage";
import { ChemistryPanel } from "@/components/chemistry-panel";
import { NutrientPanel } from "@/components/nutrient-panel";
import { Onboarding } from "@/components/onboarding";
import { SpeciesBrowser } from "@/components/species-browser";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFarmStore } from "@/lib/farm-store";
import { scoreFarm } from "@/lib/engine";
import { SYSTEM_LABEL } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GuildPlanner } from "@/components/guild-planner";
import { LandPrep } from "@/components/land-prep";
import { RegionGuilds } from "@/components/region-guilds";
import { SuccessionRail } from "@/components/succession-rail";
import { comboRating, farmAreaSqft, formatArea } from "@/lib/planner";
import { farmRegion } from "@/lib/regions";
import { ChevronDown, Sprout } from "lucide-react";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/studio")({ component: Studio });

function Studio() {
  const farm = useFarmStore((s) => s.farm);
  const hasHydrated = useFarmStore((s) => s.hasHydrated);
  const optimize = useFarmStore((s) => s.optimize);
  const reset = useFarmStore((s) => s.reset);
  const rename = useFarmStore((s) => s.rename);
  const setRegion = useFarmStore((s) => s.setRegion);
  const setMounds = useFarmStore((s) => s.setMounds);
  const score = scoreFarm(farm);
  const combo = comboRating(farm);
  const [tab, setTab] = useState("nursery");
  const [desk, setDesk] = useState(false);
  const [nursery, setNursery] = useState(true);
  const region = farmRegion(farm);

  if (!hasHydrated) {
    return (
      <div className="min-h-dvh bg-paper">
        <AppNav current="/studio" />
        <div className="mx-auto max-w-lg px-6 py-20">
          <div className="h-8 w-48 animate-pulse rounded-full bg-ink/8" />
          <div className="mt-4 h-24 animate-pulse rounded-3xl bg-ink/5" />
        </div>
      </div>
    );
  }

  if (!farm.onboarded) {
    return (
      <div className="min-h-dvh bg-paper">
        <AppNav current="/studio" />
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <AppNav current="/studio" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-2 pb-6 pt-2 sm:px-4">
        <div className="flex flex-wrap items-end justify-between gap-2 px-1">
          <div>
            <input
              value={farm.name}
              onChange={(e) => rename(e.target.value)}
              className="bg-transparent font-display text-2xl tracking-tight text-ink outline-none sm:text-3xl"
            />
            <p className="text-xs text-ink-faint">
              {region ? (
                <>
                  {region.short} · {region.county} · Zone {region.zoneLabel} · {farm.zoning ?? "—"} ·{" "}
                  {farm.mounds ? "mounds" : "flat"} · {SYSTEM_LABEL[farm.system]} · {formatArea(farmAreaSqft(farm))}
                </>
              ) : (
                <>
                  Zone {farm.zone} · {farm.soil} · {SYSTEM_LABEL[farm.system]} · {formatArea(farmAreaSqft(farm))}
                </>
              )}
              {" · combo "}
              <span className="tabular-nums text-ink">{combo.score}</span>
              <span className="text-ink-faint"> · harvest {score.overall}</span>
            </p>
          </div>
          <div className="flex gap-2">
            {region ? (
              <Button variant="outline" size="sm" onClick={() => setMounds(!farm.mounds)}>
                {farm.mounds ? "Mounds on" : "Mark mounds"}
              </Button>
            ) : null}
            <Button variant="outline" size="sm" onClick={() => optimize()}>
              Compose optimal mix
            </Button>
            <Button variant="ghost" size="sm" onClick={() => reset()}>
              Clear acre
            </Button>
          </div>
        </div>

        {!region ? (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-paper-soft px-4 py-3 text-sm shadow-border">
            <p className="text-ink-soft">
              This acre has no county yet. Confirm Zephyrhills to load Zone 9b, drainage rules, and Pasco zoning.
            </p>
            <Button size="sm" onClick={() => setRegion("zephyrhills")}>
              This is Zephyrhills
            </Button>
          </div>
        ) : (
          <p className="mt-2 px-1 text-xs leading-relaxed text-ink-faint">
            {region.ecoregion}. {region.drainage} {farm.mounds ? "Mounds are marked — citrus and avocado may be placed." : "Mounds are not marked — wet-foot crops stay locked."}
          </p>
        )}

        <div className="relative mt-2 overflow-hidden rounded-[28px] bg-paper-soft shadow-border">
          <FarmStage />
          <div className="pointer-events-none absolute bottom-3 right-3 z-10 hidden sm:block">
            <button
              type="button"
              onClick={() => setNursery((v) => !v)}
              className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[11px] text-ink shadow-border"
            >
              <Sprout className="size-3.5" />
              {nursery ? "Hide nursery" : "Nursery"}
            </button>
          </div>
          {nursery ? (
            <aside className="absolute bottom-12 right-3 top-14 z-10 hidden w-[260px] overflow-hidden rounded-2xl bg-paper/92 shadow-border backdrop-blur-md lg:flex lg:flex-col">
              <p className="px-3 pt-2 text-[11px] uppercase tracking-[0.16em] text-ink-faint">Nursery</p>
              <div className="min-h-0 flex-1 p-2">
                <SpeciesBrowser compact />
              </div>
            </aside>
          ) : null}
        </div>

        <section className="mt-3">
          <LandPrep />
        </section>

        <section className="mt-3">
          <RegionGuilds />
        </section>

        <section className="mt-3">
          <SuccessionRail />
        </section>

        <button
          type="button"
          onClick={() => setDesk((v) => !v)}
          className="mt-3 flex w-full items-center justify-between rounded-2xl bg-paper-soft px-4 py-2.5 text-left text-sm text-ink-soft shadow-border"
        >
          <span>Desk — planner, advisor, harvest</span>
          <ChevronDown className={cn("size-4 transition-transform", desk && "rotate-180")} />
        </button>

        {desk ? (
          <>
            <section className="mt-3 hidden rounded-[24px] bg-paper-soft p-4 shadow-border sm:p-5 lg:block">
              <GuildPlanner />
            </section>
            <div className="mt-3 hidden min-h-0 flex-1 gap-4 lg:grid lg:grid-cols-2">
              <section className="flex h-[420px] min-h-0 flex-col rounded-[24px] bg-paper-soft p-4 shadow-border">
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-ink-faint">Advisor</p>
                <div className="min-h-0 flex-1">
                  <AdvisorPanel />
                </div>
              </section>
              <section className="rounded-[24px] bg-paper-soft p-4 shadow-border">
                <Tabs defaultValue="harvest">
                  <TabsList className="w-full">
                    <TabsTrigger value="harvest" className="flex-1">
                      Harvest
                    </TabsTrigger>
                    <TabsTrigger value="rhizosphere" className="flex-1">
                      Rhizosphere
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="harvest">
                    <ScrollArea className="h-[340px]">
                      <NutrientPanel />
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="rhizosphere">
                    <ScrollArea className="h-[340px]">
                      <ChemistryPanel />
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </section>
            </div>
          </>
        ) : null}

        <div className="mt-3 lg:hidden">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full">
              <TabsTrigger value="nursery" className="flex-1">
                Nursery
              </TabsTrigger>
              <TabsTrigger value="planner" className="flex-1">
                Planner
              </TabsTrigger>
              <TabsTrigger value="advisor" className="flex-1">
                Advisor
              </TabsTrigger>
              <TabsTrigger value="nutrients" className="flex-1">
                Harvest
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nursery" className="h-[380px] rounded-[24px] bg-paper-soft p-3 shadow-border">
              <SpeciesBrowser compact />
            </TabsContent>
            <TabsContent value="planner" className="rounded-[24px] bg-paper-soft p-4 shadow-border">
              <GuildPlanner />
            </TabsContent>
            <TabsContent value="advisor" className="h-[480px] rounded-[24px] bg-paper-soft p-4 shadow-border">
              <AdvisorPanel />
            </TabsContent>
            <TabsContent value="nutrients" className="rounded-[24px] bg-paper-soft p-4 shadow-border">
              <NutrientPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
