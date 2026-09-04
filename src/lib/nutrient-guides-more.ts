import type { NutrientGuide } from "./types";

export const MORE_NUTRIENT_GUIDES: NutrientGuide[] = [
  {
    key: "pantothenate",
    aka: "vitamin B5 · CoA",
    role: "The handle on coenzyme A — every fat you burn or build goes through it.",
    human:
      "Pantothenate is how you make CoA and acyl-carrier protein. Optimal status is unremarkable: energy from fat and carbohydrate, steroid hormones that can be assembled, a wound that does not stall. Deficiency in mixed diets is rare. Eggs, liver, mushrooms, avocado-type fruit, and whole grains are dense. Refining a grain throws most of it away.",
    mammal:
      "Rumen microbes supply B5 to cattle and sheep. Pigs and poultry need it in the ration; chick dermatitis and poor hatch are the textbook signs on a stripped feed.",
    missing:
      "Burning feet, fatigue, irritability in experimental human depletion. In chicks: ragged feathers and crusted eyes.",
    harvest:
      "Egg yolk, liver, shiitake and winecap, sunflower, sweet potato/squash, and any whole seed. A hen on litter is a B5 machine.",
  },
  {
    key: "biotin",
    aka: "vitamin B7 · vitamin H",
    role: "Carboxylase cofactor — fatty-acid making, gluconeogenesis, and a keratin that holds.",
    human:
      "Biotin runs the carboxylases that let you make fat and new glucose. Optimal is hair, nail, and skin that are not falling apart, and a metabolism that can switch fuels. Egg white raw and in bulk binds it (avidin); cooked yolk is a source. Gut bacteria make some. Deficiency on a normal plate is uncommon.",
    mammal:
      "Hoof and claw quality in pigs, poultry, and horses is the farm readout. High-avidin raw egg waste in a hen yard is a curiosity, not a plan. Ruminants are usually covered.",
    missing:
      "Hair loss, scaly dermatitis, depression, lactic acidosis at the extreme. In pigs: cracked hooves and dry skin.",
    harvest:
      "Cooked egg yolk, liver, almonds/hazel, sunflower, sweet potato, and mushrooms. Cook the egg. Do not drink crates of raw white and call it a protocol.",
  },
  {
    key: "choline",
    aka: "essential micronutrient · phosphatidylcholine · betaine path",
    role: "Membranes, methyl groups, and a liver that can export fat.",
    human:
      "Not classically a vitamin, but the body cannot make enough. It builds phosphatidylcholine, donates methyls (with folate and B12), and keeps VLDL leaving the liver. Optimal status is a liver that does not steatose on a hard diet, a pregnancy that can build fetal brain, and a homocysteine axis that has another donor. Egg yolk is the densest common food. Liver, meat, soy lecithin, and beets (as betaine) follow. Plant plates without egg or organ are often short.",
    mammal:
      "Perosis in chicks (slipped tendon) is choline plus manganese. Sows and dairy cows on high-production rations need it or fatty liver follows. Ruminants make some in the rumen; high-yielding dairy still supplements.",
    missing:
      "Fatty liver, muscle damage, neural-tube risk when folate is also low, memory complaints. In chicks: slipped tendon. In fresh cows: fat cow syndrome.",
    harvest:
      "Pasture egg yolks first. Then liver, muscle, and a bit of legume lecithin. Beets and spinach give betaine, which spares choline. A grove with no bird has a choline hole.",
    note: "Choline is why ‘plants can do everything’ fails on a human plate. The hen is the converter.",
  },
  {
    key: "sodium",
    aka: "Na+",
    role: "Extracellular volume, nerve fire, and the other half of the potassium story.",
    human:
      "You need some. The modern plate usually has too much refined salt and too little potassium. Optimal is enough to hold blood volume in heat and work, not a salt-trophy diet. People who sweat hard, eat very low-carb, or drink only rainwater can go short. The farm’s job is not a sodium crop — it is a mineral that livestock and people add at the trough and the table.",
    mammal:
      "Pasture is potassium-rich and sodium-poor. A salt block is not folklore; it is how a grazer holds volume and seeks other minerals. Deficiency looks like licking dirt, low milk, and pica.",
    missing:
      "In people: cramp, headache, low blood pressure on a crash diet. In stock: depraved appetite, poor lactation.",
    harvest:
      "Celery-family herbs, beet, chard, seaweed if you import it, and salt you bring to the acre. This is one nutrient the landscape rarely grows enough of.",
    note: "Do not plant for sodium. Stock a block and cook with a measured hand.",
  },
  {
    key: "chloride",
    aka: "Cl−",
    role: "Stomach acid, fluid balance, and the anion that follows sodium.",
    human:
      "Chloride is most of table salt and the Cl in HCl. Optimal digestion starts with enough acid to split protein and free minerals. Deficiency tracks sodium loss (vomit, sweat) more than a missing vegetable. Food sources are salt, celery, tomato, olives, and seaweed.",
    mammal:
      "Same salt block as sodium. Hot-weather dairy and hard-working horses lose both ions in sweat.",
    missing:
      "Metabolic alkalosis after prolonged vomiting, poor digestion, muscle cramp. In stock: it rides with salt hunger.",
    harvest:
      "Salt, olive, tomato, celery/lovage, seaweed. The grove does not need a chloride crop.",
  },
  {
    key: "sulfur",
    aka: "S · cysteine · methionine · glutathione",
    role: "The atom in connective tissue, detox, and allium bite.",
    human:
      "You eat sulfur as amino acids (methionine, cysteine) and as allium/brassica compounds. Optimal is a glutathione system that can run, hair and cartilage that have disulfide bonds, and a liver that can conjugate. Protein foods do the structural job. Garlic, onion, and mustard are the flavor chemistry — useful, not a substitute for methionine.",
    mammal:
      "Wool is sulfur. Sheep on poor protein throw weak fleece. Brassica fodder is high-S and can antagonize copper; that is a mineral-balance problem, not a reason to ban kale.",
    missing:
      "Brittle hair and nails, poor detox tone, weak wool. True S deficiency is usually protein deficiency wearing another hat.",
    harvest:
      "Egg, dairy, meat, beans, garlic, onion, mustard, and cabbage-family greens. Pair brassicas with a copper-aware mineral if sheep are on them.",
  },
  {
    key: "molybdenum",
    aka: "Mo",
    role: "The atom in sulfite oxidase and xanthine oxidase.",
    human:
      "A few dozen micrograms let you clear sulfites and handle purines. Optimal is invisible. Legumes, grains, and leafy plants grown on Mo-adequate soil carry it. Excess is rare from food; it can antagonize copper.",
    mammal:
      "Teart pastures (high Mo) lock up copper in cattle — scouring and faded coats. Low-Mo soils exist but are less dramatic. Know the geology.",
    missing:
      "Sulfite sensitivity, racing heart after wine or dried fruit, inborn-error pictures. In cattle: a copper-deficiency look on high-Mo ground.",
    harvest:
      "Beans, lentils, whole grains, leafy greens. This is a soil-parent-material nutrient. Do not chase it with a capsule on a working acre.",
  },
  {
    key: "chromium",
    aka: "Cr(III)",
    role: "A trace helper in insulin’s conversation with the cell.",
    human:
      "Trivalent chromium may potentiate insulin; the human requirement is tiny and still argued. Food doses from broccoli, grape, meat, and whole grains are the honest path. Hexavalent chromium is a toxin, not a supplement. Optimal is a glucose curve that does not need a story.",
    mammal:
      "Not a ration pillar. Do not mineralize for chromium the way you do for Se or Cu.",
    missing:
      "No clean deficiency disease in people on food. Impaired glucose handling is multifactorial — do not pin it on one trace.",
    harvest:
      "Broccoli/brassica, grape, onion, meat, whole rye. A colored plate covers the maybe. Skip the piccolinate tub.",
    note: "Emerging, small, and easy to oversell. Treat it as a passenger on real food.",
  },
  {
    key: "cobalt",
    aka: "Co · the metal in cobalamin",
    role: "The reason ruminants can make B12 — if the soil has it.",
    human:
      "You do not need free cobalt. You need B12, which contains it. Eating cobalt salts is not a vitamin strategy. The farm question is whether the rumen can build cobalamin.",
    mammal:
      "Sheep on granite and some coastal sands waste away on green grass — ‘pine’ — because the rumen cannot make B12 without cobalt. A cobalt bullet or a proper sheep mineral fixes it. Cattle need less per kilo. Pigs and poultry cannot make B12 this way.",
    missing:
      "In people: that is B12 deficiency. In sheep: ill-thrift, watery wool, anemia on pasture that looks perfect.",
    harvest:
      "Do not harvest cobalt. Mineralize the flock, then eat the egg, milk, and meat that now hold B12.",
    note: "Cobalt is a livestock-soil nutrient. The human harvest is B12, one step downstream.",
  },
  {
    key: "fluoride",
    aka: "F−",
    role: "A crystal guest in enamel and bone — useful in traces, ugly in excess.",
    human:
      "Small amounts harden enamel. Excess mottles teeth and stiffens bone. Tea, some fish bones, and fluoridated water are the common exposures. The acre is not a fluoride farm. Optimal is dental resilience without skeletal fluorosis.",
    mammal:
      "Not a target. High-fluoride water and rock phosphate can damage teeth and bone in stock.",
    missing:
      "More cavities in low-F water regions — also a sugar and saliva story. Excess: mottled enamel, joint pain.",
    harvest:
      "Tea leaf if you grow Camellia, bone-in small fish if you ever add them. Do not fertilize for fluoride.",
  },
  {
    key: "boron",
    aka: "B",
    role: "An emerging helper for bone, steroid metabolism, and plant fertility.",
    human:
      "Not yet an official essential nutrient, but trials suggest boron helps hold calcium and magnesium in bone and may ease an inflammatory joint. Nuts, avocado-type fruit, legumes, and wine grapes carry it. Soil boron varies wildly. Food doses are the only honest ones.",
    mammal:
      "Plants need boron to set fruit and move sugars. Livestock requirements are unclear; toxicity from over-fertilizer is the real farm risk.",
    missing:
      "No named human deficiency disease. In the orchard: blossom blast, corky fruit, dead growing tips.",
    harvest:
      "Hazel, walnut, grape, apple, beans. If fruit set fails across species, test the soil before you buy a bottle.",
    note: "Boron is more of a plant nutrient that happens to ride into the kitchen. Dose the soil, not the person.",
  },
  {
    key: "silicon",
    aka: "Si · silica · orthosilicic acid",
    role: "Collagen cross-links, hair and nail, and the grit in a stem.",
    human:
      "Silicon looks useful for bone collagen and connective tissue. Beer, oats, banana, and horsetail-type plants are classic. Absorption is as orthosilicic acid, not as sand. Optimal is a structural whisper, not a silica supplement cult.",
    mammal:
      "Forage silica wears teeth and can cut digestibility if it is all stem. Comfrey and nettle move silica; that is why they show up in accumulator lists. Grazers get plenty.",
    missing:
      "No official deficiency. Weak nails and a diet of peeled, refined starch is the soft signal.",
    harvest:
      "Oats, banana if you have a warm wall, nettle, comfrey leaf (measured), cucumber-family fruit, and unrefined grain. Eat plants that can stand up in the wind.",
  },
  {
    key: "essentialAA",
    aka: "His, Ile, Leu, Lys, Met, Phe, Thr, Trp, Val",
    role: "The nine amino acids a human cannot write from scratch.",
    human:
      "A ‘complete’ protein is one that brings these nine in a usable ratio. Egg, dairy, meat, and quinoa-adjacent seeds do it in one plate. Legume plus grain (bean and corn, lentil and rye) completes across a day. Optimal is muscle held, immune proteins made, and a brain that has neurotransmitter precursors. Older adults need more leucine-rich protein, not less.",
    mammal:
      "Milk, egg, wool, and growth are amino-acid yields. Ruminants upgrade forage N into microbial protein. Pigs and poultry need the limiting amino acids in the trough — lysine first on grain.",
    missing:
      "Sarcopenia, edema, poor wound healing, thin eggs, stalled weaners, weak wool.",
    harvest:
      "Egg, dairy, meat, chestnut + bean, corn + bean, rye + lentil. A nitrogen fixer in the alley is how the acre funds this.",
  },
  {
    key: "leucine",
    aka: "Leu · the mTOR trigger",
    role: "The amino acid that tells muscle it may rebuild.",
    human:
      "Leucine is indispensable and the main dietary signal for muscle protein synthesis. Optimal aging is a leucine-rich meal (egg, dairy, meat, or a serious legume portion) at least twice a day, not a 12-gram sprinkle. Plant plates can get there; they have to be deliberate.",
    mammal:
      "Growth rations are leucine-aware. Milk is naturally rich. A calf or a chick on thin protein does not ‘try harder.’",
    missing:
      "Anabolic resistance in older people, poor gain in young stock, a gym that does not change the body.",
    harvest:
      "Egg, cheese, meat, faba, lupin, corn. Pair a grain calorie with a legume if the acre is vegetarian that day.",
  },
  {
    key: "lysine",
    aka: "Lys · the grain-limiting amino acid",
    role: "Collagen cross-links and the amino acid cereals forget.",
    human:
      "Lysine is why a corn-or-rice staple without beans fails as a protein. It is also how collagen and carnitine get built. Optimal is a plate that always has a lysine donor: egg, dairy, meat, or a real serving of legume. Chestnut and most nuts are not enough alone.",
    mammal:
      "The first limiting amino acid in pig and poultry grain rations. Soy, faba, and fish meal exist because maize does not.",
    missing:
      "Poor growth, fatigue, herpes-labialis folklore aside — the real farm picture is a cereal diet without the pulse.",
    harvest:
      "Faba, lupin, bean-runner, lentil-type pulses, dairy, egg, meat. Put a pulse in the alley if the canopy is all nut and fruit.",
  },
  {
    key: "methionine",
    aka: "Met · the sulfur starter",
    role: "Methylation, cysteine, glutathione — and the amino acid legumes skimp on.",
    human:
      "Methionine starts most proteins and donates methyls via SAM. Legumes are lysine-rich and methionine-shy; grains are the reverse. That is the pairing. Excess isolated methionine is not a virtue. Optimal is enough sulfur amino acids for glutathione without a steak-only religion.",
    mammal:
      "Wool and feathers are sulfur-hungry. Poultry rations watch Met + Cys. Sheep on poor protein throw weak staple.",
    missing:
      "Poor detox tone, brittle keratin, a vegan plate of only beans. In chicks: poor feathering.",
    harvest:
      "Egg, dairy, meat, sunflower, Brazil-adjacent nuts, corn/rye, garlic as flavor-S not as Met. Pair faba with a grain.",
  },
  {
    key: "tryptophan",
    aka: "Trp · serotonin and niacin precursor",
    role: "Sleep chemistry, mood, and a back door to NAD.",
    human:
      "Tryptophan becomes serotonin and melatonin, and can become niacin if B6 and iron are present. Turkey is folklore; egg, dairy, meat, seeds, and a potato actually do the work. Optimal is sleep that can start and a niacin status that is not hanging on corn alone.",
    mammal:
      "Not a common ration crisis. Stress and very low-protein feeds can show as poor gain and vice.",
    missing:
      "In people: insomnia, low mood, and pellagra when the whole protein-B6-niacin axis is thin. Historic corn cultures without lime or beans.",
    harvest:
      "Egg, dairy, meat, sunflower, squash seed, potato/sunchoke. A mixed supper beats a tryptophan pill.",
  },
  {
    key: "solubleFiber",
    aka: "pectin · β-glucan · mucilage · inulin",
    role: "The gel that feeds butyrate and flattens a glucose spike.",
    human:
      "Pectin in apple and citrus, β-glucan in oats and barley, mucilage in flax and plantain, inulin in chicory and sunchoke. Optimal is a quieter post-meal glucose, bile acids that get bound, and a colon making short-chain fats. Diversity of gels beats one powder.",
    mammal:
      "Ruminants ferment all of this as energy. A hen or a pig wants some, not a rumen’s worth. Chicory in the sward is a livestock and a human story.",
    missing:
      "Spiky glucose, constipation that is really a missing gel, a microbiome on empty.",
    harvest:
      "Apple, oat/rye, chicory, sunchoke, flax if you grow it, plantain, citrus-family if you have a wall. Eat the skin.",
  },
  {
    key: "resistantStarch",
    aka: "RS2 / RS3 · cooled starch",
    role: "Starch that survives you and becomes butyrate.",
    human:
      "Green banana, firm chestnut, cooled potato or rice, underripe legumes. Cooking then cooling retrogrades starch into a form your microbes can use. Optimal is colon fuel without a bigger glucose hit. This is kitchen technique as much as crop choice.",
    mammal:
      "Hindgut fermenters (pig, horse) use RS as energy. Ruminants treat it as just more fermentable CHO.",
    missing:
      "No deficiency disease. A diet of fresh-hot refined starch with no leftover tuber is the gap.",
    harvest:
      "Chestnut, sunchoke, cooled potato/squash, green banana in the warm grove, beans cooked ahead. The second-day pot is a feature.",
  },
  {
    key: "linoleic",
    aka: "LA · 18:2 n-6 · essential omega-6",
    role: "An essential fat you almost certainly already eat enough of.",
    human:
      "Linoleic acid is essential in grams, not cups. It becomes arachidonic acid and sits in every membrane. The modern seed-oil plate overshoots; a grove of nuts and poultry fat already covers the need. Optimal is enough n-6 with enough long-chain n-3 that the ratio does not shout. More LA is not more health.",
    mammal:
      "Grain finishing floods LA into fat. Pasture keeps it quieter. Poultry fat is naturally n-6 rich.",
    missing:
      "True deficiency is a hospital curiosity (scaly skin, poor growth). Excess relative to n-3 is the farm and kitchen problem.",
    harvest:
      "Sunflower, walnut, pecan, poultry fat, squash seed. Use them as food, not as the only frying medium.",
    note: "The acre should not try to maximize linoleic acid. It should keep olive, pasture fat, and n-3 in the same larder.",
  },
  {
    key: "ala",
    aka: "α-linolenic acid · 18:3 n-3",
    role: "The plant omega-3 — necessary, and a poor substitute for EPA/DHA.",
    human:
      "Walnut, flax, purslane, hemp, and some greens. Conversion to EPA/DHA in humans is low (single digits, worse for DHA). Optimal is ALA in the diet plus a long-chain source. A walnut grove without a hen or a grazer covers the plant form only.",
    mammal:
      "Forage ALA is how a steer or a hen makes the EPA/DHA that ends up in yolk and fat. The animal is the elongase you are not.",
    missing:
      "Dry skin, a very high n-6/n-3 ratio. In product: grain-finished fat with almost no n-3 left.",
    harvest:
      "Walnut, purslane, flax, purslane-in-the-path, dark greens. Then let a bird or a ruminant finish the job.",
  },
  {
    key: "oleic",
    aka: "18:1 n-9 · the olive fat",
    role: "A monounsaturated fat that travels quietly in LDL and in a pan.",
    human:
      "Oleic acid is the main fat of olive oil, avocado, hazel, and well-marbled pasture meat. It is not essential, but replacing refined n-6 oils with oleic-rich whole foods is one of the more boring, reliable cardiac moves. Optimal is cooking fat that does not scream linoleic.",
    mammal:
      "Pasture changes the MUFA profile of fat. Olive and hazel are the plant factories.",
    missing:
      "No deficiency. A larder of only sunflower oil is the design miss.",
    harvest:
      "Olive, hazel, avocado if you have the climate, pasture egg and meat. Press or eat the fruit; do not only snack the chip.",
  },
  {
    key: "cla",
    aka: "conjugated linoleic acid · rumen fat",
    role: "A ruminant fatty acid with a smaller human literature than its marketing.",
    human:
      "CLA appears in the fat and milk of grass-finished ruminants. Some isomers have been studied for body composition and immune tone; food doses are modest and the capsule literature is mixed. Optimal is butter and leftover fat from an animal that actually ate grass — not a CLA softgel from a grain lot.",
    mammal:
      "The rumen makes it from linoleic acid in forage. Grain finishing collapses CLA in days to weeks. This is a management nutrient.",
    missing:
      "No deficiency disease. A dairy that never sees pasture is simply not making this fat.",
    harvest:
      "Butter, cream, lamb, and beef fat from a green sward. Sheep and cattle are the factory. Chickens are not.",
    note: "CLA is why the silvopasture is a human nutrient system, not just a pretty shade for stock.",
  },
  {
    key: "lycopene",
    aka: "the red tomato carotenoid",
    role: "A non-provitamin pigment with a vascular and prostate literature.",
    human:
      "Lycopene does not become vitamin A. Cooked tomato with oil, pink grapefruit, and watermelon are the foods. Absorption jumps when the cell wall is heated and fat is present. Optimal is a red sauce, not a raw slice as a trophy.",
    mammal:
      "No requirement. Tomato in a hen run is a treat; the lycopene story is human.",
    missing:
      "No deficiency disease. A grove that never cooks a tomato is missing an easy carotenoid that is not β-carotene.",
    harvest:
      "Tomato, cooked down with olive. Persimmon and pink fruit add a little. Fat in the pan is half the method.",
  },
  {
    key: "lutein",
    aka: "lutein + zeaxanthin · macular pigment",
    role: "The yellow that sits in the center of the retina.",
    human:
      "Lutein and zeaxanthin concentrate in the macula and seem to matter for glare recovery and long-game central vision. Egg yolk from pasture hens is uniquely bioavailable. Dark greens (dandelion, kale-type, nettle) carry more milligrams but need fat. Optimal is yolk plus greens, not a smoker’s β-carotene pill.",
    mammal:
      "Forage carotenoids color yolk and butter. Pale yolks mean the bird has not seen green feed. That color is the lutein readout.",
    missing:
      "No acute deficiency. A lifetime of white plates is the quiet risk to the macula.",
    harvest:
      "Pasture egg first. Then dandelion, dark brassica, nettle, squash, and corn. Color in the yolk is the livestock lab.",
  },
  {
    key: "catechins",
    aka: "EGCG and cousins · flavan-3-ols",
    role: "Tea-type flavonoids that talk to vessels and to the liver’s redox tone.",
    human:
      "Green tea is famous; cacao, grape skin, apple skin, and some berries carry related catechins. Food doses support endothelial function. Megadose green-tea extract has injured livers. Optimal is a drink and a dark fruit, not a 90% EGCG capsule.",
    mammal:
      "Condensed tannins (proanthocyanidins) in browse are the livestock cousin — parasite and protein-binding chemistry. Dose matters.",
    missing:
      "No deficiency. A colorless breakfast is the gap.",
    harvest:
      "Grape skin, apple skin, blueberry, cacao if you ever add it, and a tea bush only if you truly have Camellia. Eat the skins.",
  },
  {
    key: "isoflavones",
    aka: "genistein · daidzein · formononetin",
    role: "Legume signals that nodulate roots — and, at sward scale, can talk to ovaries.",
    human:
      "Soy, faba, lupin, and clover carry isoflavones. Food doses are a regular part of many healthy diets. They are not estrogen pills and they are not harmless in extract form. Optimal is a pulse on the plate, not a menopausal megadose.",
    mammal:
      "Red clover dominant swards can cause ‘clover disease’ in ewes — infertility from formononetin. Mix the pasture. The same genistein that induces nod genes is not automatically a gift to the flock.",
    missing:
      "No human deficiency. In ewes: a beautiful purple field and an empty lambing jug.",
    harvest:
      "Faba, lupin, modest clover-family foods. Keep the sheep sward mixed. Do not run a breeding flock on a pure red-clover stand.",
    note: "Isoflavones are why chemistry and husbandry share a page. Nod-signals and fertility are the same molecules at different doses.",
  },
  {
    key: "resveratrol",
    aka: "a stilbene in grape skin",
    role: "A much-marketed molecule that, in food, is just good grape skin.",
    human:
      "Resveratrol in red grape skin and some berries activates sirtuin-adjacent pathways in cells. Human food doses are tiny compared with the capsules that made the headlines. Optimal is eating the skin and drinking modest wine if you drink — not a 500 mg extract.",
    mammal:
      "No requirement. Grape pomace sometimes enters feed as a polyphenol; that is not a resveratrol protocol.",
    missing:
      "No deficiency. A grape you peel is a wasted stilbene.",
    harvest:
      "Grape, especially dark skins, and a few dark berries. Eat them. Do not wait for the vineyard to become a pharmacy.",
  },
  {
    key: "lignans",
    aka: "secoisolariciresinol · enterolignans",
    role: "Fiber-bound phenolics that gut microbes turn into enterolactone.",
    human:
      "Flax is the trophy; rye, sesame, brassica, and berries carry less. Gut bacteria convert plant lignans to enterolactone, which has a quiet hormone-modulating literature. Optimal is a spoon of flax or a rye crust, not an isolate.",
    mammal:
      "No established need. High-flax rations in poultry change egg fat; that is ALA more than lignans.",
    missing:
      "No deficiency disease. A refined-flour breakfast is the miss.",
    harvest:
      "Flax if you grow it, rye, sesame, blackberry, brassica seed. Grind flax or you will find it again later.",
  },
  {
    key: "glucosinolates",
    aka: "mustard oils · sulforaphane · isothiocyanates",
    role: "Brassica defense chemicals that, chopped and waited on, become Nrf2 signals.",
    human:
      "Mustard, horseradish, kale-type greens, daikon. Myrosinase in the plant (or in the mouth) turns glucosinolates into isothiocyanates. Light cooking and a chopped rest help. Optimal is a sharp green several times a week, not a sulforaphane shot. Iodine status should be adequate if brassicas are a staple.",
    mammal:
      "Useful as biofumigant and as forage diversity. High brassica without iodine cover gives goitrous lambs. Separate a mustard alley from an AMF-dependent fruit row in time or space.",
    missing:
      "No deficiency. In stock: goiter on a kale-only winter. In the orchard: a dead mycorrhizal network if you biofumigate the drip line.",
    harvest:
      "Mustard, daikon, horseradish, brassica greens. Chop, wait, then eat. Keep the iodine story honest.",
  },
  {
    key: "allicin",
    aka: "diallyl thiosulfinate · allium crush chemistry",
    role: "The reason a crushed garlic clove smells like medicine.",
    human:
      "Alliin plus alliinase, only after the cell is broken. Allicin is unstable and becomes other organosulfurs. Food doses support vessel tone and a less hospitable gut for some microbes. Optimal is crushed garlic in the pan, onion in the pot — not an odorless pill that never met the enzyme.",
    mammal:
      "Alliums can be toxic to dogs and, in quantity, to some stock (Heinz-body anemia). The hen can eat a little. Do not dose a flock like a kitchen.",
    missing:
      "No deficiency. A kitchen without alliums is just blander and a little less armed.",
    harvest:
      "Garlic and onion, crushed and waited on. Chives and leek-family if you have them. Cook after the crush if you want the cascade.",
  },
  {
    key: "phytosterols",
    aka: "β-sitosterol · campesterol · plant sterols",
    role: "Plant membrane lipids that nudge human cholesterol absorption down.",
    human:
      "Nuts, seeds, olive oil, and avocado-type fruit. Sterols compete with cholesterol in the micelle. Food doses are modest; fortified spreads are a different product. Optimal is a nut and an oil that came from a fruit, not a sterol-stamped margarine as a personality.",
    mammal:
      "No requirement. Ruminants hydrogenate a lot of plant lipid in the rumen.",
    missing:
      "No deficiency. A fat-free plate of only lean meat is the structural miss.",
    harvest:
      "Hazel, walnut, sunflower, olive, squash seed. Press or chew. The sterol rides with the oil.",
  },
  {
    key: "chlorophyll",
    aka: "the green",
    role: "The plant’s solar panel — in you, mostly a marker that you ate a leaf.",
    human:
      "Chlorophyll is not a human vitamin. It does not ‘oxygenate blood.’ What it marks is a plate that still has magnesium-rich, carotenoid-rich, vitamin-K-rich leaves. The benefit is the company it keeps. Optimal is green food, not chlorophyll drops.",
    mammal:
      "Grazers eat kilograms of it. The useful companions are the minerals and the energy in the rest of the leaf.",
    missing:
      "No deficiency. A winter of beige food is the real diagnosis.",
    harvest:
      "Nettle, comfrey leaf (measured), brassica, herbs, pasture. Eat leaves. Do not juice them into a morality.",
    note: "Chlorophyll is included so the atlas can say this out loud: green is a vehicle, not a drug.",
  },
  {
    key: "saponins",
    aka: "soap-like glycosides",
    role: "Plant defenses that foam, bind cholesterol in the gut, and can sting a rumen.",
    human:
      "Pulses, quinoa-adjacent seeds, spinach-family plants, and some herbs. Food doses may modestly bind cholesterol. Unsoaked, undercooked beans are a gut experiment you will remember. Optimal is soaked, cooked legumes.",
    mammal:
      "Bloat on lush clover and alfalfa is saponin plus soluble protein. Manage the sward and the break. Yucca saponins are sometimes fed on purpose; that is a product, not a grove default.",
    missing:
      "No deficiency. In cattle: frothy bloat on a pure lush legume stand.",
    harvest:
      "Faba, lupin, beans — soaked and cooked. Alfalfa as forage, not as a human saponin shot.",
  },
  {
    key: "betalains",
    aka: "betanin · the beet reds and yellows",
    role: "Nitrogenous pigments that are not anthocyanins.",
    human:
      "Beet, chard, amaranth-family leaves. Betalains are redox-active at food doses and color a meal that also brings folate and nitrate. Optimal is a beet in the pot, not a betanin isolate. They are a different chemistry from blueberry blues.",
    mammal:
      "No requirement. Beets in a dairy ration are energy and sugar more than pigment.",
    missing:
      "No deficiency. A farm without a beet or a chard is just missing an easy red that is not a berry.",
    harvest:
      "Beet if you add it, chard, and any amaranth green. The pink cutting board is the readout.",
  },
];
