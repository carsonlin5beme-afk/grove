import { SPECIES } from "./species";
import type { NutrientGroup, NutrientGuide, NutrientKey, Species } from "./types";
import { MORE_NUTRIENT_GUIDES } from "./nutrient-guides-more";

export const NUTRIENT_GROUP_LABEL: Record<NutrientGroup, string> = {
  vitamin: "Vitamins",
  mineral: "Minerals",
  antioxidant: "Antioxidants",
  macro: "Macros",
};

export type { NutrientGuide };

export const NUTRIENT_GUIDES: NutrientGuide[] = [
  {
    key: "vitaminA",
    aka: "retinol · carotenoids (β-carotene)",
    role: "Eyes, skin, and the lining of every wet surface in the body.",
    human:
      "Preformed retinol (eggs, liver, dairy) is used as-is for night vision, epithelial repair, and mucosal immunity. Plant carotenoids must convert — that conversion is uneven, and better when the meal has fat. Optimal status looks like stable night vision, fewer dry-eye and skin-barrier complaints, and a mucosa that can actually host a competent immune response.",
    mammal:
      "Calves, lambs, and chicks born from depleted dams go night-blind, scour easily, and fail to thrive. Grazers convert forage carotenoids reasonably well; poultry and pigs need a richer ration or green browse. Colostrum is the first A transfer.",
    missing:
      "Night blindness, Bitot’s spots, follicular hyperkeratosis, frequent respiratory and gut infections. In stock: weak newborns and high calf/lamb pneumonia.",
    harvest:
      "Orange flesh and dark greens for carotenoids (persimmon, squash, dandelion, comfrey leaf). Eggs and dairy from pasture birds and ruminants for retinol.",
  },
  {
    key: "vitaminC",
    aka: "ascorbate",
    role: "Collagen, iron uptake, and recycling other antioxidants.",
    human:
      "Humans cannot make ascorbate. It is the cofactor that lets you build collagen (gums, vessels, joint matrix), absorb non-heme iron, and recharge vitamin E. Optimal intake is not ‘avoid scurvy’ — it is enough to keep tissues saturated so wounds close, bruising stays rare, and plant iron actually lands.",
    mammal:
      "Most livestock synthesize C in the liver. It is not a ration crisis for cattle, sheep, or chickens under normal conditions. Exceptions: guinea pigs, some primates, and severely stressed or liver-compromised animals.",
    missing:
      "In people: bleeding gums, easy bruising, slow wounds, fatigue — scurvy at the extreme. Livestock rarely show a primary C deficiency.",
    harvest:
      "Fresh fruit and raw leaves — chestnut is not the source; berries, kiwi, peppers, brassica greens, and rose-family fruit are. C is heat-labile; eat some of it raw.",
    note: "Most mammals make their own. On this acre, C is a human harvest nutrient, not a livestock one.",
  },
  {
    key: "vitaminE",
    aka: "tocopherols · tocotrienols",
    role: "The fat-soluble shield inside every cell membrane.",
    human:
      "Protects polyunsaturated fats in membranes and works with selenium. Optimal status supports fertility, nerve sheaths, and recovery after oxidative load (illness, training, high-PUFA diets). Nuts, seeds, and cold-pressed oils are the dense sources; dark greens add a quieter background.",
    mammal:
      "Paired with selenium against white-muscle disease, retained placenta, and poor conception. Pasture in spring is rich; stored hay and grain-heavy rations fade. Poultry on oxidized fats crash first.",
    missing:
      "People: neuropathy, hemolytic anemia in infants, poor recovery. Stock: stiff lambs/calves, reproductive failure, sudden poultry deaths.",
    harvest:
      "Hazelnut, almond-adjacent nuts, sunflower, olive, wheat germ in grain, and leafy browse. Egg yolk from pasture hens carries it into the animal side.",
  },
  {
    key: "vitaminK",
    aka: "K1 phylloquinone · K2 menaquinones",
    role: "Clotting proteins and the calcium traffic in bone.",
    human:
      "K1 from greens runs the clotting cascade. K2 (from egg, dairy, liver, and some ferments) activates osteocalcin and matrix Gla-protein — it helps put calcium in bone and keep it out of arteries. Optimal health is both: you stop a cut, and your vessels stay quiet.",
    mammal:
      "Ruminants synthesize K in the rumen; grazing animals are rarely short unless moldy sweet-clover (dicoumarol) antagonizes it. Poultry and pigs rely more on green feed.",
    missing:
      "Easy bruising, nosebleeds, newborn hemorrhagic disease. In stock: sweet-clover bleeding. Bone-quality effects are slower and quieter.",
    harvest:
      "Dark leaves (nettle, kale-type brassicas, mulberry leaf, herbs) for K1. Pasture eggs, butter, and liver for K2.",
  },
  {
    key: "vitaminD",
    aka: "cholecalciferol (D3) · ergocalciferol (D2)",
    role: "The hormone that lets you absorb calcium and phosphate.",
    human:
      "Skin makes D3 from sun. Food sources are few: egg yolk, fatty fish, liver, UV-treated mushrooms (D2). Optimal status supports bone mineralization, muscle, and immune tone — rickets is the floor, not the goal. Northern winters and indoor work make food and stored summer sun matter.",
    mammal:
      "Livestock synthesize D on skin when they see actual sky. Housed animals, winter, and heavy fleece/feather cover cut it. Rickets, milk fever risk, and soft-shelled eggs follow.",
    missing:
      "Rickets, osteomalacia, muscle weakness, low mood in winter, thin eggshells, downer cows when calcium demand spikes.",
    harvest:
      "Sun on the acre is the primary crop. Then pasture egg yolks, and mushrooms if you UV them. Plants do not ship D3 through the soil.",
    note: "This is a light nutrient first. The farm’s job is outdoor animals and a few dense yolks — not a salad that ‘contains vitamin D.’",
  },
  {
    key: "thiamin",
    aka: "vitamin B1",
    role: "Turns carbohydrate into usable energy in nerve and muscle.",
    human:
      "No thiamin, no pyruvate dehydrogenase — you cannot burn starch cleanly. Optimal status is steady energy, clear thinking, and a nervous system that does not tingle. Whole grains, legumes, pork, and sunflower are the classic dense foods; polished starch without the germ is the historical trap.",
    mammal:
      "Ruminants usually get B1 from rumen microbes. Bracken, some raw fish, and high-sulfur water can destroy it and throw polioencephalomalacia in cattle and sheep. Pigs and poultry need it in the ration.",
    missing:
      "Beriberi, Wernicke-type confusion, edema or dry neuropathy in people. In stock: star-gazing calves, sudden neurological collapse.",
    harvest:
      "Sunflower, pecan, legumes, whole grains (rye, sorghum), pork if you keep pigs, and the germ of any seed you actually eat.",
  },
  {
    key: "riboflavin",
    aka: "vitamin B2",
    role: "The yellow cofactor in every redox chain.",
    human:
      "FAD and FMN sit in energy metabolism, glutathione reductase, and the activation of other B vitamins. Optimal status shows as clear mucosa, decent endurance, and the ability to handle a protein-and-fat meal without dragging. Dairy, eggs, liver, and almonds are dense; plants contribute more quietly.",
    mammal:
      "Young chicks curl-toe paralysis is the textbook sign. Ruminants again lean on microbes. Milk from well-fed cows is a real B2 food for people.",
    missing:
      "Cracked mouth corners, magenta tongue, photophobia, poor growth. In chicks: inward-curling toes.",
    harvest:
      "Eggs, dairy, liver, almonds/hazel, mushrooms, and leafy greens. A hen on green browse is a B2 factory.",
  },
  {
    key: "niacin",
    aka: "vitamin B3 · NAD / NADP",
    role: "The currency of cellular repair and energy.",
    human:
      "NAD runs hundreds of reactions and sirtuin-type repair. You can make some from tryptophan if protein and B6 are present, but a corn-only diet historically produced pellagra. Optimal health is metabolic flexibility and skin that does not erupt under sun and stress.",
    mammal:
      "Pigs and poultry are the sensitive stock. Ruminants synthesize enough. High-corn finishing without supplementation is the farm mistake.",
    missing:
      "Pellagra’s four Ds in people (dermatitis, diarrhea, dementia, death). In pigs: poor growth and skin lesions.",
    harvest:
      "Mushrooms, poultry, peanuts/mesquite-adjacent legumes, whole grains, and any animal muscle. Tryptophan-rich foods count as a second path.",
  },
  {
    key: "b6",
    aka: "pyridoxine · PLP",
    role: "Amino-acid traffic, heme, and neurotransmitter synthesis.",
    human:
      "PLP is how you transaminate, make GABA and serotonin, and assemble heme. Optimal status supports mood stability, dream recall, and a clean blood picture. Potatoes, chickpeas, banana, liver, and many nuts carry it. Excess from supplements is toxic; food is not.",
    mammal:
      "Needed for growth and hemoglobin. Deficiency is uncommon on mixed forage but appears in heavily processed pig and poultry feeds.",
    missing:
      "Irritability, anemia, cracked mouth, seborrheic dermatitis. In stock: poor growth and anemia.",
    harvest:
      "Chestnut, banana-type fruit, legumes, sunflower, liver, and muscle meat. A diverse kitchen garden covers it.",
  },
  {
    key: "folate",
    aka: "vitamin B9 · food folates (not only folic acid)",
    role: "One-carbon metabolism — DNA, blood, and a closing neural tube.",
    human:
      "Every dividing cell needs folate. Optimal status before conception and in early pregnancy is the non-negotiable; beyond that it supports mood, methylation, and a blood count that does not drift macrocytic. Dark leaves, legumes, liver, and asparagus are the farm answer. Folic acid in pills is a different molecule.",
    mammal:
      "Gestating stock on poor winter hay can throw weak or malformed young. Green forage is the reliable delivery.",
    missing:
      "Megaloblastic anemia, high homocysteine, neural-tube defects. In ewes and sows: reproductive loss that looks ‘unexplained.’",
    harvest:
      "Nettle, comfrey leaf (in measured amounts), asparagus, beans, lentils, liver, and any dark salad you actually eat.",
  },
  {
    key: "b12",
    aka: "cobalamin",
    role: "Myelin, methylation, and the other half of the folate cycle.",
    human:
      "No land plant makes B12. It is a bacterial product that concentrates in liver, meat, eggs, dairy, and some ferments. Optimal status is quiet nerves, a clean blood film, and methylation that can run. Deficiency is slow and cruel — neuropathy that does not always reverse.",
    mammal:
      "Ruminants make B12 if the rumen has cobalt. Cobalt-poor soils (granite, some sands) produce wasting ‘pine’ in sheep. Pigs, poultry, and people are downstream of that microbial step.",
    missing:
      "Pernicious-type anemia, numbness, gait change, cognitive fog. In sheep: ill-thrift on green pasture that should have been enough.",
    harvest:
      "Eggs, dairy, meat, liver, and shellfish. Soil on unwashed greens is not a plan. Mushrooms are not a reliable source.",
    note: "If the acre has no animal or fermented product, it does not cover B12. That is chemistry and microbiology, not a pairing chart.",
  },
  {
    key: "calcium",
    aka: "Ca",
    role: "Bone, milk, muscle contraction, and nerve fire.",
    human:
      "99% sits in bone as a reservoir for the 1% that runs the heart and synapse. Optimal status is a skeleton that peaks high in youth and a parathyroid axis that is not constantly raiding bone. Absorbable Ca comes with vitamin D, vitamin K2, and not too much unbound oxalate. Dairy, small bones, and low-oxalate greens beat a Ca-fortified drink.",
    mammal:
      "Milk fever is the farm’s Ca drama: a cow cannot mobilize fast enough at calving. Legume forage, limestone soils, and a dry-cow mineral plan matter more than any one herb. Laying hens need a constant grit of Ca for shells.",
    missing:
      "Osteopenia, cramps, tetany, thin eggshells, downer cows, rickets when D is also low.",
    harvest:
      "Dairy if you keep a ruminant, eggshell-adjacent hen products, sesame/almond-type seeds, nettle, kale-family greens, and bone-in small fish if you ever add them.",
  },
  {
    key: "iron",
    aka: "Fe · heme and non-heme",
    role: "Oxygen in blood and the catalytic heart of many enzymes.",
    human:
      "Heme iron (meat, liver) absorbs cleanly. Non-heme iron (leaves, legumes) needs vitamin C and a gut that is not flooded with tea, calcium, or phytate. Optimal status is endurance and a mind that does not fog — especially for menstruating people and growing children. Excess iron is an oxidant; more is not better in men.",
    mammal:
      "Piglets are born iron-poor and need soil, pasture, or a shot. Grazers usually get enough from forage and dirt. Indoor poultry and pigs on slats are the risk group.",
    missing:
      "Fatigue, pallor, restless legs, poor cold tolerance, pica. In piglets: anemia within days of birth.",
    harvest:
      "Liver, red meat, nettle, legumes, pumpkin seed, molasses-dark plants. Pair plant iron with a vitamin-C fruit in the same meal.",
  },
  {
    key: "magnesium",
    aka: "Mg",
    role: "The relaxing mineral — 300+ enzymes, ATP, and a calm synapse.",
    human:
      "Magnesium is how ATP actually works and how NMDA receptors stay in check. Optimal status looks like sleep that holds, a blood pressure that is not twitchy, insulin that listens, and muscles that do not cramp at night. Modern refined diets are chronically short. Seeds, nuts, cacao, dark leaves, and hard water are the food path.",
    mammal:
      "Spring grass tetany (hypomagnesemia) kills nursing cows on lush, high-potassium pasture. Legume hay and Mg oxide in the mineral are the livestock answer. The same lush grass that looks ‘healthy’ can be the problem.",
    missing:
      "Cramps, insomnia, palpitations, anxiety, constipation. In cattle: sudden tetany on spring flush.",
    harvest:
      "Hazel, walnut, chestnut, pumpkin seed, comfrey and nettle leaf, cacao if you ever add it, and legumes.",
  },
  {
    key: "potassium",
    aka: "K+",
    role: "The intracellular ion — heartbeat, blood pressure, and water balance.",
    human:
      "A food pattern rich in potassium (fruit, tuber, leaf) and modest in sodium is one of the most reliable blood-pressure levers we have. Optimal status is a quiet pulse and cells that can repolarize. Almost every whole plant on the acre carries some; the gap appears when the plate is refined starch and meat without the broth and the fruit.",
    mammal:
      "Forage is potassium-rich — often too rich relative to magnesium, which is the grass-tetany setup. Deficiency in grazing stock is rare; excess relative to Mg and Na is the real design problem.",
    missing:
      "In people on poor diets or losing fluids: weakness, arrhythmia. In stock: almost never a primary shortage on pasture.",
    harvest:
      "Fruit, chestnut, potato/sunchoke, squash, greens, and beans. Cook and drink the pot liquor — K is water-soluble.",
  },
  {
    key: "zinc",
    aka: "Zn",
    role: "Taste, skin, immunity, and every protein that folds around a zinc finger.",
    human:
      "Zinc is growth, wound closure, sperm, and the ability to taste food. Optimal status is a sharp sense of taste, skin that repairs, and an immune system that ends a cold. Phytate in unsoaked grains and legumes binds it; soaking, fermenting, and a little animal food fix that. Oysters are famous; on a farm, meat, egg, seed, and soaked legume do the work.",
    mammal:
      "Parakeratosis in pigs, poor hoof and hide, delayed puberty. High soil or feed copper can antagonize it. Poultry need it for feathering and shells.",
    missing:
      "Loss of taste/smell, slow wounds, acne-like rash, frequent infection, low testosterone. In pigs: thick cracked skin.",
    harvest:
      "Pumpkin seed, pecan, meat, egg, soaked beans, and dairy. Don’t eat all your zinc as raw unsoaked bran.",
  },
  {
    key: "selenium",
    aka: "Se",
    role: "The trace atom in glutathione peroxidase and thyroid deiodinase.",
    human:
      "A few dozen micrograms run antioxidant enzymes and convert T4 to T3. Optimal is a narrow band — soil maps matter more than enthusiasm. Brazil nut is the poster food; on a temperate acre, animal products from Se-adequate land and a few seeds do it. Excess is hair-and-nail toxic.",
    mammal:
      "White-muscle disease with low vitamin E, retained placenta, weak calves. Some regions are deficient (Pacific Northwest, parts of the Northeast); some are toxic. Know the county, then mineralize.",
    missing:
      "Thyroid sluggishness, infertility, cardiomyopathy at the extreme (Keshan). In stock: stiff lambs, retained membranes.",
    harvest:
      "Eggs, meat, and dairy from animals on adequate land; sunflower and brassica seed in modest amounts. This one is a soil story first.",
    note: "Selenium is not ‘more greens.’ It is parent material and a mineral program. The plant only moves what the soil had.",
  },
  {
    key: "phosphorus",
    aka: "P",
    role: "Bone mineral, ATP, and every membrane phospholipid.",
    human:
      "Phosphorus is abundant in protein foods, bran, and cola. Deficiency is rare in mixed diets; the modern problem is often too much inorganic P with too little calcium. Optimal is a Ca:P ratio that lets bone mineralize, not a P trophy.",
    mammal:
      "Phytate locks plant P. Ruminants unlock it with phytase; pigs and poultry need phytase in feed or animal P. Soft bone and poor growth follow a grain-only pig ration without it.",
    missing:
      "Rare in people who eat food. In young stock: rickets-like bone, depraved appetite.",
    harvest:
      "Nuts, seeds, legumes, dairy, meat, and egg yolk. Pair with calcium so the ratio does not run away.",
  },
  {
    key: "manganese",
    aka: "Mn",
    role: "Mitochondrial antioxidant (Mn-SOD) and cartilage glycosylation.",
    human:
      "Quiet but not optional — bone, cartilage, and the first line of mitochondrial defense. Tea, whole grains, nuts, and pineapple-family fruit are classic. Optimal status is joints that tolerate work and a redox system that is not entirely hung on zinc and selenium.",
    mammal:
      "Perosis (slipped tendon) in chicks is the textbook. Grazers usually get plenty from soil-contaminated forage.",
    missing:
      "Impaired growth, bone deformity, poor glucose handling. In chicks: swollen hocks, slipped tendon.",
    harvest:
      "Hazel, pecan, chestnut, oats, pineapple if you ever add it, and almost any unrefined seed.",
  },
  {
    key: "copper",
    aka: "Cu",
    role: "Iron traffic, collagen cross-links, and pigment.",
    human:
      "Copper lets you absorb and use iron (ceruloplasmin), cross-link collagen and elastin, and make melanin. Optimal status is sturdy vessels and hair that keeps its color on time. Excess zinc knocks it out. Liver, shellfish, cacao, and some nuts are dense.",
    mammal:
      "Sheep walk a knife-edge: they need a little and die of a little too much. Cattle and goats are more tolerant. Swayback lambs are copper deficiency; sudden hemolysis after a mineral mix is toxicity. Know your species before you mineralize.",
    missing:
      "Anemia that does not answer to iron, pale hair, aneurysms at the extreme. In lambs: swayback. In sheep: also treat excess as an emergency.",
    harvest:
      "Liver, oyster if you have coast, cacao, cashew-type nuts, sesame. Keep sheep on a sheep mineral, not a cattle one.",
    note: "Copper is the clearest reminder that ‘mammal’ is not one animal. Design the mineral for the mouth that will eat it.",
  },
  {
    key: "iodine",
    aka: "I",
    role: "The atom in thyroid hormone.",
    human:
      "No iodine, no T4/T3 — metabolism, brain development in utero, and a resting temperature that holds. Optimal is a quiet thyroid, not a goiter and not a stimulated one from megadoses. Inland, leached, or goitrogen-heavy diets (raw brassica as a staple) are the historic risk. Seaweed, fish, dairy, and iodized salt are the reliable fixes.",
    mammal:
      "Stillbirths, goiter in the newborn, hairless pigs. Brassica fodder without iodine cover is a classic flock mistake. Soil far from the sea is often low.",
    missing:
      "Goiter, fatigue, cold intolerance, cretinism in severe prenatal lack. In stock: big-necked lambs and weak litters.",
    harvest:
      "Dairy from supplemented animals, eggs, and a measured seaweed if you import it. The acre itself only has iodine if the soil or the mineral did.",
    note: "Like selenium, iodine is a landscape nutrient. Planting kale does not create it — it can even raise the need.",
  },
  {
    key: "polyphenols",
    aka: "a family, not one molecule",
    role: "Plant defense compounds that, in us, talk to the gut and to redox tone.",
    human:
      "They are not vitamins. At food doses they nudge Nrf2, feed certain gut microbes, and blunt post-meal oxidation. Optimal is a plate that is actually colored — olive, berry, herb, tea, cocoa — not a megadose capsule. The harvest is flavor and a quieter inflammatory baseline.",
    mammal:
      "Condensed tannins in browse (chestnut, some legumes, chicory) bind protein and can cut parasite load in small ruminants. Too much and you lock up protein and gut microbes. This is dose and species, not a wellness slogan.",
    missing:
      "No classic deficiency disease. A colorless diet is the gap — and in stock, a tannin-free lush grass sward that parasites love.",
    harvest:
      "Olive, berry, herb, tea-leaf, cacao, walnut skin, apple skin. Eat the pigment, not a colorless peel-less puree.",
  },
  {
    key: "flavonoids",
    aka: "quercetin, catechins, isoflavones…",
    role: "A polyphenol subclass with vascular and signaling jobs.",
    human:
      "Quercetin-type compounds in onion, apple skin, and herbs; catechins in tea; isoflavones in legumes. Food doses support vessel tone and a calmer histamine axis for some people. Soy/isoflavone pharmacology is a different conversation from an onion on the plate.",
    mammal:
      "Isoflavones in clover can disrupt ewe fertility at high intake (clover disease). The same chemistry that nods rhizobia is not automatically a gift to the ovary. Mix the sward.",
    missing:
      "No named deficiency. In flocks: infertility on dominant estrogenic clover.",
    harvest:
      "Apple skin, onion, herbs, berries, modest clover-family foods. Don’t run a ewe flock on a pure red-clover stand and call it medicine.",
  },
  {
    key: "carotenoids",
    aka: "β-carotene, lutein, zeaxanthin, lycopene",
    role: "Pigments that become vitamin A — or sit in the eye and skin as themselves.",
    human:
      "β-carotene is a vitamin A precursor. Lutein and zeaxanthin concentrate in the macula and seem to matter for long-game vision. Lycopene in cooked tomato is a different pigment with its own vascular literature. Optimal is orange and dark-green food, cooked with oil, not a single megadose of β-carotene (which failed in smokers).",
    mammal:
      "Forage carotenoids color butter and yolk and feed the dam’s vitamin A. White fat and pale yolks mean the animal has not been on green feed.",
    missing:
      "As vitamin A precursor: the A-deficiency picture. As macular pigment: a longer, quieter risk to vision.",
    harvest:
      "Persimmon, squash, tomato, dandelion, dark greens, pasture butter and yolk. Color in the fat is the livestock readout.",
  },
  {
    key: "anthocyanins",
    aka: "the red-blue pigments",
    role: "Vascular and cognitive small signals in pigmented fruit.",
    human:
      "Blueberry, black currant, aronia, purple grape skin. Human trials are modest but consistent on endothelial function and a bit of cognitive processing speed in older adults. This is a ‘eat the dark fruit’ story, not a drug.",
    mammal:
      "No established requirement. Dark fruit is a treat and a polyphenol dose, not a ration pillar.",
    missing:
      "No deficiency disease. A farm without any dark fruit is just missing an easy human harvest.",
    harvest:
      "Blueberry, aronia, black currant, purple grape, black raspberry, elderberry. Eat them, don’t only ferment them away.",
  },
  {
    key: "omega3",
    aka: "ALA · EPA · DHA",
    role: "Membrane fluidity and the resolution side of inflammation.",
    human:
      "Plant ALA (walnut, flax, purslane, some greens) converts poorly to EPA/DHA. The forms that sit in brain and retina are EPA/DHA from oily fish, pasture egg, and the fat of grass-finished ruminants. Optimal is not a walnut trophy — it is enough long-chain n-3 that the n-6/n-3 ratio of a seed-oil diet cannot drown.",
    mammal:
      "Forage ALA is how a steer or a hen puts EPA/DHA into yolk and fat. Grain finishing washes it out in weeks. The animal is the converter the human is not.",
    missing:
      "Dry skin, higher inflammatory tone, and in infants a brain that was built on the mother’s stores. In product: pale, brittle fat and low-omega eggs.",
    harvest:
      "Walnut and purslane for ALA. Then the animal products of a green sward: yolk, butter, and leftover fat from a grass-finished carcass. See ALA as its own card if you want the plant half.",
    note: "A walnut grove without a hen or a grazer covers ALA, not the long-chain fats a human brain actually uses.",
  },
  {
    key: "protein",
    aka: "indispensable amino acids",
    role: "The structure of you — and the signal to keep it.",
    human:
      "Optimal is not a number on a tub. It is enough leucine-rich protein, spread across the day, to hold muscle, immune proteins, and satiety as you age. Eggs, dairy, meat, and complementary plant pairs (legume + grain) all work. Older adults need more, not less.",
    mammal:
      "Milk, growth, wool, egg: protein is the yield. Tannin-containing forage can protect protein through the rumen. A nitrogen-fixing understory is how the acre feeds the sward that feeds the animal.",
    missing:
      "Loss of muscle, edema, poor wound healing, thin wool, small eggs, stalled weaners.",
    harvest:
      "Eggs, dairy, meat, beans, chestnut, nuts. Stack a legume in the alley so the plant protein and the animal protein both have nitrogen behind them.",
  },
  {
    key: "fiber",
    aka: "fermentable and bulking carbohydrates",
    role: "The part you don’t absorb — and your microbes do.",
    human:
      "Soluble fiber feeds short-chain-fatty-acid production (butyrate for the colon). Insoluble fiber sets transit time. Optimal is regularity, a quieter glucose curve, and a microbiome that is not starving. Diversity of plant structures beats a single powder.",
    mammal:
      "For a ruminant, ‘fiber’ is the diet — energy via the rumen. For a hen or a pig it is bulk and gut health, not the calorie core. Design the sward for the gut you actually stock.",
    missing:
      "Constipation, wild glucose swings, a thin microbiome. In stock: acidosis on too little effective fiber, or impacted crop/gut on the wrong kind.",
    harvest:
      "Every fruit, nut, leaf, and whole grain on the acre. Chestnut, apple, beans, and greens are the human-facing stack; the grass itself is the cow’s.",
  },
];

export const ALL_NUTRIENT_GUIDES: NutrientGuide[] = [...NUTRIENT_GUIDES, ...MORE_NUTRIENT_GUIDES];

export const GUIDE_BY_KEY: Record<NutrientKey, NutrientGuide> = Object.fromEntries(
  ALL_NUTRIENT_GUIDES.map((g) => [g.key, g]),
) as Record<NutrientKey, NutrientGuide>;

export function topSources(key: NutrientKey, limit = 6): Species[] {
  return SPECIES.filter((sp) => (sp.nutrients[key] ?? 0) > 0)
    .sort((a, b) => (b.nutrients[key] ?? 0) - (a.nutrients[key] ?? 0))
    .slice(0, limit);
}

export function sourceScore(sp: Species, key: NutrientKey): number {
  return sp.nutrients[key] ?? 0;
}
