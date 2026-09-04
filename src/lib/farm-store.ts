import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultFarm, designOptimalFarm, newPlacement, placementZ, scoreFarm } from "./engine";
import type { Farm, FarmSystem, Placement, Soil, WaterNeed } from "./types";
import { SQFT_PER_ACRE } from "./planner";
import { clampYear } from "./succession";
import { attachVines, findHostNear, isVine, seatOnHost } from "./trellis";
import { pctToWorld } from "./ground";
import { applyRegion, canPlace, getRegion, PREP_DEFAULT, type Region } from "./regions";
import { SPECIES_BY_ID } from "./species";

interface FarmState {
  farm: Farm;
  selectedId: string | null;
  selectedIds: string[];
  pickerId: string | null;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  setFarm: (partial: Partial<Farm>) => void;
  setZone: (zone: number) => void;
  setSoil: (soil: Soil) => void;
  setWater: (water: WaterNeed) => void;
  setSystem: (system: FarmSystem) => void;
  setAreaSqft: (sqft: number) => void;
  applyPlan: (placements: Placement[]) => void;
  rename: (name: string) => void;
  plant: (speciesId: string, x?: number, z?: number) => boolean;
  move: (placementId: string, x: number, z?: number) => void;
  uproot: (placementId: string) => void;
  select: (placementId: string | null, opts?: { add?: boolean }) => void;
  rotate: (placementId: string, delta: number) => void;
  moveMany: (ids: string[], dx: number, dz: number) => void;
  pick: (speciesId: string | null) => void;
  paletteDrag: boolean;
  beginPaletteDrag: (speciesId: string) => void;
  endPaletteDrag: () => void;
  walkMode: boolean;
  setWalkMode: (v: boolean) => void;
  viewYear: number;
  setViewYear: (y: number) => void;
  compareYear: number | null;
  setCompareYear: (y: number | null) => void;
  applyGuild: (memberIds: string[]) => void;
  optimize: () => void;
  plantOptimal: () => void;
  reset: () => void;
  finishOnboarding: () => void;
  setRegion: (regionId: string) => void;
  setZoning: (zoning: string) => void;
  setMounds: (v: boolean) => void;
  togglePrep: (id: string) => void;
  placeNote: string | null;
}

export const useFarmStore = create<FarmState>()(
  persist(
    (set, get) => ({
      farm: defaultFarm(),
      selectedId: null,
      selectedIds: [],
      pickerId: null,
      paletteDrag: false,
      walkMode: false,
      viewYear: 1,
      compareYear: null,
      hasHydrated: false,
      placeNote: null,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      hydrate: () => {
        /* persist middleware rehydrates; this is a no-op hook point */
      },
      setFarm: (partial) => set({ farm: { ...get().farm, ...partial } }),
      setZone: (zone) => set({ farm: { ...get().farm, zone } }),
      setSoil: (soil) => set({ farm: { ...get().farm, soil } }),
      setWater: (water) => set({ farm: { ...get().farm, water } }),
      setSystem: (system) => set({ farm: { ...get().farm, system } }),
      setAreaSqft: (sqft) => {
        const areaSqft = Math.max(80, Math.min(SQFT_PER_ACRE * 40, sqft));
        set({
          farm: {
            ...get().farm,
            areaSqft,
            acres: areaSqft / SQFT_PER_ACRE,
          },
        });
      },
      applyPlan: (placements) =>
        set({
          farm: { ...get().farm, placements },
          selectedId: null,
        }),
      rename: (name) => set({ farm: { ...get().farm, name } }),
      plant: (speciesId, x, z) => {
        const farm = get().farm;
        const year = get().viewYear;
        const sp = SPECIES_BY_ID[speciesId];
        if (!sp) return false;
        const gate = canPlace(sp, farm);
        if (!gate.ok) {
          set({ placeNote: gate.why, pickerId: speciesId, paletteDrag: false });
          return false;
        }
        let hostId: string | undefined;
        let px = x;
        let pz = z;
        if (isVine(sp)) {
          if (px == null || pz == null) return false;
          const [wx, wz] = pctToWorld(px, pz);
          const found = findHostNear(wx, wz, farm);
          if (!found) return false;
          const seat = seatOnHost(found.host, Math.random());
          px = seat.x;
          pz = seat.z;
          hostId = found.host.id;
        }
        const placement = newPlacement(speciesId, px, pz, { plantedYear: year, hostId });
        set({
          farm: { ...farm, placements: [...farm.placements, placement] },
          selectedId: placement.id,
          selectedIds: [placement.id],
          pickerId: null,
          paletteDrag: false,
          placeNote: null,
        });
        return true;
      },
      move: (placementId, x, z) => {
        const farm = get().farm;
        const target = farm.placements.find((p) => p.id === placementId);
        if (!target) return;
        const sp = SPECIES_BY_ID[target.speciesId];
        let nx = Math.min(96, Math.max(4, x));
        let nz = Math.min(96, Math.max(4, z ?? target.z ?? 50));
        let hostId = target.hostId;
        if (isVine(sp)) {
          const [wx, wz] = pctToWorld(nx, nz);
          const found = findHostNear(wx, wz, farm, new Set([placementId]));
          if (!found) return;
          const seat = seatOnHost(found.host, 0.31);
          nx = seat.x;
          nz = seat.z;
          hostId = found.host.id;
        }
        set({
          farm: {
            ...farm,
            placements: farm.placements.map((p) =>
              p.id === placementId ? { ...p, x: nx, z: nz, hostId } : p,
            ),
          },
        });
      },
      uproot: (placementId) => {
        const farm = get().farm;
        set({
          farm: {
            ...farm,
            placements: farm.placements.filter((p) => p.id !== placementId && p.hostId !== placementId),
          },
          selectedId: get().selectedId === placementId ? null : get().selectedId,
          selectedIds: get().selectedIds.filter((id) => id !== placementId),
        });
      },
      select: (placementId, opts) => {
        if (!placementId) {
          set({ selectedId: null, selectedIds: [] });
          return;
        }
        if (opts?.add) {
          const has = get().selectedIds.includes(placementId);
          const selectedIds = has
            ? get().selectedIds.filter((id) => id !== placementId)
            : [...get().selectedIds, placementId];
          set({ selectedIds, selectedId: selectedIds[selectedIds.length - 1] ?? null });
          return;
        }
        set({ selectedId: placementId, selectedIds: [placementId] });
      },
      rotate: (placementId, delta) => {
        const farm = get().farm;
        set({
          farm: {
            ...farm,
            placements: farm.placements.map((p) =>
              p.id === placementId ? { ...p, rot: (p.rot ?? 0) + delta } : p,
            ),
          },
        });
      },
      moveMany: (ids, dx, dz) => {
        const setIds = new Set(ids);
        const farm = get().farm;
        set({
          farm: {
            ...farm,
            placements: farm.placements.map((p) =>
              setIds.has(p.id)
                ? {
                    ...p,
                    x: Math.min(96, Math.max(4, p.x + dx)),
                    z: Math.min(96, Math.max(4, (p.z ?? 50) + dz)),
                  }
                : p,
            ),
          },
        });
      },
      pick: (speciesId) => set({ pickerId: speciesId, paletteDrag: false }),
      beginPaletteDrag: (speciesId) => set({ pickerId: speciesId, paletteDrag: true }),
      endPaletteDrag: () => set({ paletteDrag: false }),
      setWalkMode: (v) => set({ walkMode: v }),
      setViewYear: (y) => set({ viewYear: clampYear(y) }),
      setCompareYear: (y) => set({ compareYear: y === null ? null : clampYear(y) }),
      applyGuild: (memberIds) => {
        const farm = get().farm;
        const existing = new Set(farm.placements.map((p) => p.speciesId));
        const year = get().viewYear;
        const additions = memberIds
          .filter((id) => !existing.has(id))
          .map((id, i) => {
            const t = memberIds.length === 1 ? 0.5 : i / Math.max(1, memberIds.length - 1);
            const angle = t * Math.PI * 1.7 + 0.5;
            const r = 18 + (i % 2) * 10;
            return newPlacement(id, 50 + Math.cos(angle) * r, 50 + Math.sin(angle) * r * 0.86, {
              plantedYear: year,
            });
          });
        set({
          farm: { ...farm, placements: attachVines([...farm.placements, ...additions]) },
        });
      },
      plantOptimal: () => {
        const farm = get().farm;
        const year = get().viewYear;
        set({
          farm: {
            ...farm,
            onboarded: true,
            placements: designOptimalFarm(farm).map((p) => ({ ...p, plantedYear: year })),
          },
          selectedId: null,
          selectedIds: [],
          pickerId: null,
        });
      },
      optimize: () => {
        const farm = get().farm;
        const year = get().viewYear;
        set({
          farm: {
            ...farm,
            placements: designOptimalFarm(farm).map((p) => ({ ...p, plantedYear: year })),
          },
          selectedId: null,
          selectedIds: [],
        });
      },
      reset: () =>
        set({
          farm: {
            ...defaultFarm(),
            onboarded: true,
            zone: get().farm.zone,
            soil: get().farm.soil,
            water: get().farm.water,
            system: get().farm.system,
            name: get().farm.name,
            acres: get().farm.acres,
            areaSqft: get().farm.areaSqft,
            regionId: get().farm.regionId,
            zoning: get().farm.zoning,
            mounds: get().farm.mounds,
            prep: get().farm.prep,
          },
          selectedId: null,
          selectedIds: [],
        }),
      finishOnboarding: () => set({ farm: { ...get().farm, onboarded: true } }),
      setRegion: (regionId) => {
        const region = getRegion(regionId);
        if (!region || !region.ready) return;
        set({ farm: applyRegion(get().farm, region) });
      },
      setZoning: (zoning) => set({ farm: { ...get().farm, zoning } }),
      setMounds: (v) => set({ farm: { ...get().farm, mounds: v }, placeNote: null }),
      togglePrep: (id) => {
        const farm = get().farm;
        const prep = { ...(farm.prep ?? PREP_DEFAULT) };
        prep[id] = !prep[id];
        set({ farm: { ...farm, prep } });
      },
    }),
    {
      name: "grove.farm.v1",
      skipHydration: true,
      partialize: (s) => ({ farm: s.farm }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function useScore() {
  return scoreFarm(useFarmStore((s) => s.farm));
}

