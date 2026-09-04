import { CHEM_ROLE_LABEL, COMPOUND_CLASS_LABEL } from "@/lib/types";
import { useFarmStore } from "@/lib/farm-store";
import { scoreFarm } from "@/lib/engine";
import { getChemistry } from "@/lib/chemistry";
import { SPECIES_BY_ID } from "@/lib/species";
import { cn } from "@/lib/cn";

const EVIDENCE: Record<string, string> = {
  field: "Field agroforestry",
  mixed: "Mixed / intercrop studies",
  lab: "Mostly controlled studies",
  emerging: "Emerging — treat as a hypothesis",
};

export function ChemistryPanel() {
  const farm = useFarmStore((s) => s.farm);
  const selectedId = useFarmStore((s) => s.selectedId);
  const score = scoreFarm(farm);
  const selected = farm.placements.find((p) => p.id === selectedId);
  const selectedSp = selected ? SPECIES_BY_ID[selected.speciesId] : undefined;
  const selectedChem = selectedSp ? getChemistry(selectedSp) : undefined;

  return (
    <div className="space-y-5">
      <p className="text-xs leading-relaxed text-ink-soft">
        Plants almost never hand a neighbor intact vitamin C or tocopherol. What moves is
        citrate, genistein, juglone, litter minerals — after microbes have had a pass.
        This panel tracks those compounds.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-paper px-3 py-2.5 shadow-border">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">Rhizosphere</p>
          <p className="font-display text-2xl tabular-nums leading-none">{score.chemistry}</p>
        </div>
        <div className="rounded-2xl bg-paper px-3 py-2.5 shadow-border">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">Named compounds</p>
          <p className="font-display text-2xl tabular-nums leading-none">
            {score.chem.compounds.length}
          </p>
        </div>
      </div>

      {selectedSp && selectedChem && (
        <section className="rounded-2xl bg-paper px-3 py-3 shadow-border">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            {selectedSp.name} · {EVIDENCE[selectedChem.evidence]}
          </p>
          <p className="mt-1 text-xs font-medium text-sage-deep">
            {selectedChem.group.replace(/-/g, " ")}
          </p>
          <p className="mt-2 text-sm text-ink-soft">{selectedChem.soilEffects}</p>
          {selectedChem.exudates.length > 0 && (
            <ul className="mt-3 space-y-2">
              {selectedChem.exudates.map((e) => (
                <li key={e.name}>
                  <p className="text-sm font-medium">
                    {e.name}{" "}
                    <span className="font-sans text-[11px] font-normal text-ink-faint">
                      {COMPOUND_CLASS_LABEL[e.klass]}
                    </span>
                  </p>
                  <p className="text-xs text-ink-soft">{e.note}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Services on this acre</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {score.chem.rolesPresent.map((r) => (
            <li key={r} className="rounded-full bg-sage/20 px-2.5 py-0.5 text-[11px] text-sage-deep">
              {CHEM_ROLE_LABEL[r]}
            </li>
          ))}
          {score.chem.rolesMissing.map((r) => (
            <li key={r} className="rounded-full bg-ink/6 px-2.5 py-0.5 text-[11px] text-ink-faint">
              missing {CHEM_ROLE_LABEL[r].toLowerCase()}
            </li>
          ))}
        </ul>
      </section>

      {score.chem.compounds.length > 0 && (
        <section>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">Compound ledger</p>
          <ul className="mt-2 space-y-1.5">
            {score.chem.compounds.slice(0, 12).map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-2 text-xs">
                <span>
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="text-ink-faint"> · {COMPOUND_CLASS_LABEL[c.klass]}</span>
                </span>
                <span className={cn("truncate text-right text-ink-faint")}>
                  {c.species.slice(0, 2).join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {score.chem.mechanisms.length > 0 && (
        <section>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            Mechanisms on this acre
          </p>
          <ul className="mt-2 space-y-2">
            {score.chem.mechanisms.slice(0, 5).map((m) => (
              <li key={m} className="text-xs leading-relaxed text-ink-soft">
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
