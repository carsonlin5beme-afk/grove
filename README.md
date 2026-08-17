# Grove

A location-first agroforestry and silvopasture studio. Start from a real county — Zephyrhills / Pasco County, Florida is the first fully mapped region — then compose a guild the way a forest would.

Grove is a decision-support tool, not a blank sandbox. Climate, drainage, zoning, and mature size constrain what you can plant. Vines only climb living supports. Everything starts as a sapling and grows along a succession timeline.

## What it does

- **Cover + landing** — a living grove, not a form
- **Studio** — 3D acre, drag-and-drop planting, complementary-pair glow, succession slider (pioneer → mature)
- **Location first** — USDA 9b / Cfa / Southwestern Florida Flatwoods, Pasco zoning (A-C through AR-5MH), mounds required for wet-sensitive fruit
- **Guild planner** — area in, optimal mix out, with a live combo score
- **Advisor** — answers from the species and chemistry databases, not generic chat
- **Library** — every plant and animal with role, chemistry, and site fit
- **Guild stories** — slide decks that explain harmony in plain language
- **Nutrients** — vitamins, minerals, fats, and phytonutrients with plant vs animal pathways

## Stack

React 19, TypeScript, Vite, TanStack Start, Tailwind v4, Zustand, Three.js / React Three Fiber.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` and `npm run typecheck` are the production checks.

## Region data

The first region is hard-coded in `src/lib/regions.ts` (Zephyrhills / Pasco). Species live in `src/lib/species.ts` and `src/lib/species-florida.ts`. Chemical ecology is in `src/lib/chemistry.ts`. The architecture is built so North and South Florida can be added as more region records without rewriting the Studio.

## License

MIT. See [LICENSE](LICENSE).
