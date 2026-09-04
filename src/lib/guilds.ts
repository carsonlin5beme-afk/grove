import type { FarmSystem } from "./types";

export interface Guild {
  id: string;
  name: string;
  system: FarmSystem;
  zone: string;
  members: string[];
  hook: string;
  ecology: string;
  chemistry: string;
  succession: string;
  cautions: string;
  nutrients: string;
}

export const GUILDS: Guild[] = [
  {
    id: "chestnut-stack",
    name: "Chestnut canopy stack",
    system: "food-forest",
    zone: "4–8",
    members: ["chestnut", "apple", "grape", "blueberry", "alder", "bean-runner", "nasturtium", "clover-white"],
    hook: "The system from the Solarity Acres film: replace a corn row with a forest that out-yields it.",
    ecology:
      "Chestnut is the calorie canopy. Apple fills the subcanopy. Grapes use the trunks as trellises. Blueberries take the acidic east drip line. Alder (Frankia) and runner beans (Rhizobium) fix nitrogen while the trees are young. Nasturtium is a living trap crop. Clover carpets the floor.",
    chemistry:
      "Chestnut condensed tannins slow N mineralization — a leach buffer, not a vitamin donor. Alder rhizodeposits N-rich compounds without flavonoid NodD signaling (Frankia, not rhizobia). Runner bean and clover exude genistein, daidzein, and formononetin that induce nod genes; mixed litter and, where present, a common mycelial network move that N to the apple and chestnut. Both fruit trees are AMF hosts (strigolactones). Nasturtium hydrolyzes glucotropaeolin to benzyl isothiocyanate — keep it as an edge trap, not chopped into the AMF drip line. Blueberry ericoid phenolics want acid fungal soil; do not lime them with the apples.",
    succession:
      "Years 1–4: beans, nasturtium, and clover pay in food and nod-signals. Years 5–8: apples and grapes come on. Year 8+: chestnuts begin to mast and the alder is coppiced or ring-barked as a nurse that has done its job.",
    cautions:
      "Chestnut blight still exists — plant Chinese or well-bred hybrids. Blueberries demand acid mulch. Do not add a brassica biofumigant (mustard, daikon) to this AMF-heavy stack. Keep the block off any walnut drip — apple, grape, and blueberry are all juglone-sensitive.",
    nutrients:
      "Harvest: chestnut carbohydrate, apple/grape polyphenols, blueberry anthocyanins and manganese, bean protein. Soil: N via rhizodeposition and litter, not intact vitamins moving plant-to-plant. The trees synthesize their own ascorbate once mineral nutrition is in place.",
  },
  {
    id: "apple-chicken",
    name: "Apple–chicken silvopasture",
    system: "silvopasture",
    zone: "3–8",
    members: ["apple", "chicken", "comfrey", "clover-white", "nasturtium", "daffodil", "bee"],
    hook: "The oldest orchard partnership still in use: birds clean the floor, trees house the birds.",
    ecology:
      "Chickens eat dropped fruit and the larvae living in it, which breaks the life cycle of apple maggot and plum curculio. They scratch for ticks and leave mineral-rich manure on the drip line. Trees give shade, winter windbreak, and hawk cover. Comfrey is chopped onto the same drip line. Daffodils keep voles off the trunks.",
    chemistry:
      "No plant-to-plant vitamin transfer. Apple is an AMF host (strigolactones) and juglone-intolerant. Clover isoflavonoids (genistein, formononetin, biochanin A) drive nodulation; rhizodeposited glutamate is a documented N-transfer path. Comfrey is a dynamic accumulator — K, Ca, Si, P in the leaf — and those minerals become available only after microbes process the mulch. Daffodil lycorine is a vole-guard alkaloid, not a fertilizer. Chicken manure is a mineral and labile-N return. Nasturtium isothiocyanates stay at the edge.",
    succession:
      "Year 1: plant trees, daffodil rings, clover. Year 2: add the flock on a rotation, never on bark-tender whips. Year 4+: fruit and eggs in the same footprint.",
    cautions:
      "Do not let birds strip young bark. Move the tractor so the floor does not go to dirt. Keep this guild far from black walnut — apple uncouples under juglone. Foxes and hawks still exist — give a hut.",
    nutrients:
      "Harvest: fruit polyphenols plus complete protein, B12, and choline from eggs. Soil: mineral N, K, and Ca after microbial processing. The combination covers nutrients a plant-only orchard cannot eat — that is the flock, not a soil vitamin pipe.",
  },
  {
    id: "olive-alley",
    name: "Olive alley with empress nurse",
    system: "alley",
    zone: "8–10",
    members: ["olive", "paulownia", "tomato", "eggplant", "basil", "oregano", "clover-white"],
    hook: "Quinto Sapore's pattern: evergreen rows, annual alleys, a deep-rooted nurse that does not steal surface water.",
    ecology:
      "Olives hold the permanent rows and make oil. Tomatoes and eggplants fill the alleys and pay the farm for the decade the olives are young. Paulownia roots deeper than the vegetables and drops a fast leaf mulch. Living pathways of clover and oregano hold soil between the cash rows.",
    chemistry:
      "Olive oleuropein and ferulic acid are phenolic litter, not a tomato gift. Paulownia is a deep-root litter pump (sugars, glutamate, fast N/C) — treat N input as litter quality, not a confirmed Frankia or rhizobial nodule. Tomato and eggplant are AMF hosts (strigolactones); they are fine here and fatal under juglone. Clover genistein/daidzein in the living pathway. Oregano carvacrol and thymol suppress some germinating grasses. Basil eugenol/linalool is a pest-cue and a culinary oil, not an exudate transfer to tomato.",
    succession:
      "Years 1–7: alleys are the income. Year 8+: olives close and the annuals shrink to the sunniest gaps, or shift to shade-tolerant herbs. Coppice paulownia for timber or keep it as a tall nurse.",
    cautions:
      "Paulownia can be weedy in the American South — manage suckers. Olives need heat units; this guild fails north of zone 8 without a wall. Do not drop a mustard cover into the tomato alley the same season you want AMF colonization.",
    nutrients:
      "Harvest: oleuropein and vitamin E from oil, lycopene/carotenoids from tomato, phenolic oils from the herb floor. Soil: nod-signals, carvacrol litter, and a fast leaf mulch. Mediterranean pantry, not a vitamin pipeline between rows.",
  },
  {
    id: "walnut-asparagus",
    name: "Walnut polycrop",
    system: "polycrop",
    zone: "4–8",
    members: ["walnut-black", "asparagus", "raspberry-black", "currant", "garlic"],
    hook: "Do not fight juglone. Plant the few things that ignore it, and take timber, nuts, and a 20-year vegetable.",
    ecology:
      "Black walnut releases hydrojuglone glycoside that oxidizes in aerated soil to juglone (5-hydroxy-1,4-naphthoquinone). Asparagus, black raspberry, and currant tolerate it. The result looks sparse on paper and abundant in May: spears, then berries, then nuts, then veneer-grade timber.",
    chemistry:
      "Juglone uncouples mitochondrial electron transport in sensitive neighbors (apple, tomato, pine, blueberry, grape, most Prunus). Effects are concentration- and SOM-dependent — high organic matter accelerates microbial degradation. Asparagusic acid and steroidal saponins shape the fern's own rhizosphere; the plant does not consume juglone, it simply does not uncouple. Black raspberry and currant are similarly tolerant. Garlic thiosulfinates (allicin) are a pest cue, not a glucosinolate AMF bomb. Ferulic acid and condensed tannins in walnut litter slow N mineralization.",
    succession:
      "Asparagus is the early cash. Berries fill years 2–12. Walnuts dominate after year 15. The vegetable does not mind the growing shade as much as a tomato would.",
    cautions:
      "Keep this block isolated from the apple orchard. Hulls and leaves are still toxic in the compost if you dump them on sensitive beds. Raising SOM (compost, mixed litter) is the practical way to shorten juglone half-life — not a miracle companion.",
    nutrients:
      "Harvest: walnut omega-3, asparagus folate and K, black-raspberry anthocyanins. Soil: a naphthoquinone gradient, not a vitamin gradient. Together they cover fats the chestnut guild does not.",
  },
  {
    id: "fig-herb",
    name: "Fig and herb understory",
    system: "food-forest",
    zone: "7–10",
    members: ["fig", "oregano", "thyme", "lavender", "rosemary", "chicken"],
    hook: "Juntos Farm's quiet pattern: a heat-loving fruit over a carpet that outcompetes grass and sells as a second crop.",
    ecology:
      "Figs ask for heat and drainage and give fruit for months. Culinary herbs suppress the grass that would steal water, pull pollinators, and make a cash bouquet while the figs establish. Chickens clean dropped fruit and ignore most of the oils in the herbs.",
    chemistry:
      "Fig has no documented allelochemical that feeds herbs. The win is niche occupancy. Lamiaceae monoterpenes — carvacrol, thymol, 1,8-cineole, camphor — suppress some germinating grasses and shape a dry, aromatic litter. Those oils stay in the leaf; they are not a soil vitamin. Chicken manure is the mineral return. Keep mint out of this mix or it will occupy every damp niche with menthol and stolons.",
    succession:
      "Herbs produce in year one. Figs in year three. The understory stays — this is not a system that phases the annuals out.",
    cautions:
      "Figs die to the ground in a hard zone-7 winter; mulch the crown or pick a hardy selection. Herbs rot in wet clay — gravel them. Fennel (anethole) does not belong in this tight herb row.",
    nutrients:
      "Harvest: fig minerals (K, Ca, Mg, fiber), herb vitamin K and phenolic oils, eggs for B12. Soil: monoterpene litter and manure minerals. No intact ascorbate moving fig to thyme.",
  },
  {
    id: "locust-cattle",
    name: "Honey locust pasture",
    system: "silvopasture",
    zone: "4–9",
    members: ["honey-locust", "switchgrass", "clover-white", "chicory", "plantain-forage", "cattle"],
    hook: "A high, ferny canopy that lets grass live, dropping sweet pods into a mineral-rich sward.",
    ecology:
      "Thornless honey locust is a nitrogen fixer with an open crown. Switchgrass and a clover–chicory–plantain mix persist in the filtered light. Cattle loaf in the shade (gains rise as heat stress falls) and eat the pods as a late-season energy supplement.",
    chemistry:
      "Honey locust luteolin drives nodulation; the open canopy lets the sward photosynthesize. Clover formononetin and biochanin A support both rhizobia and AMF. Chicory sesquiterpene lactones and condensed tannins are anthelmintic in the animal — that is forage chemistry, not a soil vitamin. Plantain aucubin plus mineral-dense leaf. Switchgrass benzoxazinoids (DIMBOA-type) at sward density shape the microbiome without becoming a walnut-scale toxin. Dung is the mineral return; pods are the carbohydrate transfer.",
    succession:
      "Trees on a 30–40 ft grid. Protect trunks for 5–7 years. Full silvopasture once you can ride a horse under the first scaffold limbs.",
    cautions:
      "Use named thornless, podding cultivars. Seedlings will grow six-inch thorns and disappoint you. Never overstock a young stand. Pure alfalfa under the same canopy needs a bloat plan; this mixed sward is safer.",
    nutrients:
      "Harvest: ruminant protein and B12, plus the mineral density of a diverse sward. Pods add carbohydrate without a grain field. Soil: nod-signals, tannin-moderated N release, and a vertical mineral pump from chicory and plantain.",
  },
  {
    id: "oak-mast",
    name: "Oak mast wood",
    system: "silvopasture",
    zone: "4–8",
    members: ["oak-white", "pawpaw", "persimmon", "truffle", "pig", "shiitake"],
    hook: "A keystone tree, two native understory fruits, a luxury fungus, and a pig that harvests what you cannot.",
    ecology:
      "White oak hosts more insect life than almost any temperate tree. Pawpaw and persimmon take the shade. On limestone, inoculated oaks fruit truffles. Shiitake runs on the thinnings. Pigs flash-graze mast years and turn weevily acorns into pork.",
    chemistry:
      "Oak condensed tannins and oxalate: slow N litter, a vertical cation pump, ectomycorrhizae. Truffle chemistry is the fungal partner's metabolome (volatiles in the brulé), not the oak's vitamin list. Pawpaw acetogenins are insecticidal in tissue — understory fruit, not a rhizosphere gift. Persimmon tannins are a harvest trait. Shiitake is saprotrophic on oak bolts (lentinan, fungal sterols) — it does not inoculate the acre's nutrient ledger. Pigs mineralize mast; they do not belong on the brulé at harvest.",
    succession:
      "This is a 30-year farm. Shiitake and pawpaw are the early yields. Mast and truffle are the mature ones. Pigs are seasonal, never permanent.",
    cautions:
      "Pigs left too long will ring-bark and rototill roots. Hours, not weeks. Truffles need high pH and a clean brulé — brassica isothiocyanates in this row would collapse the partnership. They are not a year-two crop.",
    nutrients:
      "Harvest: acorn flour, persimmon vitamin A, pawpaw minerals, vitamin D from sun-dried mushrooms, complete protein from pork. Soil: tannin-paced N, ectomycorrhizal transfer, saprotrophic recycling on bolts. A woodland diet, not a vitamin pipe.",
  },
  {
    id: "riparian-duck",
    name: "Riparian edge",
    system: "food-forest",
    zone: "3–8",
    members: ["willow", "alder", "elderberry", "nettle", "duck", "winecap"],
    hook: "The wet corner you were going to ignore becomes the most productive strip on the farm.",
    ecology:
      "Willow and alder lock the bank, fix nitrogen, and coppice for biomass and browse. Elderberry and nettle are the medicine chest. Ducks eat slugs the chickens will not touch. Wine-cap mushrooms run through the chip you drop from the coppice.",
    chemistry:
      "Alder Frankia nodules plus high-quality N litter — actinorhizal, so flavonoid NodD signaling is less characterized than in legumes. Willow salicylates in tissue and leachate are a mild antimicrobial, not a walnut-scale toxin; the tree is a wet-site nutrient pump. Nettle is a documented Ca vertical pump: field trials show elevated topsoil Ca after chop-and-drop, with depletion deeper in the profile. Elder anthocyanins are harvest/medicine. Winecap is a saprotroph in chip — it lifts the soil food web; it does not donate vitamins.",
    succession:
      "Year 1: cuttings of willow and alder, elder, nettle patch. Year 2: ducks. Coppice on a 3-year rotation forever.",
    cautions:
      "Willow roots will find a water line. Site this on the feature, not beside the well house. Do not biofumigate a winecap bed.",
    nutrients:
      "Harvest: elder anthocyanins, nettle iron and calcium, duck protein and B12, fungal copper. Soil: Frankia N, salicylate litter, a real Ca pump. The wet-site map.",
  },
  {
    id: "three-sisters-grove",
    name: "Three sisters under a young canopy",
    system: "alley",
    zone: "4–8",
    members: ["chestnut", "corn", "bean-runner", "squash", "nasturtium", "sunflower"],
    hook: "The indigenous annual guild, used as a decade-long alley while the staple trees close.",
    ecology:
      "Corn is the trellis, beans the nitrogen, squash the living mulch. Sunflowers add a second trellis and a seed crop. Chestnuts rise through it and, around year eight, take the light.",
    chemistry:
      "The best-documented cereal–legume chemistry on the farm. Maize exudes DIMBOA (benzoxazinoids that shape the microbiome) and strigolactones (AMF). Runner bean exudes genistein, daidzein, and naringenin; mixed stands increase flavonoid exudation and nodulation versus monoculture. Soyasapogenol B and organic acids show up in mixed-stand metabolomes and correlate with higher cereal nutrient content. Squash is ground coverage and an AMF host — niche, not a unique allelochemical. Sunflower heliannuols suppress some weeds; keep small-seeded neighbors out of fresh residue. Chestnut tannin litter arrives later and will eventually replace the corn as the carbohydrate. Nasturtium isothiocyanates stay at the edge.",
    succession:
      "Full sisters in years 1–6. Partial shade sisters in 7–10. Canopy only after that, with clover left on the floor.",
    cautions:
      "This is a bridge, not a destination. If you keep tilling the sisters after the trees close, you are fighting the farm. Do not sow tiny seeds into fresh sunflower or rye residue.",
    nutrients:
      "Harvest: the sisters are a complete amino-acid and calorie set; chestnut eventually replaces the corn. Soil: nod-signals, DIMBOA-shaped microbiome, citrate/malate P lift from the bean. The cereal gets more mineral density because the rhizosphere changed — not because a vitamin jumped the row.",
  },
  {
    id: "medicinal-edge",
    name: "Medicine hedge",
    system: "food-forest",
    zone: "3–8",
    members: ["elderberry", "comfrey", "nettle", "echinacea", "yarrow", "calendula"],
    hook: "A hedge that is also a dispensary, an insectary, and a chop-and-drop engine.",
    ecology:
      "Elder on the wet end, echinacea and yarrow on the dry, comfrey and nettle as mineral mines, calendula self-sowing in the gaps. Hoverflies, wasps, and native bees work this strip and then go hunt in the orchard.",
    chemistry:
      "The highest mineral-return strip on the farm, and the easiest place to over-claim. Comfrey allantoin plus K/Ca/Si/P biomass — microbes must process the mulch. Nettle is a documented Ca pump (topsoil gain, subsoil depletion). Yarrow phenolics (ferulic) at path-edge density are signaling, not herbicidal; it also mines P, K, Ca. Echinacea alkamides are root/medicine chemistry; the field service is a late-summer insectary. Calendula chlorogenic acid and an insectary habit. Elder anthocyanins stay in the fruit. Dynamic-accumulator efficacy is emerging and context-dependent — this hedge is a hypothesis you can watch, not a certified fertilizer.",
    succession:
      "Fully online in year two. Coppice elder. Divide comfrey. Let calendula seed.",
    cautions:
      "Comfrey is for the soil and the animals, not a daily tea. Know your plant before you drink it. Do not expect intact vitamins to move from nettle into the apple next door.",
    nutrients:
      "Harvest: the highest anthocyanin and mineral density on the farm. Pair it with an egg or a nut and the edible map closes. Soil: chop-and-drop minerals after microbial processing.",
  },
  {
    id: "arid-mesquite",
    name: "Dryland mesquite",
    system: "silvopasture",
    zone: "7–11",
    members: ["mesquite", "olive", "pomegranate", "lavender", "sheep"],
    hook: "When rainfall is a rumor, plant the trees that drink from a deeper story.",
    ecology:
      "Mesquite fixes nitrogen and drops a protein-rich pod. Olive and pomegranate take the heat. Lavender holds the ground and the bees. Sheep browse what grass appears and leave the oils alone.",
    chemistry:
      "Mesquite luteolin (nod-signals) plus citrate on caliche — a deep-root N-fixer that also chelates P and Fe in high-pH soil. Pods are the transfer mechanism to livestock, not a vitamin pipe. Olive oleuropein/ferulic litter. Pomegranate punicalagins are fruit ellagitannins — harvest antioxidants, not a soil amendment. Lavender 1,8-cineole and camphor hold the dry floor. Sheep dung is the mineral return. On this site the limiting resources are water and locked P; the chemistry is built to address both.",
    succession:
      "All of these are slow and then permanent. Pods and herbs first; oil and arils as the canopy settles.",
    cautions:
      "Mesquite is a regulated weed in some counties. Check before you plant. Sheep still need shade and water you must provide. Do not add leucaena to this mix unless you have mimosine-adapted ruminants.",
    nutrients:
      "Harvest: pod protein, olive fats and vitamin E, pomegranate punicalagins. Soil: flavonoid nodulation, citrate P-mobilization, phenolic litter. A desert pantry.",
  },
  {
    id: "hazel-truffle",
    name: "Hazel and truffle row",
    system: "polycrop",
    zone: "6–8",
    members: ["hazel", "truffle", "comfrey", "clover-white", "chicken"],
    hook: "A nut hedge that can out-earn the rest of the farm if the fungus takes.",
    ecology:
      "Hazel coppices, yields in year four, and on calcareous, well-drained ground will host Périgord or Burgundy truffle. Comfrey and clover feed the soil food web the fungus wants. Chickens work the floor for insects but are locked out at harvest so they do not steal the prize.",
    chemistry:
      "The fungus, not the tree, is the crop. Hazel is an ectomycorrhizal host (strigolactones and a living root). Truffle volatiles define the brulé. Clover formononetin supports a friendly AMF/rhizobial floor beside the host, not inside the brulé. Comfrey returns K and Ca after microbial processing of the mulch. Brassica glucosinolates → isothiocyanates are a hard conflict — mustard, daikon, or horseradish in this bed will suppress the fungal network. Do not biofumigate a truffle row.",
    succession:
      "Nuts from year 4. Truffles, if they come, from year 8–12. Coppice on a long rotation so the host stays.",
    cautions:
      "Truffles are not a guarantee. They are a well-sited bet. Keep pH high and the brulé clean. A trained dog is not optional. No brassicas, no tillage.",
    nutrients:
      "Harvest: hazel vitamin E and copper; eggs cover B12; the truffle is luxury, not nutrition. Soil: ectomycorrhizal partnership, nod-signals at the edge, mineral return from comfrey. The fungus does not donate vitamins to the nut.",
  },
  {
    id: "euc-leucaena",
    name: "Cineole windbreak with leucaena",
    system: "alley",
    zone: "9–11",
    members: ["eucalyptus", "leucaena", "mesquite", "sorghum"],
    hook: "The skill's cautionary guild: two strong chemical interactors, used on purpose, with an N-fixer to keep the floor alive.",
    ecology:
      "River red gum holds the windward edge. Leucaena coppices as the N-fixer and fodder. Mesquite adds a deeper N and P pump on caliche. Sorghum is the managed alley cover — sorgoleone for weeds, then out before you plant anything tender.",
    chemistry:
      "Eucalyptus 1,8-cineole and phenolics make a hydrophobic, slow litter that suppresses many vegetables. The documented mitigation is an N-fixer in the mix — leucaena luteolin nod-signals plus rhizodeposited N, and a livelier microbiome that helps process the terpene load. Leucaena also makes mimosine, a toxic amino-acid analog: germination inhibitor and a livestock hazard unless the herd carries Synergistes jonesii. Mesquite luteolin + citrate on high-pH soil. Sorgoleone from sorghum root hairs is a potent, SOM-persistent herbicide — use it as a timed cover, not under a young fruit tree.",
    succession:
      "Windbreak and coppice first. Sorghum as a seasonal alley. Never graduate this into a tomato row.",
    cautions:
      "Mimosine and cineole in the same block is advanced management, not a beginner food forest. Check leucaena's weed status. Do not graze unadapted cattle on fresh leucaena. Keep this far from apple, clover as a vegetable understory, and any truffle host.",
    nutrients:
      "Harvest: fodder protein and a sorghum grain if you want it. Soil: nod-signals versus two named allelochemicals. This guild is about chemical compatibility, not a vitamin map.",
  },
];

export function guildsFor(system?: FarmSystem, zone?: number): Guild[] {
  return GUILDS.filter((g) => {
    if (system && g.system !== system) return false;
    if (zone == null) return true;
    const [lo, hi] = g.zone.split("–").map((n) => parseInt(n, 10));
    return zone >= lo - 1 && zone <= hi + 1;
  });
}
