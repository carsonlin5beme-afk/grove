import { chemicalConflict, chemicalSynergy, getChemistry } from "./chemistry";
import { fitsSite, scoreFarm } from "./engine";
import { GUILDS } from "./guilds";
import { comboRating, farmAreaSqft, formatArea, planForArea, spacingFt } from "./planner";
import { SPECIES, SPECIES_BY_ID } from "./species";
import { FUNCTION_LABEL, LAYER_LABEL, type Farm, type Species } from "./types";

export interface AdvicePlant {
  id: string;
  reason: string;
  caution?: string;
}

export interface Advice {
  text: string;
  plants: AdvicePlant[];
  followUps: string[];
}

const EXTRA_ALIASES: Record<string, string> = {
  "chinese chestnut": "chestnut",
  "american chestnut": "chestnut",
  chestnut: "chestnut",
  "white clover": "clover-white",
  clover: "clover-white",
  "red clover": "clover-red",
  "black walnut": "walnut-black",
  walnut: "walnut-black",
  "english walnut": "walnut-english",
  grapes: "grape",
  grapevine: "grape",
  "runner bean": "bean-runner",
  beans: "bean-runner",
  chickens: "chicken",
  hens: "chicken",
  poultry: "chicken",
  sheep: "sheep",
  bees: "bee",
  "honey locust": "honey-locust",
  "black locust": "black-locust",
  locust: "black-locust",
};

let aliasTable: { alias: string; id: string }[] | null = null;

function aliases(): { alias: string; id: string }[] {
  if (aliasTable) return aliasTable;
  const rows: { alias: string; id: string }[] = [];
  for (const [a, id] of Object.entries(EXTRA_ALIASES)) rows.push({ alias: a, id });
  for (const sp of SPECIES) {
    rows.push({ alias: sp.name.toLowerCase(), id: sp.id });
    rows.push({ alias: sp.latin.toLowerCase(), id: sp.id });
    rows.push({ alias: sp.id.replace(/-/g, " "), id: sp.id });
  }
  rows.sort((a, b) => b.alias.length - a.alias.length);
  aliasTable = rows;
  return rows;
}

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

export function findSpeciesInText(q: string): Species[] {
  const n = norm(q);
  const hit: Species[] = [];
  const seen = new Set<string>();
  for (const row of aliases()) {
    if (n.includes(row.alias) && !seen.has(row.id) && SPECIES_BY_ID[row.id]) {
      seen.add(row.id);
      hit.push(SPECIES_BY_ID[row.id]);
    }
  }
  return hit;
}

function presentOf(farm: Farm): Species[] {
  return farm.placements.map((p) => SPECIES_BY_ID[p.speciesId]).filter(Boolean);
}

function idsOf(farm: Farm): Set<string> {
  return new Set(farm.placements.map((p) => p.speciesId));
}

function cautionFor(sp: Species, farm: Farm): string | undefined {
  const present = presentOf(farm);
  const fights = present.filter((o) => chemicalConflict(sp, o) || sp.antagonists.includes(o.id) || o.antagonists.includes(sp.id));
  if (fights.length) return `Keep off the drip line of ${fights.map((f) => f.name).join(" and ")}.`;
  if (!fitsSite(sp.id, farm.zone, farm.soil, farm.water)) {
    return `Zone ${farm.zone} / ${farm.soil} / ${farm.water} is a stretch for this species.`;
  }
  if (sp.allelopathic) return `${sp.name} is allelopathic — give sensitive neighbors their own root zone.`;
  return undefined;
}

function placeHint(sp: Species, farm: Farm): string {
  const present = presentOf(farm);
  const hosts = present.filter((o) => o.layer === "canopy" || o.layer === "subcanopy");
  if (sp.layer === "vine" && hosts[0]) return `Train it up ${hosts[0].name} — vertical yield, no extra ground.`;
  if (sp.functions.includes("dynamic-accumulator") && hosts[0]) return `Ring the drip line of ${hosts[0].name} and chop-and-drop.`;
  if (sp.layer === "groundcover") return "Sow as a living floor between trunks, not in a tight disk against bark.";
  if (sp.kind === "animal" && hosts[0]) return `Rotate under ${hosts[0].name} once bark is thick enough to shrug off pecking.`;
  if (sp.layer === "fungi" && hosts[0]) return `Inoculate the litter or logs of ${hosts[0].name}, not a brassica bed.`;
  if (sp.layer === "canopy") return "Give it the center or a windward corner — this one becomes the sky.";
  if (sp.layer === "subcanopy") return "South or east of the tallest tree so it keeps morning light.";
  const ft = spacingFt(sp);
  return `Mature spacing is about ${ft} ft from others in its layer.`;
}

function rankCandidates(farm: Farm, pool: Species[]): Species[] {
  const have = idsOf(farm);
  const present = presentOf(farm);
  const scored = scoreFarm(farm);
  const suggestIds = new Set(scored.suggestions.map((s) => s.speciesId));
  return pool
    .filter((sp) => !have.has(sp.id))
    .map((sp) => {
      let n = 0;
      if (suggestIds.has(sp.id)) n += 8;
      n += sp.companions.filter((c) => have.has(c)).length * 6;
      for (const o of present) {
        if (chemicalSynergy(sp, o)) n += 7;
        if (chemicalConflict(sp, o) || sp.antagonists.includes(o.id)) n -= 20;
      }
      if (fitsSite(sp.id, farm.zone, farm.soil, farm.water)) n += 4;
      if (!scored.layersPresent.includes(sp.layer)) n += 5;
      if (sp.functions.includes("nitrogen-fixer") && !scored.functionsPresent.includes("nitrogen-fixer")) n += 10;
      return { sp, n };
    })
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((x) => x.sp);
}

function toAdvicePlant(sp: Species, farm: Farm, extra?: string): AdvicePlant {
  const syn = presentOf(farm)
    .map((o) => chemicalSynergy(sp, o))
    .find(Boolean);
  const reason =
    extra ??
    syn ??
    (sp.companions.some((c) => idsOf(farm).has(c))
      ? `Listed companion of ${presentOf(farm)
          .filter((o) => sp.companions.includes(o.id) || o.companions.includes(sp.id))
          .map((o) => o.name)
          .slice(0, 2)
          .join(" and ")}.`
      : `${LAYER_LABEL[sp.layer]} · ${sp.functions.slice(0, 2).map((f) => FUNCTION_LABEL[f]).join(", ")}.`);
  return { id: sp.id, reason, caution: cautionFor(sp, farm) };
}

function farmLead(farm: Farm): string {
  const present = presentOf(farm);
  const combo = comboRating(farm);
  const names = [...new Set(present.map((s) => s.name))];
  if (!names.length) {
    return `This ${formatArea(farmAreaSqft(farm))} ${farm.system.replace("-", " ")} in zone ${farm.zone} is still empty.`;
  }
  return `On this ${formatArea(farmAreaSqft(farm))} ${farm.system.replace("-", " ")} you already have ${names.slice(0, 6).join(", ")}${names.length > 6 ? "…" : ""}. Combo ${combo.score}. ${combo.note}`;
}

function nextTo(farm: Farm, anchor: Species): Advice {
  const present = presentOf(farm);
  const have = idsOf(farm);
  const onFarm = have.has(anchor.id);
  const pool = SPECIES.filter((sp) => {
    if (sp.id === anchor.id) return false;
    if (have.has(sp.id) && sp.kind === "plant") return false;
    return (
      anchor.companions.includes(sp.id) ||
      sp.companions.includes(anchor.id) ||
      !!chemicalSynergy(anchor, sp)
    );
  });
  const ranked = rankCandidates(farm, pool.length ? pool : SPECIES.filter((s) => s.kind === "plant"));
  const picks = ranked.slice(0, 4);
  const chem = getChemistry(anchor);
  const lines = [
    farmLead(farm),
    onFarm
      ? `${anchor.name} is already on the acre.`
      : `${anchor.name} is not planted yet — I am answering as if you add it.`,
    `${anchor.name} is ${LAYER_LABEL[anchor.layer].toLowerCase()} (${anchor.latin}). ${anchor.agro}`,
    chem.exudates[0]
      ? `Named chemistry: ${chem.exudates[0].name} — ${chem.exudates[0].note}`
      : null,
    picks.length
      ? `Best neighbors from this library:`
      : `No clean partner in the library that also fits zone ${farm.zone}.`,
  ].filter(Boolean) as string[];

  return {
    text: lines.join("\n\n"),
    plants: picks.map((sp) => toAdvicePlant(sp, farm, placeHint(sp, farm))),
    followUps: [
      `Where should I put ${picks[0]?.name ?? "comfrey"}?`,
      `Is ${anchor.name} happy on this farm?`,
      "How will this guild look in year 8?",
    ],
  };
}

function evaluatePair(farm: Farm, a: Species, b?: Species): Advice {
  const present = presentOf(farm);
  if (!b) {
    const fights = present.filter((o) => chemicalConflict(a, o) || a.antagonists.includes(o.id) || o.antagonists.includes(a.id));
    const friends = present.filter((o) => chemicalSynergy(a, o) || a.companions.includes(o.id) || o.companions.includes(a.id));
    const site = fitsSite(a.id, farm.zone, farm.soil, farm.water);
    const already = idsOf(farm).has(a.id);
    const lines = [
      farmLead(farm),
      already ? `${a.name} is already placed.` : `${a.name} is not on the acre yet.`,
      site
        ? `It fits zone ${farm.zone}, ${farm.soil}, ${farm.water}.`
        : `Site mismatch: this farm is zone ${farm.zone} ${farm.soil} ${farm.water}; ${a.name} wants z${a.hardinessMin}–${a.hardinessMax}, ${a.soils.join("/")}, ${a.water}.`,
      friends.length
        ? `Friends already here: ${friends.map((f) => f.name).join(", ")}.`
        : "No documented friend is on the acre yet.",
      fights.length ? `Do not park it by ${fights.map((f) => f.name).join(" and ")}.` : null,
      placeHint(a, farm),
      a.agro,
    ].filter(Boolean) as string[];
    return {
      text: lines.join("\n\n"),
      plants: already ? [] : [toAdvicePlant(a, farm, "Add it if the site line above is green.")],
      followUps: ["What should I plant next?", `What goes next to ${a.name}?`, "What animals would help?"],
    };
  }

  const chem = chemicalSynergy(a, b);
  const fight = chemicalConflict(a, b);
  const listed = a.companions.includes(b.id) || b.companions.includes(a.id);
  const ant = a.antagonists.includes(b.id) || b.antagonists.includes(a.id);
  let verdict = "Neutral in this library — they do not share a named pairing or a documented fight.";
  if (fight || ant) verdict = "No. Separate the root zones.";
  else if (chem || listed) verdict = "Yes — they belong in the same guild.";
  const detail = fight ?? chem ?? (listed ? `${a.name} and ${b.name} are listed companions in the species file.` : `${a.description}`);
  return {
    text: [farmLead(farm), `${a.name} × ${b.name}: ${verdict}`, detail, placeHint(a, farm)].join("\n\n"),
    plants: fight || ant ? [] : [toAdvicePlant(a, farm), toAdvicePlant(b, farm)].filter((p) => !idsOf(farm).has(p.id)),
    followUps: ["What should I plant next?", "How will this guild look in year 8?"],
  };
}

function placement(farm: Farm, sp: Species): Advice {
  const ft = spacingFt(sp);
  const area = formatArea(farmAreaSqft(farm));
  const plan = planForArea(farm);
  const line = plan.lines.find((l) => l.speciesId === sp.id);
  return {
    text: [
      farmLead(farm),
      `Best seat for ${sp.name} (${LAYER_LABEL[sp.layer].toLowerCase()}): ${placeHint(sp, farm)}`,
      `Mature spacing in our tables: ${ft} ft. On ${area} the planner wants ${line ? `×${line.count}` : "none unless you stretch a dwarf"}.`,
      cautionFor(sp, farm) ?? `${sp.name} has no listed fight with what is already planted.`,
      getChemistry(sp).exudates[0]
        ? `Watch the chemistry: ${getChemistry(sp).exudates[0].name} — ${getChemistry(sp).exudates[0].note}`
        : sp.agro,
    ].join("\n\n"),
    plants: idsOf(farm).has(sp.id) ? [] : [toAdvicePlant(sp, farm, placeHint(sp, farm))],
    followUps: [`What should I plant next to ${sp.name}?`, "What’s the optimal spacing on this plot?"],
  };
}

function succession(farm: Farm, year?: number): Advice {
  const have = idsOf(farm);
  const guilds = GUILDS.filter((g) => g.members.some((m) => have.has(m))).sort(
    (a, b) => b.members.filter((m) => have.has(m)).length - a.members.filter((m) => have.has(m)).length,
  );
  const g = guilds[0] ?? GUILDS.find((x) => x.system === farm.system) ?? GUILDS[0];
  const y = year ?? 8;
  const phase =
    y <= 2
      ? "Years 1–2 are floor and nitrogen. Trees are sticks. Do not expect a canopy calorie."
      : y <= 5
        ? "Years 3–5: fruiting shrubs and the first apples/grapes if you planted them. Nurse trees still earn their keep."
        : y <= 10
          ? "Years 6–10: the canopy starts to pay. Coppice or ring-bark nurses that have done their job. Alleys shrink."
          : "Year 10+: this is a forest. Harvest mast, timber, and the shade-tolerant floor. Annuals only in the brightest gaps.";
  return {
    text: [
      farmLead(farm),
      `Closest written succession in the library is “${g.name}”.`,
      g.succession,
      `Year ${y} in that logic: ${phase}`,
      g.cautions,
    ].join("\n\n"),
    plants: g.members
      .filter((id) => !have.has(id) && SPECIES_BY_ID[id])
      .slice(0, 3)
      .map((id) => toAdvicePlant(SPECIES_BY_ID[id], farm, "Missing from this guild’s written roster.")),
    followUps: ["What should I plant next?", "What animals would improve this system?", `Why is ${g.members[0]} in this guild?`],
  };
}

function whySpecies(farm: Farm, sp: Species): Advice {
  const scored = scoreFarm(farm);
  const sug = scored.suggestions.find((s) => s.speciesId === sp.id);
  const present = presentOf(farm);
  const syns = present
    .map((o) => {
      const t = chemicalSynergy(sp, o);
      return t ? `${o.name}: ${t}` : null;
    })
    .filter(Boolean) as string[];
  const chem = getChemistry(sp);
  return {
    text: [
      farmLead(farm),
      sug ? `The engine flagged ${sp.name} because ${sug.reason}.` : `${sp.name} is in the library as ${LAYER_LABEL[sp.layer].toLowerCase()}.`,
      sp.agro,
      chem.exudates[0] ? `${chem.exudates[0].name} — ${chem.exudates[0].note}` : null,
      syns[0] ?? null,
      `Harvest note: ${sp.yields}. Site: zone ${sp.hardinessMin}–${sp.hardinessMax}, ${sp.soils.join(", ")}, ${sp.water} water.`,
    ].filter(Boolean).join("\n\n"),
    plants: [toAdvicePlant(sp, farm, placeHint(sp, farm))],
    followUps: [`Where is the best place to add ${sp.name}?`, "What should I plant next?"],
  };
}

function animals(farm: Farm): Advice {
  const present = presentOf(farm);
  const fodder = present.filter((s) => s.functions.includes("fodder") || s.functions.includes("forage") || s.fodderFor.length);
  const pool = SPECIES.filter((s) => s.kind === "animal" && fitsSite(s.id, farm.zone, farm.soil, farm.water));
  const ranked = pool
    .map((sp) => {
      const feeders = present.filter((p) => p.fodderFor.includes(sp.id) || sp.fodderFor.includes(p.id));
      return { sp, n: feeders.length * 5 + (farm.system === "silvopasture" ? 4 : 0) + (sp.id === "bee" ? 3 : 0) };
    })
    .sort((a, b) => b.n - a.n)
    .map((x) => x.sp)
    .slice(0, 4);
  const area = farmAreaSqft(farm);
  const lines = [
    farmLead(farm),
    area < 200
      ? "This plot is small for a flock. A hive is the only animal that does not need a paddock."
      : area < 800
        ? "Enough room for a short poultry rotation under fruit, not a ruminant."
        : "This footprint can carry poultry and, if the forage is in, a small ruminant on rotation.",
    fodder.length ? `Forage already planted: ${fodder.map((f) => f.name).join(", ")}.` : "No fodder layer yet — plant clover or locust before a hoof.",
  ];
  return {
    text: lines.join("\n\n"),
    plants: ranked.map((sp) =>
      toAdvicePlant(
        sp,
        farm,
        present.filter((p) => p.fodderFor.includes(sp.id)).length
          ? `Mast/forage already points at ${sp.name}.`
          : placeHint(sp, farm),
      ),
    ),
    followUps: ["What should I plant next?", "How will this guild look in year 8?"],
  };
}

function spacing(farm: Farm): Advice {
  const plan = planForArea(farm);
  const area = formatArea(plan.areaSqft);
  const rows = plan.lines.map((l) => `${l.count}× ${l.name} (${l.spacingFt} ft, ${l.role})`);
  return {
    text: [
      farmLead(farm),
      `Peak combo for ${area} from the planner (combo ${plan.comboScore}):`,
      rows.join("\n") || "Nothing fits this site at that size.",
      plan.why[0] ?? "",
    ].join("\n\n"),
    plants: plan.lines.filter((l) => !idsOf(farm).has(l.speciesId)).slice(0, 4).map((l) => {
      const sp = SPECIES_BY_ID[l.speciesId];
      return toAdvicePlant(sp, farm, `${l.role} · ${l.spacingFt} ft · ×${l.count} on ${area}.`);
    }),
    followUps: ["Plant the peak combo?", "What should I plant next?", "How will this guild look in year 8?"],
  };
}

function nextPlant(farm: Farm): Advice {
  const scored = scoreFarm(farm);
  const picks = scored.suggestions.slice(0, 5);
  if (!picks.length) {
    return {
      text: `${farmLead(farm)}\n\nThe suggestion engine is quiet — either the acre is full of layers or the site filter is harsh. Ask about a named species or open the planner.`,
      plants: [],
      followUps: ["What’s the optimal spacing for this plot?", "What animals would help?"],
    };
  }
  return {
    text: [
      farmLead(farm),
      scored.notes[0] ?? "The next plant should close a missing layer or a missing chemical role.",
      "From the library, in order:",
    ].join("\n\n"),
    plants: picks.map((s) => {
      const sp = SPECIES_BY_ID[s.speciesId];
      return toAdvicePlant(sp, farm, s.reason);
    }),
    followUps: picks[0] ? [`Where is the best place to add ${SPECIES_BY_ID[picks[0].speciesId]?.name}?`, "How will this guild look in year 8?"] : [],
  };
}

function aboutSpecies(farm: Farm, sp: Species): Advice {
  const chem = getChemistry(sp);
  return {
    text: [
      farmLead(farm),
      `${sp.name} (${sp.latin}) — ${LAYER_LABEL[sp.layer]}, ${sp.family}.`,
      sp.description,
      sp.agro,
      chem.exudates.slice(0, 2).map((e) => `${e.name}: ${e.note}`).join("\n") || null,
      `Companions in file: ${sp.companions.map((id) => SPECIES_BY_ID[id]?.name ?? id).join(", ") || "none listed"}.`,
      sp.antagonists.length ? `Keep away from ${sp.antagonists.map((id) => SPECIES_BY_ID[id]?.name ?? id).join(", ")}.` : null,
    ].filter(Boolean).join("\n\n"),
    plants: [toAdvicePlant(sp, farm, placeHint(sp, farm))],
    followUps: [`Is ${sp.name} a good companion here?`, `What should I plant next to ${sp.name}?`],
  };
}

function status(farm: Farm): Advice {
  const scored = scoreFarm(farm);
  const missing = ["canopy", "subcanopy", "shrub", "vine", "herb", "groundcover"].filter(
    (l) => !scored.layersPresent.includes(l as never),
  );
  return {
    text: [
      farmLead(farm),
      scored.synergies[0] ? `Strongest pairing on the acre: ${scored.synergies[0].title}. ${scored.synergies[0].detail}` : "No mutualism card yet.",
      scored.conflicts[0] ? `Watch: ${scored.conflicts[0].title}. ${scored.conflicts[0].detail}` : "No chemical fight on the board.",
      missing.length ? `Open layers: ${missing.join(", ")}.` : "The vertical stack is filled.",
    ].join("\n\n"),
    plants: scored.suggestions.slice(0, 3).map((s) => toAdvicePlant(SPECIES_BY_ID[s.speciesId], farm, s.reason)),
    followUps: ["What should I plant next?", "How will this guild look in year 8?", "What animals would improve this system?"],
  };
}

export function advisorChips(farm: Farm): string[] {
  const present = presentOf(farm);
  const chips = ["What should I plant next?", "How will this guild look in year 8?"];
  if (present.some((s) => s.id === "chestnut" || s.layer === "canopy")) {
    const c = present.find((s) => s.layer === "canopy");
    if (c) chips.push(`What should I plant next to my ${c.name}?`);
  }
  if (present.some((s) => s.id === "clover-white") || scoreFarm(farm).suggestions.some((s) => s.speciesId === "clover-white")) {
    chips.push("Why is white clover recommended?");
  }
  chips.push("What animals would improve this system?");
  chips.push(`What’s the optimal spacing on ${formatArea(farmAreaSqft(farm))}?`);
  if (present.some((s) => s.id === "grape") || true) chips.push("Is grape a good companion here?");
  return chips.slice(0, 6);
}

export function askAdvisor(farm: Farm, question: string): Advice {
  const q = norm(question);
  const found = findSpeciesInText(question);
  const yearHit = q.match(/year\s+(\d+)/);
  const year = yearHit ? Number(yearHit[1]) : undefined;

  if (/spacing|square|sq\s*ft|acre|density|how many|400/.test(q)) return spacing(farm);
  if (/year\s+\d+|succession|look in|in ten|mature/.test(q)) return succession(farm, year);
  if (/animal|chicken|sheep|goat|cow|livestock|flock|hive|bee/.test(q) && !found.some((s) => s.kind === "animal" && /next to|beside|companion/.test(q))) {
    return animals(farm);
  }
  if ((/why\b/.test(q) || /recommend/.test(q)) && found[0]) return whySpecies(farm, found[0]);
  if (/where|place|put|add .+ in|drip line|spot/.test(q) && found[0]) return placement(farm, found[0]);
  if ((/next to|beside|under|near|around|companion for/.test(q) || /what should i plant next to/.test(q)) && found[0]) {
    return nextTo(farm, found[0]);
  }
  if ((/is .+ (a )?(good|ok|okay|fine|bad)|companion here|should i (add|plant)/.test(q)) && found[0]) {
    return evaluatePair(farm, found[0], found[1]);
  }
  if (/what should i plant|plant next|missing|what.?s next|improve this|gap/.test(q)) return nextPlant(farm);
  if (found[0] && found[1]) return evaluatePair(farm, found[0], found[1]);
  if (found[0]) return aboutSpecies(farm, found[0]);
  return status(farm);
}
