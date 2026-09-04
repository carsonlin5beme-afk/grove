import type {
  ChemEvidence,
  ChemGroup,
  ChemRole,
  Chemistry,
  ChemSnapshot,
  CompoundClass,
  Exudate,
  ReleaseRoute,
  Species,
} from "./types";
import { CHEM_ROLES } from "./types";

function x(
  name: string,
  klass: CompoundClass,
  routes: ReleaseRoute[],
  roles: ChemRole[],
  note: string,
): Exudate {
  return { name, klass, routes, roles, note };
}

function chem(
  group: ChemGroup,
  exudates: Exudate[],
  soilEffects: string,
  sensitiveTo: string[] = [],
  evidence: ChemEvidence = "mixed",
): Chemistry {
  return { group, exudates, soilEffects, sensitiveTo, evidence };
}

const citrate = x(
  "citrate",
  "organic-acid",
  ["root-exudate"],
  ["p-mobilizer", "fe-mobilizer", "pgpr-recruit"],
  "Chelates Fe³⁺, Al³⁺, Ca²⁺ and acidifies the rhizosphere, releasing adsorbed phosphate.",
);
const malate = x(
  "malate",
  "organic-acid",
  ["root-exudate"],
  ["p-mobilizer", "pgpr-recruit"],
  "Low-molecular-weight organic acid; preferred C source for phosphate-solubilizing bacteria.",
);
const oxalate = x(
  "oxalate",
  "organic-acid",
  ["root-exudate", "litter"],
  ["p-mobilizer"],
  "Dissolves Ca-phosphate; common in deep-rooted trees under P stress.",
);
const genistein = x(
  "genistein",
  "isoflavonoid",
  ["root-exudate"],
  ["n-fixation-signal", "pgpr-recruit"],
  "Isoflavone that binds rhizobial NodD and induces nod genes. Exudation rises under N or P deficiency.",
);
const daidzein = x(
  "daidzein",
  "isoflavonoid",
  ["root-exudate"],
  ["n-fixation-signal", "amf-signal"],
  "Isoflavone chemoattractant for rhizobia and a modulator of AMF colonization.",
);
const luteolin = x(
  "luteolin",
  "flavonoid",
  ["root-exudate"],
  ["n-fixation-signal", "pgpr-recruit"],
  "Flavone Nod-gene inducer; also a rhizosphere antioxidant that shifts microbial redox.",
);
const naringenin = x(
  "naringenin",
  "flavonoid",
  ["root-exudate"],
  ["n-fixation-signal"],
  "Flavanone that induces nodulation in several Rhizobium / Bradyrhizobium lineages.",
);
const formononetin = x(
  "formononetin",
  "isoflavonoid",
  ["root-exudate"],
  ["n-fixation-signal", "amf-signal"],
  "Isoflavone linked to both nodulation and AMF hyphal branching.",
);
const strigolactone = x(
  "strigolactones",
  "strigolactone",
  ["root-exudate"],
  ["amf-signal"],
  "Carotenoid-derived signals that trigger AMF colonization and can attract parasitic weeds.",
);
const juglone = x(
  "juglone",
  "naphthoquinone",
  ["root-exudate", "litter", "leachate"],
  ["allelopath-inhibit"],
  "Released as hydrojuglone glycoside; oxidizes in soil to 5-hydroxy-1,4-naphthoquinone, which uncouples mitochondrial electron transport in sensitive neighbors.",
);
const scopoletin = x(
  "scopoletin",
  "coumarin",
  ["root-exudate"],
  ["fe-mobilizer", "pathogen-suppress"],
  "Catecholic coumarin that reduces Fe³⁺ to Fe²⁺ and chelates it; also antimicrobial.",
);
const ferulic = x(
  "ferulic acid",
  "phenolic-acid",
  ["litter", "root-exudate"],
  ["allelopath-inhibit", "nitrification-inhibit"],
  "Phenolic acid; growth-inhibitory at high concentration, a nitrification brake at agroforestry densities.",
);
const tannin = x(
  "condensed tannins",
  "tannin",
  ["litter"],
  ["litter-slow", "pathogen-suppress"],
  "Precipitate protein and slow N mineralization — useful against leaching, temporarily N-limiting.",
);
const sugars = x(
  "glucose / sucrose",
  "sugar",
  ["root-exudate", "rhizodeposition"],
  ["pgpr-recruit"],
  "Bulk rhizodeposit C that lifts microbial biomass and phosphatase / urease activity.",
);
const glutamate = x(
  "glutamate",
  "amino-acid",
  ["root-exudate", "rhizodeposition"],
  ["n-transfer", "pgpr-recruit"],
  "N-rich rhizodeposit; a documented pathway of N transfer from fixers to neighbors.",
);
const dimboa = x(
  "DIMBOA",
  "benzoxazinoid",
  ["root-exudate", "litter"],
  ["pathogen-suppress", "allelopath-inhibit", "pgpr-recruit"],
  "Benzoxazinoid of the grasses. Antimicrobial and allelopathic; also selects a beneficial microbiome.",
);
const glucosinolate = x(
  "glucosinolates → isothiocyanates",
  "glucosinolate",
  ["litter", "root-exudate"],
  ["pathogen-suppress", "allelopath-inhibit"],
  "Hydrolyzed by myrosinase to isothiocyanates. Biofumigant — also hostile to AMF, so keep brassicas off mycorrhizal specialists.",
);
const sorgoleone = x(
  "sorgoleone",
  "terpenoid",
  ["root-exudate"],
  ["allelopath-inhibit"],
  "Hydrophobic benzoquinone from sorghum root hairs. A potent natural herbicide that partitions into SOM.",
);
const cineole = x(
  "1,8-cineole",
  "terpenoid",
  ["litter", "volatile"],
  ["allelopath-inhibit", "litter-slow"],
  "Monoterpene that slows decomposition and can suppress understory germination.",
);
const mimosine = x(
  "mimosine",
  "alkaloid",
  ["litter", "root-exudate"],
  ["allelopath-inhibit"],
  "Toxic amino-acid analog from Leucaena. Inhibits germination and is dangerous to non-adapted livestock.",
);
const saponin = x(
  "saponins",
  "saponin",
  ["litter", "root-exudate"],
  ["pathogen-suppress", "litter-slow"],
  "Surfactant glycosides that alter membrane integrity of fungi and slow litter breakdown.",
);
const biochanin = x(
  "biochanin A",
  "isoflavonoid",
  ["root-exudate"],
  ["n-fixation-signal", "amf-signal"],
  "Isoflavone of clovers and alfalfa. NodD inducer and an AMF hyphal-branching cue.",
);
const quercetin = x(
  "quercetin",
  "flavonoid",
  ["root-exudate", "litter"],
  ["pgpr-recruit", "allelopath-facilitate"],
  "Flavonol antioxidant. In the rhizosphere it shifts redox and can recruit PGPR; not a vitamin handed to neighbors.",
);
const caffeic = x(
  "caffeic acid",
  "phenolic-acid",
  ["litter", "root-exudate"],
  ["allelopath-inhibit", "fe-mobilizer"],
  "Phenolic acid. Growth-inhibitory at high concentration; a weak Fe chelator at agroforestry densities.",
);
const oleuropein = x(
  "oleuropein",
  "phenolic-acid",
  ["litter", "leachate"],
  ["pathogen-suppress", "litter-slow"],
  "Secoiridoid phenolic of olive tissue and litter. Antimicrobial in the leaf; harvest bitterness, not a tomato gift.",
);
const aucubin = x(
  "aucubin",
  "terpenoid",
  ["litter"],
  ["pathogen-suppress", "mineral-return"],
  "Iridoid glycoside of plantain. Antimicrobial in tissue; the sward benefit is also mineral-dense leaf, not a hormone drip.",
);
const carvacrol = x(
  "carvacrol",
  "terpenoid",
  ["litter", "volatile"],
  ["pathogen-suppress", "allelopath-inhibit"],
  "Monoterpenoid phenol of oregano. Suppresses some germinating weeds and soil microbes. Harvest oil stays in the plant.",
);
const thymol = x(
  "thymol",
  "terpenoid",
  ["litter", "volatile"],
  ["pathogen-suppress"],
  "Monoterpene phenol of thyme. Shapes a dry, aromatic litter layer that grass seedlings dislike.",
);
const camphor = x(
  "camphor",
  "terpenoid",
  ["litter", "volatile"],
  ["allelopath-inhibit", "litter-slow"],
  "Bicyclic monoterpene of rosemary, sage, and some lavenders. Slows germination under a dense herb carpet.",
);
const anethole = x(
  "trans-anethole",
  "terpenoid",
  ["litter", "root-exudate"],
  ["allelopath-inhibit"],
  "Phenylpropanoid of fennel. Can suppress nearby annuals — give fennel its own edge, not a mixed herb row.",
);
const heliannuol = x(
  "heliannuols",
  "terpenoid",
  ["root-exudate", "litter"],
  ["allelopath-inhibit"],
  "Sesquiterpenes of sunflower. Documented weed suppression in the row; keep small-seeded neighbors a bed away.",
);
const lupulin = x(
  "humulone / lupulin",
  "terpenoid",
  ["litter"],
  ["pathogen-suppress"],
  "Bitter acids of hop cones. A harvest/medicine trait. Soil service is the living trellis and shade, not a hops exudate gift.",
);
const lycorine = x(
  "lycorine",
  "alkaloid",
  ["litter", "root-exudate"],
  ["pathogen-suppress"],
  "Amaryllidaceae alkaloid. Voles avoid daffodil rings; it is a trunk-guard, not a fertilizer.",
);
const alkamide = x(
  "alkamides",
  "alkaloid",
  ["root-exudate", "litter"],
  ["pathogen-suppress"],
  "N-alkylamides of Echinacea roots. Harvest/medicine chemistry. Insectary is the field service.",
);
const allantoin = x(
  "allantoin + mineral-rich biomass",
  "amino-acid",
  ["litter"],
  ["mineral-return", "litter-fast"],
  "Not a magic vitamin donor. Deep taproot concentrates K, Ca, Si, P; chop-and-drop returns them after microbial processing. Validation is emerging (≥200% of mean tissue conc. is the usual bar).",
);
const soyasapogenol = x(
  "soyasapogenol B",
  "saponin",
  ["root-exudate"],
  ["pgpr-recruit", "n-transfer"],
  "Triterpenoid sapogenin documented in maize–legume mixed rhizospheres. Correlates with a microbial shift that lifts cereal nutrient content.",
);
const chlorogenic = x(
  "chlorogenic acid",
  "phenolic-acid",
  ["litter", "root-exudate"],
  ["pathogen-suppress", "allelopath-facilitate"],
  "Caffeoylquinic acid common in Asteraceae and some fruits. Antioxidant in tissue; in litter it is a mild microbial filter.",
);
const punicalagin = x(
  "punicalagins",
  "tannin",
  ["litter"],
  ["litter-slow"],
  "Ellagitannins of pomegranate fruit and rind. A harvest antioxidant. Do not model them as a soil vitamin pipe.",
);
const menthol = x(
  "menthol / menthone",
  "terpenoid",
  ["litter", "volatile"],
  ["pathogen-suppress", "allelopath-inhibit"],
  "Mint monoterpenes. Contain the runner or it will occupy every damp niche. Chemistry is defensive, not facilitative.",
);
const eugenol = x(
  "eugenol / linalool",
  "terpenoid",
  ["litter", "volatile"],
  ["pathogen-suppress"],
  "Basil phenylpropanoids and monoterpenes. Pest-cue and culinary oil. No documented tomato-exudate gift.",
);
const silica = x(
  "phytolith silica",
  "amino-acid",
  ["litter"],
  ["mineral-return", "litter-fast"],
  "Bamboo and some grasses deposit silica in tissue. Litter returns Si and a fast C pulse. Classed here as mineral return, not a protein.",
);
const azelaic = x(
  "asparagusic acid",
  "saponin",
  ["root-exudate", "litter"],
  ["pathogen-suppress"],
  "Sulfur heterocycle plus steroidal saponins. One of the few vegetables with documented juglone tolerance — it ignores the uncoupler; it does not eat it.",
);
const thujone = x(
  "α-thujone",
  "terpenoid",
  ["litter", "volatile"],
  ["allelopath-inhibit", "litter-slow"],
  "Monoterpene ketone of cedar and some sages. Recalcitrant litter; keep it as a windbreak, not over a vegetable alley.",
);
const catechin = x(
  "catechin / epicatechin",
  "flavonoid",
  ["litter", "root-exudate"],
  ["pgpr-recruit", "allelopath-facilitate"],
  "Flavan-3-ols of many woody rosaceous and fagaceous species. Antioxidant in tissue; in soil they are a carbon source and a weak signal, not a toxin at grove density.",
);
const succinate = x(
  "succinate",
  "organic-acid",
  ["root-exudate"],
  ["p-mobilizer", "pgpr-recruit"],
  "LMWOA preferred by many phosphate-solubilizing bacteria. Rises under P stress with citrate and malate.",
);

const JUGLONE_SENSITIVE = [
  "apple",
  "pear",
  "peach",
  "plum",
  "cherry",
  "tomato",
  "eggplant",
  "pine",
  "blueberry",
  "grape",
  "potato",
  "strawberry",
  "kiwi",
  "serviceberry",
];
const JUGLONE_TOLERANT = [
  "asparagus",
  "raspberry-black",
  "currant",
  "onion",
  "garlic",
  "pawpaw",
  "persimmon",
  "maple",
  "grass",
  "switchgrass",
];

/** Per-species chemical ecology. Missing ids fall back to a generalist profile. */
export const CHEMISTRY: Record<string, Chemistry> = {
  "clover-white": chem(
    "n-fixer-legume",
    [genistein, daidzein, formononetin, biochanin, luteolin, glutamate, sugars],
    "Rhizobium-associated N fixation. Isoflavonoids induce nod genes; rhizodeposited amino acids and mixed litter transfer N to the orchard floor. Strong AMF host — do not pair tightly with brassica biofumigants.",
    [],
    "field",
  ),
  "clover-red": chem(
    "n-fixer-legume",
    [formononetin, genistein, glutamate],
    "Deeper-rooted than white clover. Formononetin-rich exudate supports both nodulation and AMF. Short-lived; overseed.",
    [],
    "field",
  ),
  "bean-runner": chem(
    "n-fixer-legume",
    [genistein, daidzein, naringenin, citrate],
    "Climbing Phaseolus. Genistein/daidzein drive nodulation; organic acids help when the young tree alley is P-poor.",
    [],
    "mixed",
  ),
  vetch: chem(
    "n-fixer-legume",
    [naringenin, luteolin, glutamate],
    "Winter N engine with rye. Flavonoid nod signals in cool soil; terminate before seed so it does not smother.",
    [],
    "field",
  ),
  lupin: chem(
    "n-fixer-legume",
    [luteolin, genistein],
    "Native lupine. N-fixer and pollinator host. Not the cluster-root P pump — see white lupin.",
    [],
    "mixed",
  ),
  "lupin-white": chem(
    "p-mobilizer",
    [citrate, malate, genistein],
    "Cluster roots dump citrate and malate under P stress and export genistein via MATE transporters. The strongest temperate P-mobilizing annual. Use on P-fixing clays and acid sands.",
    [],
    "field",
  ),
  faba: chem(
    "n-fixer-legume",
    [genistein, luteolin, citrate, malate, soyasapogenol],
    "Classic cereal intercrop. Intercropping (wheat–faba, maize–faba) increases flavonoid exudation and nodulation versus monoculture. Organic acids lift labile P for the neighbor. Soyasapogenol B shows up in mixed-stand metabolomes.",
    [],
    "field",
  ),
  alfalfa: chem(
    "n-fixer-legume",
    [luteolin, daidzein, formononetin, biochanin, citrate, saponin],
    "Deep taproot + strong flavonoid nodulation (luteolin, daidzein, biochanin A). Saponins in litter can slow decomposition. Excellent silvopasture understory if you manage bloat.",
    [],
    "field",
  ),
  alder: chem(
    "n-fixer-actinorhizal",
    [glutamate, sugars, tannin, ferulic],
    "Frankia, not rhizobia — flavonoid nod signaling is less characterized. High-quality N litter and fine-root turnover enrich SOM under the drip line. Coppice to keep it a nurse, not a competitor.",
    [],
    "field",
  ),
  "sea-buckthorn": chem(
    "n-fixer-actinorhizal",
    [glutamate, ferulic],
    "Actinorhizal Hippophae. N input on dry, poor sand plus a phenolic-rich fruit. Litter is slower than clover.",
    [],
    "mixed",
  ),
  goumi: chem(
    "n-fixer-actinorhizal",
    [glutamate, sugars],
    "Elaeagnus — Frankia nodules, not legumes. Used as a nurse on the sunny side of young fruit. Fruit is a side yield.",
    [],
    "mixed",
  ),
  "autumn-olive": chem(
    "n-fixer-actinorhizal",
    [glutamate, tannin],
    "Same Frankia service as goumi, more aggressive. Manage as chop-and-drop N, do not introduce to a clean site.",
    [],
    "field",
  ),
  "black-locust": chem(
    "n-fixer-legume",
    [luteolin, naringenin, glutamate, tannin],
    "Robiniae flavonoid nodulation plus a dense, tannin-rich litter. N pump and post timber. Bark/seed toxic; wilt leaves before fodder.",
    [],
    "field",
  ),
  "honey-locust": chem(
    "facilitator",
    [sugars, glutamate],
    "Open canopy and a sweet pod. Fabaceae, but Gleditsia does not form agronomic rhizobial nodules — do not treat it as an N-fixer. The service is light and fodder, not flavonoid nodulation.",
    [],
    "field",
  ),
  mesquite: chem(
    "n-fixer-legume",
    [luteolin, citrate, glutamate],
    "Prosopis. Deep roots + N fixation + organic acids on caliche. Pods are the transfer mechanism to livestock, not a vitamin pipe.",
    [],
    "field",
  ),
  "walnut-black": chem(
    "allelopath",
    [juglone, ferulic, tannin, oxalate],
    "Hydrojuglone glycoside oxidizes to juglone in aerated soil. Phytotoxic to many Solanaceae, Rosaceae, and pines. Effects are concentration- and SOM-dependent — high organic matter and certain companions accelerate microbial degradation. Keep sensitive crops out of the overlapping rhizosphere.",
    [],
    "field",
  ),
  "walnut-english": chem(
    "allelopath",
    [juglone, tannin],
    "Milder juglone load than black walnut, same chemistry. Still keep tomato and apple out of the root zone.",
    [],
    "field",
  ),
  pecan: chem(
    "allelopath",
    [x("juglone (trace)", "naphthoquinone", ["litter", "root-exudate"], ["allelopath-inhibit"], "Hickories produce less juglone than black walnut; still not a tomato alley.")],
    "Weak naphthoquinone presence. Treat as a mild allelopath, not a walnut clone.",
    [],
    "lab",
  ),
  comfrey: chem(
    "dynamic-accumulator",
    [allantoin, sugars],
    "Mineral miner, not a nutrient pipe. Microbial processing of the mulch is required before neighbors see the K and Ca. Sterile Bocking 14 only.",
    [],
    "emerging",
  ),
  nettle: chem(
    "dynamic-accumulator",
    [
      x(
        "mineral-dense foliage",
        "phenolic-acid",
        ["litter"],
        ["mineral-return", "litter-fast"],
        "Exceptional Ca accumulator. Field trials show elevated topsoil Ca after chop-and-drop, with depletion deeper in the profile — a real vertical pump.",
      ),
    ],
    "Returns Ca and micronutrients to the topsoil via litter. Keep it on the wet edge.",
    [],
    "field",
  ),
  yarrow: chem(
    "dynamic-accumulator",
    [ferulic, sugars],
    "P, K, Ca miner plus an umbel that recruits hoverflies. Phenolics at path-edge density are signaling, not herbicidal.",
    [],
    "emerging",
  ),
  chicory: chem(
    "dynamic-accumulator",
    [
      x(
        "sesquiterpene lactones",
        "terpenoid",
        ["litter"],
        ["pathogen-suppress", "mineral-return"],
        "Deep taproot + condensed tannins / sesquiterpene lactones that are anthelmintic in the sward. Mineral miner for K and Ca.",
      ),
    ],
    "Forage chemistry matters as much as yield — tannins help with internal parasites in sheep.",
    [],
    "field",
  ),
  "plantain-forage": chem(
    "dynamic-accumulator",
    [aucubin, ferulic],
    "Aucubin and related iridoids plus mineral-dense leaf. Livestock seek it; indicator of compaction if it dominates.",
    [],
    "mixed",
  ),
  borage: chem(
    "facilitator",
    [sugars, x("pyrrolizidine alkaloids (trace)", "alkaloid", ["litter"], ["pathogen-suppress"], "Self-sowing insectary. Not a mineral miner on the comfrey scale.")],
    "Nectar and a light phenolic footprint. Claimed tomato benefits are mostly insectary, not a documented exudate transfer.",
    [],
    "emerging",
  ),
  dandelion: chem(
    "dynamic-accumulator",
    [malate, oxalate],
    "Ca, K, Fe, Mg miner that opens compacted soil with a taproot. Organic acids help locally. Manage as a sward herb, not a weed war.",
    [],
    "emerging",
  ),
  buckwheat: chem(
    "p-mobilizer",
    [citrate, malate, ferulic],
    "High phenolic and organic-acid exudation. Effective P scavenger and mildly allelopathic to some weeds. 40-day cover — terminate at flowering for a fast mulch.",
    [],
    "field",
  ),
  daikon: chem(
    "biofumigant",
    [glucosinolate, malate],
    "A living subsoiler whose residues hydrolyze to isothiocyanates. Good before a disease-prone alley; bad immediately before planting AMF-dependent trees or truffles.",
    [],
    "field",
  ),
  horseradish: chem(
    "biofumigant",
    [glucosinolate],
    "Persistent Armoracia. Same isothiocyanate chemistry as mustard. Contain the root.",
    [],
    "mixed",
  ),
  mustard: chem(
    "biofumigant",
    [glucosinolate],
    "Brassica biofumigant. Chop and incorporate for pathogen and weed suppression. Keep off the hazel/truffle and apple AMF zone for a season.",
    [],
    "field",
  ),
  sorghum: chem(
    "allelopath",
    [sorgoleone, dimboa],
    "Sorgoleone from root hairs is one of the best-documented weed-suppressing exudates. Hydrophobic — persists in SOM. Use as a managed alley cover, not under young fruit.",
    [],
    "field",
  ),
  rye: chem(
    "allelopath",
    [
      x(
        "DIBOA / benzoxazinoids",
        "benzoxazinoid",
        ["litter", "root-exudate"],
        ["allelopath-inhibit", "pathogen-suppress"],
        "Winter sponge plus allelopathic residue. Do not undersow tiny seeds into fresh rye mulch.",
      ),
    ],
    "Useful before summer alleys. Residue chemistry, not just biomass, is why small seeds fail in it.",
    [],
    "field",
  ),
  corn: chem(
    "amf-host",
    [dimboa, strigolactone, malate],
    "Benzoxazinoids shape the microbiome; strigolactones recruit AMF. In a maize–legume mix, cereal biomass and nutrient content rise via exudate-driven microbial change (soyasapogenol B, organic acids, flavonoids from the legume side).",
    [],
    "field",
  ),
  chestnut: chem(
    "facilitator",
    [tannin, sugars, strigolactone, oxalate, catechin],
    "Tannin-rich litter slows N release — a leach buffer, not a vitamin donor. Deep roots pump base cations. AMF-associated; pair with a Frankia or legume nurse, not a brassica.",
    [],
    "mixed",
  ),
  apple: chem(
    "amf-host",
    [strigolactone, sugars, ferulic],
    "Rosaceous AMF host. Juglone-sensitive — mitochondrial uncoupling under walnut. Benefits from comfrey are mineral return (K) after microbial processing, not a hormone drip.",
    ["walnut-black", "walnut-english"],
    "field",
  ),
  grape: chem(
    "amf-host",
    [strigolactone, ferulic],
    "Vertical calories on a living trellis. Juglone-sensitive. Phenolic fruit chemistry is a harvest trait, not a soil transfer.",
    ["walnut-black"],
    "mixed",
  ),
  blueberry: chem(
    "amf-host",
    [
      x(
        "ericoid phenolics",
        "phenolic-acid",
        ["litter", "root-exudate"],
        ["litter-slow"],
        "Ericaceae want a fungal, acid rhizosphere. Lime and juglone both break that.",
      ),
    ],
    "Needs low pH and ericoid mycorrhizae. Keep off walnut and off limed vegetable alleys.",
    ["walnut-black"],
    "field",
  ),
  pine: chem(
    "litter-recalcitrant",
    [tannin, cineole],
    "Needle litter acidifies and is slow to mineralize. Useful as blueberry mulch. Antagonistic with walnut (and with any sward you want to lime).",
    ["walnut-black"],
    "field",
  ),
  olive: chem(
    "facilitator",
    [oleuropein, ferulic, tannin, sugars],
    "Phenolic-rich evergreen litter (oleuropein in tissue). Drought-hard deep roots. Alleys work because of spacing and living pathways, not a documented olive→tomato exudate gift.",
    [],
    "mixed",
  ),
  paulownia: chem(
    "facilitator",
    [sugars, glutamate],
    "Deep roots skip surface water; huge leaf mulch is a fast N/C return. Often listed as a nitrogen fixer in grower literature — treat N input as litter quality, not confirmed Frankia/rhizobia.",
    [],
    "emerging",
  ),
  fig: chem(
    "facilitator",
    [sugars, ferulic],
    "Heat-loving Moraceae. Herb understory wins by outcompeting grass, not by a fig-specific allelochemical.",
    [],
    "emerging",
  ),
  hazel: chem(
    "amf-host",
    [strigolactone, sugars],
    "Ectomycorrhizal / truffle host on calcareous ground. Brassica isothiocyanates in the same bed are a real conflict.",
    ["daikon", "mustard", "horseradish"],
    "field",
  ),
  "oak-white": chem(
    "litter-recalcitrant",
    [tannin, oxalate, strigolactone],
    "High-tannin litter, ectomycorrhizae, vertical cation pump. Mast is the livestock transfer. Truffle chemistry is the fungal partner's, not the oak's vitamin list.",
    [],
    "field",
  ),
  asparagus: chem(
    "facilitator",
    [azelaic, saponin],
    "The walnut alley vegetable. Twenty-year stand. Saponins shape its own rhizosphere; it does not consume juglone so much as ignore mitochondrial uncoupling.",
    [],
    "mixed",
  ),
  "raspberry-black": chem(
    "facilitator",
    [ferulic, sugars],
    "Juglone-tolerant Rubus. Anthocyanins are a harvest trait. Fills the walnut understory without a chemical fight.",
    [],
    "mixed",
  ),
  currant: chem(
    "facilitator",
    [ferulic],
    "Shade-tolerant, juglone-tolerant enough for walnut edges. Vitamin C is in the fruit you pick, not a soil gift.",
    [],
    "mixed",
  ),
  tomato: chem(
    "amf-host",
    [strigolactone, malate],
    "Classic juglone casualty (Solanaceae). Fine in an olive or fruit alley; keep out of Juglans rhizosphere. AMF-responsive. Sorgoleone residue from a sorghum cover will set it back.",
    ["walnut-black", "walnut-english", "sorghum"],
    "field",
  ),
  eggplant: chem(
    "amf-host",
    [strigolactone],
    "Same Solanaceae juglone sensitivity as tomato.",
    ["walnut-black"],
    "field",
  ),
};

const DEFAULT_CHEM: Chemistry = chem(
  "neutral",
  [sugars, strigolactone],
  "Generalist rhizodeposition (sugars, amino acids) feeding microbial biomass. No standout allelochemical on file. Harvest vitamins stay in the crop — they do not move intact to neighbors.",
  [],
  "emerging",
);

CHEMISTRY.garlic = chem(
  "biofumigant",
  [
    x(
      "allicin / thiosulfinates",
      "alkaloid",
      ["litter", "root-exudate"],
      ["pathogen-suppress"],
      "Sulfur compounds bother borers and some soil microbes. Not a glucosinolate brassica, so AMF conflict is milder.",
    ),
  ],
  "Orchard allium. Useful as a trunk-ring pest cue; do not expect it to fumigate a bed the way mustard does.",
  [],
  "mixed",
);

CHEMISTRY.onion = chem(
  "facilitator",
  [
    x(
      "S-alk(en)yl cysteine sulfoxides",
      "amino-acid",
      ["litter"],
      ["pathogen-suppress"],
    "Walking onion is juglone-tolerant enough for walnut edges. Sulfur chemistry is mild.",
    ),
  ],
  "Permanent allium presence without replanting.",
  [],
  "emerging",
);

CHEMISTRY.willow = chem(
  "dynamic-accumulator",
  [salicylate(), sugars, glutamate],
  "Salicylates in tissue; wet-site nutrient pump and coppice browse. Holds banks. Litter is relatively fast.",
  [],
  "mixed",
);

function salicylate(): Exudate {
  return x(
    "salicylic acid / salicylates",
    "phenolic-acid",
    ["litter", "leachate"],
    ["pathogen-suppress", "allelopath-facilitate"],
    "Systemic signal in the donor; in litter it is a mild antimicrobial, not a walnut-scale toxin.",
  );
}

CHEMISTRY.elderberry = chem(
  "facilitator",
  [ferulic, sugars],
  "Wet-edge shrub. Anthocyanins are a harvest/medicine trait. Soil service is litter and habitat.",
  [],
  "emerging",
);

CHEMISTRY.mulberry = chem(
  "facilitator",
  [sugars, tannin],
  "Leaf is a complete-feeling fodder; fruit drops to poultry. Chemistry is nutritional for animals, not a rhizosphere vitamin pipe.",
  [],
  "mixed",
);

CHEMISTRY.truffle = chem(
  "fungi",
  [
    x(
      "mycorrhizal volatiles",
      "terpenoid",
      ["root-exudate"],
      ["amf-signal"],
      "The fungus, not the tree, is the crop. Needs a living host and a clean, high-pH brulé. Brassicas and tillage break it.",
    ),
  ],
  "Do not biofumigate a truffle row.",
  ["daikon", "mustard"],
  "field",
);

CHEMISTRY.shiitake = chem(
  "fungi",
  [
    x(
      "lentinan / fungal sterols",
      "terpenoid",
      ["litter"],
      ["pathogen-suppress"],
    "Lives on oak bolts, not in the orchard rhizosphere. Vitamin D after sun-drying is a harvest trait.",
    ),
  ],
  "Shade-yard decomposer. Does not inoculate the acre's nutrient ledger.",
  [],
  "field",
);

CHEMISTRY.winecap = chem(
  "fungi",
  [sugars],
  "Runs through chip mulch, lifting the soil food web under shrubs. A decomposer guild, not a vitamin donor.",
  [],
  "mixed",
);

CHEMISTRY.chicken = chem("livestock", [], "Manure is a mineral and N return, plus larval predation. No plant exudate.", [], "field");
CHEMISTRY.sheep = chem("livestock", [], "Grazing and dung. Chicory tannins in the sward are the chemical half of parasite management.", [], "field");
CHEMISTRY.cattle = chem("livestock", [], "Shade cuts heat stress; dung feeds the sward. Trees are the other half of the chemistry.", [], "field");
CHEMISTRY.pig = chem("livestock", [], "Mast finishers. Short pulses — they will mineralize a root zone if left.", [], "field");
CHEMISTRY.bee = chem("livestock", [], "Pollination. No rhizosphere role.", [], "field");
CHEMISTRY.duck = chem("livestock", [], "Slug predation and wet-site manure.", [], "field");
CHEMISTRY.goose = chem("livestock", [], "Living mower. Prefer grass to most crops.", [], "field");
CHEMISTRY.goat = chem("livestock", [], "Browser. Will eat the chemistry right off your fruit trees.", [], "field");
CHEMISTRY.rabbit = chem("livestock", [], "Cold manure onto beds. Feed them the comfrey you already grew.", [], "field");
CHEMISTRY.turkey = chem("livestock", [], "Mast and ticks.", [], "field");
CHEMISTRY.guinea = chem("livestock", [], "Tick and wasp patrol.", [], "field");
CHEMISTRY.alpaca = chem("livestock", [], "Soft pads, fiber, light graze.", [], "field");

// ── remaining woody fruit ────────────────────────────────
CHEMISTRY.peach = chem(
  "amf-host",
  [strigolactone, sugars, chlorogenic],
  "Rosaceous AMF host. Juglone-sensitive like apple. Chlorogenic acid is a harvest/tissue phenolic, not a soil gift.",
  ["walnut-black", "walnut-english"],
  "field",
);
CHEMISTRY.pear = chem(
  "amf-host",
  [strigolactone, sugars, ferulic],
  "Rosaceous AMF host. Classic juglone casualty — mitochondrial uncoupling under Juglans.",
  ["walnut-black", "walnut-english"],
  "field",
);
CHEMISTRY.plum = chem(
  "amf-host",
  [strigolactone, sugars],
  "Prunus. Same juglone sensitivity as apple. AMF-responsive orchard fruit.",
  ["walnut-black"],
  "field",
);
CHEMISTRY.cherry = chem(
  "amf-host",
  [strigolactone, sugars, quercetin],
  "Prunus. Quercetin is a fruit flavonol. Juglone-sensitive; keep off the walnut drip.",
  ["walnut-black"],
  "field",
);
CHEMISTRY.serviceberry = chem(
  "amf-host",
  [strigolactone, quercetin],
  "Amelanchier. Native rosaceous shrub. Juglone-cautious. Anthocyanins are a harvest trait.",
  ["walnut-black"],
  "mixed",
);
CHEMISTRY.persimmon = chem(
  "facilitator",
  [tannin, sugars],
  "Diospyros. Astringent tannins in unripe fruit are a harvest trait. Shade-tolerant under pecan and often listed as juglone-tolerant enough for a walnut edge.",
  [],
  "mixed",
);
CHEMISTRY.pawpaw = chem(
  "facilitator",
  [x("acetogenins", "alkaloid", ["litter"], ["pathogen-suppress"], "Annonaceous acetogenins are insecticidal in tissue. Understory fruit, not a rhizosphere vitamin.")],
  "Understory Annonaceae. Frequently planted on the walnut/pecan drip. Chemistry is defensive in the leaf, not a documented exudate gift.",
  [],
  "emerging",
);
CHEMISTRY.raspberry = chem(
  "facilitator",
  [ferulic, quercetin, sugars],
  "Red raspberry. Less juglone-tolerant than black raspberry — keep it off the densest Juglans drip. Anthocyanins are harvest chemistry.",
  ["walnut-black"],
  "mixed",
);
CHEMISTRY.blackberry = chem(
  "facilitator",
  [ferulic, tannin],
  "Rubus. Fills a sunny edge. Tannin-rich cane litter is slow. Not a documented walnut partner the way black raspberry is.",
  [],
  "emerging",
);
CHEMISTRY.gooseberry = chem(
  "facilitator",
  [ferulic],
  "Ribes. Shade-tolerant, juglone-tolerant enough for a walnut edge, like currant.",
  [],
  "mixed",
);
CHEMISTRY.aronia = chem(
  "facilitator",
  [quercetin, tannin],
  "Aronia. Extreme fruit polyphenols are a harvest trait. Soil service is a tough shrub and a phenolic litter.",
  [],
  "emerging",
);
CHEMISTRY.strawberry = chem(
  "amf-host",
  [strigolactone, sugars],
  "Fragaria. AMF-responsive, juglone-sensitive. Living pathway fruit — keep off Juglans and off a fresh mustard incorporation.",
  ["walnut-black"],
  "field",
);
CHEMISTRY.kiwi = chem(
  "amf-host",
  [strigolactone, sugars],
  "Actinidia. Vertical calories. Juglone-cautious; wants a living trellis that is not a walnut.",
  ["walnut-black"],
  "mixed",
);
CHEMISTRY.hops = chem(
  "facilitator",
  [lupulin, ferulic],
  "Humulus. Bitter acids are cone chemistry. The vine is a living screen; it does not dose the soil with beer.",
  [],
  "emerging",
);
CHEMISTRY.pomegranate = chem(
  "facilitator",
  [punicalagin, tannin, sugars],
  "Punicalagins are fruit ellagitannins. Dryland shrub. Soil service is shade and a phenolic litter, not a vitamin drip.",
  [],
  "mixed",
);
CHEMISTRY.jujube = chem(
  "facilitator",
  [sugars, ferulic],
  "Ziziphus. Deep-rooted dryland fruit. No standout allelochemical on file. Harvest sugar and vitamin C stay in the fruit.",
  [],
  "emerging",
);

// ── herbs, covers, alleys ────────────────────────────────
CHEMISTRY.oregano = chem(
  "facilitator",
  [carvacrol, thymol, sugars],
  "Carvacrol-rich living mulch. Monoterpenes suppress some germinating grasses under fig and olive. Harvest oil stays in the leaf.",
  [],
  "mixed",
);
CHEMISTRY.thyme = chem(
  "facilitator",
  [thymol, cineole],
  "Thymol carpet on dry ground. Same Lamiaceae logic as oregano — niche occupancy plus a mild antimicrobial litter.",
  [],
  "mixed",
);
CHEMISTRY.rosemary = chem(
  "facilitator",
  [cineole, camphor],
  "1,8-cineole and camphor. Evergreen dry-edge shrub. Litter is slow; do not expect it to feed a tomato.",
  [],
  "mixed",
);
CHEMISTRY.lavender = chem(
  "facilitator",
  [cineole, camphor],
  "Linalool/cineole volatiles. Holds dry ground and bees. Chemistry is aromatic defense, not a soil amendment.",
  [],
  "mixed",
);
CHEMISTRY.mint = chem(
  "allelopath",
  [menthol],
  "Menthol/menthone plus aggressive stolons. Contain it. The chemistry is defensive; the invasion is physical.",
  [],
  "field",
);
CHEMISTRY.sage = chem(
  "facilitator",
  [camphor, cineole],
  "Culinary Salvia. Camphor-leaning monoterpenes. Dry-edge companion, not a mineral miner.",
  [],
  "emerging",
);
CHEMISTRY.basil = chem(
  "facilitator",
  [eugenol],
  "Eugenol and linalool. Classic tomato pairing is insectary and culinary, not a documented exudate transfer.",
  [],
  "emerging",
);
CHEMISTRY.fennel = chem(
  "allelopath",
  [anethole],
  "trans-Anethole can suppress nearby annuals. Give fennel its own edge. Do not mix into a tight herb row.",
  [],
  "mixed",
);
CHEMISTRY.nasturtium = chem(
  "biofumigant",
  [
    x(
      "glucotropaeolin → benzyl isothiocyanate",
      "glucosinolate",
      ["litter", "root-exudate"],
      ["pathogen-suppress"],
      "Tropaeolaceae, not a brassica, but the same myrosinase chemistry. A living trap crop. Milder AMF conflict than mustard — still keep it as an edge, not chopped into a truffle row.",
    ),
  ],
  "Aphid sink and a peppery edible. Isothiocyanates are real; density decides whether they are a tool or a problem.",
  [],
  "mixed",
);
CHEMISTRY.echinacea = chem(
  "facilitator",
  [alkamide, chlorogenic],
  "Alkamides are root/medicine chemistry. Field service is a late-summer insectary on the dry edge.",
  [],
  "emerging",
);
CHEMISTRY.calendula = chem(
  "facilitator",
  [chlorogenic, sugars],
  "Calendic acid and phenolics in the flower. Self-sowing insectary. Not a mineral miner on the comfrey scale.",
  [],
  "emerging",
);
CHEMISTRY.sunflower = chem(
  "allelopath",
  [heliannuol, chlorogenic],
  "Heliannuols and phenolic acids suppress some weeds and small-seeded neighbors. A second trellis and a seed crop. Keep lettuce-scale seedlings out of fresh residue.",
  [],
  "field",
);
CHEMISTRY.sunchoke = chem(
  "facilitator",
  [chlorogenic, sugars],
  "Helianthus tuberosus. Inulin is a harvest carbohydrate. Spreads by tuber — manage it as a pig-harvest patch, not a polite border.",
  [],
  "emerging",
);
CHEMISTRY.squash = chem(
  "amf-host",
  [strigolactone, sugars],
  "Living mulch of the three sisters. The win is ground coverage and AMF, not a squash-specific allelochemical.",
  [],
  "mixed",
);
CHEMISTRY.daffodil = chem(
  "facilitator",
  [lycorine],
  "Lycorine keeps voles off trunks. A ring, not a mulch crop. Poisonous — keep it out of the fodder.",
  [],
  "field",
);
CHEMISTRY.rhubarb = chem(
  "facilitator",
  [oxalate, malate],
  "Petiole crop. Oxalate is a harvest caution (leaves) and a local P-mobilizer in the root zone. Not a comfrey-scale miner.",
  [],
  "emerging",
);
CHEMISTRY.switchgrass = chem(
  "facilitator",
  [dimboa, sugars],
  "C4 forage that persists in filtered light. Benzoxazinoids at sward density are microbiome shapers, not a walnut-scale toxin.",
  [],
  "mixed",
);

// ── trees, windbreaks ────────────────────────────────────
CHEMISTRY.cedar = chem(
  "litter-recalcitrant",
  [thujone, cineole, tannin],
  "Thujone- and cineole-rich litter. A windbreak and a dry-edge, not an understory nurse. Keep vegetables off the drip.",
  [],
  "field",
);
CHEMISTRY.maple = chem(
  "facilitator",
  [sugars, ferulic],
  "One of the few canopy trees often listed as juglone-tolerant. Stemflow is a sugar pulse in spring. Litter is moderate.",
  [],
  "mixed",
);
CHEMISTRY.bamboo = chem(
  "dynamic-accumulator",
  [silica, sugars],
  "Phytolith silica and a fast coppice C pulse. Running types are a containment problem. Soil service is biomass, not a vitamin.",
  [],
  "mixed",
);
CHEMISTRY.leucaena = chem(
  "n-fixer-legume",
  [mimosine, luteolin, glutamate, tannin],
  "Tropical N-fixer. Mimosine is a toxic amino-acid analog — inhibits germination of many understories and is dangerous to non-adapted livestock (ruminants with Synergistes jonesii can detoxify). Manage as coppice fodder only with adapted animals and a compatible floor.",
  [],
  "field",
);
CHEMISTRY.eucalyptus = chem(
  "allelopath",
  [cineole, tannin, ferulic],
  "1,8-cineole and phenolics in litter and leachate. Strong soil-chemistry shifter in pure stands. Pairing with an N-fixer (leucaena, acacia, alder analog) is the documented mitigation — do not underplant a vegetable alley.",
  [],
  "field",
);
CHEMISTRY.morel = chem(
  "fungi",
  [
    x(
      "fungal sterols",
      "terpenoid",
      ["litter"],
      ["pgpr-recruit"],
      "A spring gift on woody edges, not a farmed inoculant you can count on. Saprotroph / complex associate — not a vitamin donor.",
    ),
  ],
  "Leave woody debris. Do not till the oak–maple edge.",
  [],
  "emerging",
);
CHEMISTRY.avocado = chem(
  "amf-host",
  [sugars, citrate],
  "Shallow, drought-and-wet sensitive feeder roots. AMF dependent. No intact vitamin transfer. Dies in ponded June water — the chemistry does not matter if the roots drown.",
  [],
  "mixed",
);
CHEMISTRY.mango = chem(
  "amf-host",
  [sugars],
  "AMF host. Allelopathy is not the story; wet feet and frost are.",
  [],
  "mixed",
);
CHEMISTRY.citrus = chem(
  "amf-host",
  [citrate, sugars],
  "AMF host. Phytophthora and greening dominate the management, not exudate pairing. Lemongrass at the drip is an edge, not a cure.",
  [],
  "field",
);
CHEMISTRY.guava = chem(
  "amf-host",
  [sugars, tannin],
  "A myrtle without eucalyptus cineole load. Fruit-fly pressure is the tax. Do not inherit river-red-gum chemistry.",
  [],
  "mixed",
);
CHEMISTRY.feijoa = chem(
  "amf-host",
  [sugars],
  "Cooler myrtle. Same warning: not a cineole allelopath.",
  [],
  "mixed",
);
CHEMISTRY.loquat = chem(
  "amf-host",
  [sugars],
  "Rosaceous but heat-tolerant. Fireblight possible; not a juglone maker.",
  [],
  "mixed",
);
CHEMISTRY["pigeon-pea"] = chem(
  "n-fixer-legume",
  [genistein, daidzein, glutamate, citrate],
  "Tropical nurse. Flavonoid nodulation plus a short-lived woody N pulse. Coppice onto the mound. This is the clover analog that survives a Florida summer.",
  [],
  "field",
);
CHEMISTRY["perennial-peanut"] = chem(
  "n-fixer-legume",
  [daidzein, luteolin, glutamate],
  "Rhizoma Arachis. The living mulch that actually persists on Pasco sand. Nodulates; does not replace a tree nurse, it is the floor.",
  [],
  "field",
);
CHEMISTRY.sesbania = chem(
  "n-fixer-legume",
  [luteolin, glutamate],
  "Wet-soil N-fixer. Use in the slough. Some Sesbania (S. punicea) are invasive in Florida — plant S. sesban, not the ornamental.",
  [],
  "mixed",
);
CHEMISTRY.inga = chem(
  "n-fixer-legume",
  [luteolin, glutamate, sugars],
  "Inga alley-cropping chemistry is tropical and wet. Frost-killed in 9b. Do not count on it in Pasco.",
  [],
  "field",
);
CHEMISTRY.passionfruit = chem(
  "amf-host",
  [sugars],
  "Hungry vine. Needs a living support. No special allelochemistry.",
  [],
  "mixed",
);
CHEMISTRY.muscadine = chem(
  "amf-host",
  [sugars, tannin],
  "The Gulf grape. Thick-skinned, Pierce’s-tolerant. Same living-trellis logic as vinifera without the disease.",
  [],
  "field",
);
CHEMISTRY["pine-slash"] = chem(
  "litter-recalcitrant",
  [tannin, ferulic],
  "Acid needle duff. Useful over southern highbush; antagonistic to anything that wants lime.",
  [],
  "field",
);
CHEMISTRY["oak-live"] = chem(
  "amf-host",
  [tannin, sugars],
  "Evergreen oak litter is slower than deciduous. Mast, not allelopathy, is the livestock story.",
  [],
  "mixed",
);
CHEMISTRY["blueberry-south"] = chem(
  "amf-host",
  [ferulic, tannin],
  "Ericoid mycorrhizae, not AMF. Needs acid fungal soil. Same chemistry class as northern highbush, different chill.",
  [],
  "field",
);
CHEMISTRY["bamboo-clump"] = chem(
  "dynamic-accumulator",
  [silica, sugars],
  "Clumping Bambusa. Silica and a C pulse without the running-rhizome problem of moso.",
  [],
  "mixed",
);
CHEMISTRY.lemongrass = chem(
  "facilitator",
  [x("citral", "terpenoid", ["volatile", "litter"], ["pathogen-suppress"], "Leaf oil. An edge plant, not a soil vitamin.")],
  "Aromatic edge around citrus. Do not confuse a kitchen oil with a rhizosphere service.",
  [],
  "mixed",
);
CHEMISTRY.longan = chem(
  "amf-host",
  [sugars],
  "Sapindaceae fruit. Not a maple. Frost and wet feet are the limits, not allelopathy.",
  [],
  "mixed",
);
CHEMISTRY.lychee = chem(
  "amf-host",
  [sugars],
  "Needs a mild winter chill to flower and hates ponding. Marginal in Pasco.",
  [],
  "mixed",
);

const FAMILY_DEFAULTS: Record<string, Chemistry> = {
  Fabaceae: CHEMISTRY["clover-white"],
  Brassicaceae: CHEMISTRY.daikon,
  Juglandaceae: CHEMISTRY.pecan,
  Poaceae: CHEMISTRY.corn,
  Rosaceae: CHEMISTRY.apple,
  Fagaceae: CHEMISTRY.chestnut,
  Betulaceae: CHEMISTRY.hazel,
  Elaeagnaceae: CHEMISTRY.goumi,
  Lamiaceae: CHEMISTRY.oregano,
  Asteraceae: CHEMISTRY.yarrow,
  Pinaceae: CHEMISTRY.pine,
  Ericaceae: CHEMISTRY.blueberry,
  Moraceae: CHEMISTRY.fig,
  Oleaceae: CHEMISTRY.olive,
  Vitaceae: CHEMISTRY.grape,
  Cupressaceae: CHEMISTRY.cedar,
  Salicaceae: CHEMISTRY.willow,
  Solanaceae: CHEMISTRY.tomato,
  Amaryllidaceae: CHEMISTRY.garlic,
  Lythraceae: CHEMISTRY.pomegranate,
  Rhamnaceae: CHEMISTRY.jujube,
  Cucurbitaceae: CHEMISTRY.squash,
  Grossulariaceae: CHEMISTRY.currant,
  Plantaginaceae: CHEMISTRY["plantain-forage"],
  Apiaceae: CHEMISTRY.fennel,
  Polygonaceae: CHEMISTRY.buckwheat,
  Paulowniaceae: CHEMISTRY.paulownia,
  Ebenaceae: CHEMISTRY.persimmon,
  Annonaceae: CHEMISTRY.pawpaw,
  Tropaeolaceae: CHEMISTRY.nasturtium,
  Asparagaceae: CHEMISTRY.asparagus,
  Boraginaceae: CHEMISTRY.comfrey,
  Urticaceae: CHEMISTRY.nettle,
  Cannabaceae: CHEMISTRY.hops,
  Actinidiaceae: CHEMISTRY.kiwi,
  Sapindaceae: CHEMISTRY.maple,
  Viburnaceae: CHEMISTRY.elderberry,
  Myrtaceae: CHEMISTRY.guava,
  Rutaceae: CHEMISTRY.citrus,
  Lauraceae: CHEMISTRY.avocado,
  Anacardiaceae: CHEMISTRY.mango,
  Passifloraceae: CHEMISTRY.passionfruit,
  Bromeliaceae: CHEMISTRY.passionfruit,
  Zingiberaceae: CHEMISTRY.lemongrass,
};

export function getChemistry(sp: Species): Chemistry {
  return (
    CHEMISTRY[sp.id] ??
    FAMILY_DEFAULTS[sp.family] ??
    DEFAULT_CHEM
  );
}

export function farmChemistry(species: Species[]): ChemSnapshot {
  const roles = new Set<ChemRole>();
  const compoundMap = new Map<string, { name: string; klass: CompoundClass; species: string[] }>();
  const mechanisms: string[] = [];

  for (const sp of species) {
    if (sp.kind === "animal") continue;
    const c = getChemistry(sp);
    if (c.soilEffects) mechanisms.push(`${sp.name}: ${c.soilEffects}`);
    for (const e of c.exudates) {
      for (const r of e.roles) roles.add(r);
      const cur = compoundMap.get(e.name) ?? { name: e.name, klass: e.klass, species: [] };
      if (!cur.species.includes(sp.name)) cur.species.push(sp.name);
      compoundMap.set(e.name, cur);
    }
  }

  const rolesPresent = CHEM_ROLES.filter((r) => roles.has(r));
  const priorityMissing: ChemRole[] = (
    ["n-fixation-signal", "n-transfer", "p-mobilizer", "amf-signal", "mineral-return"] as ChemRole[]
  ).filter((r) => !roles.has(r));

  const bits = [
    roles.has("n-fixation-signal") || roles.has("n-transfer"),
    roles.has("p-mobilizer") || roles.has("fe-mobilizer"),
    roles.has("amf-signal") || roles.has("pgpr-recruit"),
    roles.has("mineral-return"),
    !roles.has("allelopath-inhibit") || species.some((s) => getChemistry(s).group === "facilitator"),
    new Set(species.filter((s) => s.kind === "plant").map((s) => getChemistry(s).group)).size >= 3,
  ];
  const score = species.length === 0 ? 0 : Math.round((bits.filter(Boolean).length / bits.length) * 100);

  return {
    score,
    rolesPresent,
    rolesMissing: priorityMissing,
    compounds: [...compoundMap.values()].sort((a, b) => b.species.length - a.species.length),
    mechanisms: mechanisms.slice(0, 8),
  };
}

function hasJuglone(c: Chemistry): boolean {
  return c.exudates.some((e) => e.klass === "naphthoquinone");
}

function hasMimosine(c: Chemistry): boolean {
  return c.exudates.some((e) => e.name.toLowerCase().includes("mimosine"));
}

function hasCineoleLoad(c: Chemistry): boolean {
  return (
    c.group === "allelopath" &&
    c.exudates.some((e) => e.name.includes("cineole") || e.name.includes("1,8-cineole"))
  );
}

export function chemicalConflict(a: Species, b: Species): string | null {
  const ca = getChemistry(a);
  const cb = getChemistry(b);

  if (ca.sensitiveTo.includes(b.id)) {
    const toxin = cb.exudates.find((e) => e.roles.includes("allelopath-inhibit"));
    return `${a.name} is documented-sensitive to ${b.name}${toxin ? ` (${toxin.name})` : ""}. Keep their rhizospheres apart, or drop one.`;
  }
  if (cb.sensitiveTo.includes(a.id)) {
    const toxin = ca.exudates.find((e) => e.roles.includes("allelopath-inhibit"));
    return `${b.name} is documented-sensitive to ${a.name}${toxin ? ` (${toxin.name})` : ""}. Overlapping roots will show it.`;
  }

  if (hasJuglone(cb) && JUGLONE_SENSITIVE.includes(a.id)) {
    return `${a.name} is documented-sensitive to juglone (5-hydroxy-1,4-naphthoquinone) from ${b.name}. Mitochondrial uncoupling in the overlapping rhizosphere — plant a tolerant partner or move one.`;
  }
  if (hasJuglone(ca) && JUGLONE_SENSITIVE.includes(b.id)) {
    return `${b.name} is documented-sensitive to juglone from ${a.name}. Keep Solanaceae, most Rosaceae, and pines out of this drip line.`;
  }

  const aBrassica = ca.group === "biofumigant" && ca.exudates.some((e) => e.klass === "glucosinolate");
  const bHost = cb.group === "amf-host" || cb.group === "fungi" || cb.exudates.some((e) => e.roles.includes("amf-signal"));
  if (aBrassica && bHost) {
    return `${a.name} releases isothiocyanates that suppress AMF. ${b.name} wants that fungal network — separate them in time or space.`;
  }
  const bBrassica = cb.group === "biofumigant" && cb.exudates.some((e) => e.klass === "glucosinolate");
  const aHost = ca.group === "amf-host" || ca.group === "fungi" || ca.exudates.some((e) => e.roles.includes("amf-signal"));
  if (bBrassica && aHost) {
    return `${b.name} is a biofumigant. ${a.name} is AMF-dependent — do not chop mustard into that root zone.`;
  }

  if (hasMimosine(ca) && b.kind === "plant" && b.layer !== "canopy") {
    return `${a.name} exudes mimosine, a toxic amino-acid analog. ${b.name} is a likely germination/growth casualty unless it is a documented companion.`;
  }
  if (hasMimosine(cb) && a.kind === "plant" && a.layer !== "canopy") {
    return `${b.name} exudes mimosine. ${a.name} does not belong in that understory without a cited tolerance.`;
  }

  if (hasCineoleLoad(ca) && ["herb", "groundcover", "root"].includes(b.layer) && cb.group !== "n-fixer-legume") {
    return `${a.name} litter is loaded with 1,8-cineole. ${b.name} will sit in a hydrophobic, slow-to-decompose mulch — pair eucalypts with an N-fixer, not a vegetable.`;
  }
  if (hasCineoleLoad(cb) && ["herb", "groundcover", "root"].includes(a.layer) && ca.group !== "n-fixer-legume") {
    return `${b.name} cineole litter fights ${a.name}. Mitigate with a nitrogen-fixing understory, or keep the vegetable alley elsewhere.`;
  }

  return null;
}

export function chemicalSynergy(a: Species, b: Species): string | null {
  const ca = getChemistry(a);
  const cb = getChemistry(b);
  const groups = new Set([ca.group, cb.group]);

  if (
    (groups.has("n-fixer-legume") || groups.has("n-fixer-actinorhizal")) &&
    (groups.has("amf-host") || groups.has("facilitator") || groups.has("p-mobilizer"))
  ) {
    const fixer = ca.group.startsWith("n-fixer") ? a : b;
    const partner = fixer === a ? b : a;
    const flava = getChemistry(fixer).exudates.find((e) => e.roles.includes("n-fixation-signal"));
    return `${fixer.name} supplies N via ${flava ? flava.name + " nod-signals and " : ""}rhizodeposition / litter. ${partner.name} is a sink for that N, often through a common mycelial network — not a vitamin drip.`;
  }
  if (groups.has("p-mobilizer") && (groups.has("n-fixer-legume") || groups.has("amf-host"))) {
    return `Organic acids (citrate, malate) from the P-mobilizer lift labile phosphate; the neighbor can take it up via roots or hyphae. This is chelation, not companionship folklore.`;
  }
  if (groups.has("dynamic-accumulator") && (groups.has("amf-host") || groups.has("n-fixer-legume") || groups.has("facilitator"))) {
    return `Chop-and-drop returns concentrated K, Ca, Si after microbes process the mulch. The neighbor synthesizes its own antioxidants once mineral nutrition improves.`;
  }
  if (
    (hasJuglone(ca) && JUGLONE_TOLERANT.includes(b.id)) ||
    (hasJuglone(cb) && JUGLONE_TOLERANT.includes(a.id))
  ) {
    return `Juglone-tolerant partner. The walnut keeps producing 5-hydroxy-1,4-naphthoquinone; this neighbor simply does not uncouple.`;
  }
  if (groups.has("litter-recalcitrant") && (groups.has("n-fixer-legume") || groups.has("n-fixer-actinorhizal"))) {
    return `Slow phenolic/tannin litter plus a biological N input. Mixed litter balances mineralization timing — the N-fixer offsets the immobilization the tannins cause.`;
  }
  if (groups.has("allelopath") && (groups.has("n-fixer-legume") || groups.has("n-fixer-actinorhizal"))) {
    const allelopath = ca.group === "allelopath" ? a : b;
    const fixer = allelopath === a ? b : a;
    return `${fixer.name} is the documented mitigation for a strong chemical interactor like ${allelopath.name}: N input and a livelier microbiome help degrade allelochemicals and keep the floor alive.`;
  }
  if (
    (a.id === "chicory" && b.kind === "animal") ||
    (b.id === "chicory" && a.kind === "animal")
  ) {
    return `Chicory sesquiterpene lactones and condensed tannins are anthelmintic in the animal, not a soil vitamin. The sward chemistry is half of parasite management.`;
  }
  return null;
}

/** Compound names + classes for search and guild chips. */
export function chemistryHaystack(sp: Species): string {
  const c = getChemistry(sp);
  return [
    c.group,
    c.soilEffects,
    ...c.exudates.flatMap((e) => [e.name, e.klass, e.note, ...e.roles, ...e.routes]),
  ]
    .join(" ")
    .toLowerCase();
}

export function namedCompoundsFor(ids: string[], resolve: (id: string) => Species | undefined) {
  const map = new Map<string, { name: string; klass: CompoundClass }>();
  for (const id of ids) {
    const sp = resolve(id);
    if (!sp) continue;
    for (const e of getChemistry(sp).exudates) {
      if (!map.has(e.name)) map.set(e.name, { name: e.name, klass: e.klass });
    }
  }
  return [...map.values()];
}
