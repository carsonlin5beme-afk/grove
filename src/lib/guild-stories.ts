import { GUIDE_BY_KEY } from "./nutrients";
import { SPECIES_BY_ID } from "./species";
import { NUTRIENT_META, type NutrientKey } from "./types";
import { GUILDS } from "./guilds";

export interface CastRole {
  id: string;
  job: string;
  gives: string;
  needs: string;
}

export interface HarmonyLink {
  from: string;
  to: string;
  because: string;
}

export interface YearBeat {
  when: string;
  what: string;
}

export interface GuildStory {
  id: string;
  plainHook: string;
  metaphor: string;
  roles: CastRole[];
  links: HarmonyLink[];
  years: YearBeat[];
  watch: string[];
  terms: string[];
}

export const GLOSSARY: Record<string, string> = {
  guild:
    "A planned neighborhood of plants and animals that help each other, the way a forest does — not a single crop in a row.",
  canopy:
    "The tallest layer. Big trees that make shade, hold the wind, and drop the heavy harvest (nuts, mast, timber).",
  midstory:
    "The middle layer — fruit trees and large shrubs living under the tall trees, like a second floor.",
  understory:
    "The short layer: herbs, berries, and groundcovers that live in the leftover light.",
  "nitrogen fixer":
    "A plant that hosts bacteria on its roots. Those bacteria turn air-nitrogen into a form neighbors can eventually use, after the soil life processes it.",
  rhizosphere:
    "The thin sleeve of soil around a root — the busiest chemical neighborhood on the farm. Roots leak sugars and signals; microbes answer.",
  exudate:
    "The leak from a living root: sugars, acids, and password-chemicals. Not vitamins being handed to the next plant.",
  nodulation:
    "The root growing a tiny factory (a nodule) where bacteria live and fix nitrogen. Some plants send a chemical password (like genistein) to start this.",
  "Frankia":
    "A different nitrogen partner than the usual bean bacteria. Alders and a few other trees use Frankia, not Rhizobium.",
  AMF:
    "Arbuscular mycorrhizal fungi — microscopic trading partners that plug into roots and extend the plant’s reach for phosphorus and water.",
  "common mycelial network":
    "When fungi connect more than one plant, they can move some nutrients and signals between neighbors. Not a vitamin pipeline.",
  litter:
    "Dead leaves and twigs on the ground. Microbes eat them and release minerals. That is how most ‘fertility’ actually arrives.",
  "drip line":
    "The ring of soil under the outer edge of a tree’s crown, where rain drips off the leaves. The richest feeding zone.",
  coppice:
    "Cut a tree near the ground so it resprouts. You harvest wood and keep the roots (and their soil work) alive.",
  succession:
    "The planned changing of the cast over years. Fast plants pay the bills while slow trees grow up.",
  allelopathy:
    "A plant making chemicals that slow or stop other plants. Sometimes useful (weed control). Sometimes a feud (walnut vs apple).",
  juglone:
    "Walnut’s famous weapon. It unplugs energy production in sensitive neighbors like apple, tomato, and grape. Asparagus mostly shrugs.",
  "dynamic accumulator":
    "A deep-rooted plant (comfrey, nettle) that mines minerals from below and stores them in leaves. Those minerals reach the topsoil only after you cut the leaves and microbes digest them.",
  silvopasture:
    "Trees plus grazing animals on the same ground. Shade for the animal, manure for the tree, forage in between.",
  "food forest":
    "A farm stacked like a woodland: tall trees, fruit, shrubs, herbs, vines, groundcover, and sometimes animals.",
  "alley cropping":
    "Permanent tree rows with crops in the sunny lanes between them. The lanes pay you while the trees grow.",
  "harvest vs soil":
    "Vitamins in fruit are for you to eat. They do not drip into the next plant. Soil gains are minerals, signals, and dead leaves.",
  strigolactone:
    "A root signal that calls mycorrhizal fungi over. Fruit trees use it. Mustard-family plants can wreck that friendship.",
  tannin:
    "A bitter plant compound. In leaves it slows how fast nitrogen leaks from rotting litter. In forage it can also calm gut parasites.",
  "trap crop":
    "A plant you grow so pests eat it instead of your food. Nasturtium is the classic ‘please chew me’ sign.",
  mast:
    "A heavy nut year. Oaks and chestnuts do not crop evenly — some years the ground is a carpet.",
  brulé:
    "The bald ring of soil around a truffle tree. The fungus owns that patch. Keep chickens and mustard out of it at harvest.",
  mimosine:
    "A toxic amino-acid lookalike in leucaena. Fine for adapted cattle with the right gut microbe. Dangerous for everyone else.",
  cineole:
    "The eucalyptus smell. In litter it can suppress vegetables. Pair it with a nitrogen-fixer if you must use it as a windbreak.",
  sorgoleone:
    "A weed-killing oil from sorghum roots. Useful as a timed cover crop. Fatal under a baby fruit tree.",
  "B12":
    "A vitamin no land plant makes. Eggs, dairy, meat, or a well-fed rumen. A plant-only acre does not cover it.",
};

export const STORIES: GuildStory[] = [
  {
    id: "chestnut-stack",
    plainHook: "Turn one corn row into a small forest that feeds you longer, and better.",
    metaphor:
      "Think of a city block. The chestnut is the tall apartment. The apple is the shop downstairs. Grapes use the fire escape. Blueberries take the shady alley. Alder and beans are the utility crew wiring nitrogen. Clover is the park. Nasturtium is the decoy that keeps pests off the fruit.",
    roles: [
      { id: "chestnut", job: "The calorie roof", gives: "Nuts, shade, a trunk to climb", needs: "Decades, and nitrogen while it is young" },
      { id: "apple", job: "The fruit shop", gives: "Apples you can eat in year five", needs: "Light from the side, not a walnut neighbor" },
      { id: "grape", job: "The climber", gives: "Fruit on the same footprint", needs: "A trunk used as a ladder" },
      { id: "blueberry", job: "The acid specialist", gives: "Berries packed with color-pigments", needs: "Sour mulch — do not lime it with the apples" },
      { id: "alder", job: "The nurse", gives: "Nitrogen while the trees are teenagers", needs: "To be cut back once the chestnut has a job" },
      { id: "bean-runner", job: "The password plant", gives: "Nitrogen factories on its roots, plus beans", needs: "A pole or a trunk" },
      { id: "nasturtium", job: "The decoy", gives: "Pests chew this instead of fruit", needs: "The edge, not the blueberry’s roots" },
      { id: "clover-white", job: "The living carpet", gives: "A floor that feeds itself nitrogen", needs: "To be walked on, not tilled away" },
    ],
    links: [
      { from: "alder", to: "chestnut", because: "The alder feeds the young chestnut so you are not buying fertilizer for a decade." },
      { from: "bean-runner", to: "apple", because: "Bean roots leak a password that tells bacteria to build nitrogen factories." },
      { from: "grape", to: "chestnut", because: "The grape uses the chestnut as a living trellis — two crops, one trunk." },
      { from: "nasturtium", to: "apple", because: "Bugs find the nasturtium first. That is the point." },
      { from: "clover-white", to: "chestnut", because: "The carpet keeps soil covered and quietly tops up nitrogen at ground level." },
      { from: "blueberry", to: "chestnut", because: "Blueberry wants the sour drip on the east side — a different room in the same house." },
    ],
    years: [
      { when: "Years 1–4", what: "Beans, nasturtium, and clover feed you and the soil. Trees are just getting their legs." },
      { when: "Years 5–8", what: "Apples and grapes come on. The block starts to look like a farm, not a bet." },
      { when: "Year 8+", what: "Chestnuts begin to mast. The alder has done its job — coppice it or ring-bark it as a nurse that retired." },
    ],
    watch: [
      "Plant Chinese chestnut or a well-bred hybrid — blight is still real.",
      "Blueberries need acid mulch. Do not lime them with the apples.",
      "No mustard or daikon in this block — they break the fungal friendships these trees need.",
      "Keep it far from black walnut. Apple, grape, and blueberry all wilt under juglone.",
    ],
    terms: ["guild", "canopy", "nitrogen fixer", "Frankia", "nodulation", "AMF", "trap crop", "drip line", "coppice", "harvest vs soil", "juglone"],
  },
  {
    id: "apple-chicken",
    plainHook: "Birds clean the orchard floor. Trees house the birds. You eat fruit and eggs from the same square of land.",
    metaphor:
      "The apple is a roof and a cafeteria. The hen is a roaming sanitation crew that also lays breakfast. Comfrey is the compost pile that grows itself. Daffodils are the ‘no voles’ sign around each trunk.",
    roles: [
      { id: "apple", job: "The orchard roof", gives: "Fruit, shade, hawk cover", needs: "A clean floor and no walnut drip" },
      { id: "chicken", job: "The sanitation crew", gives: "Pest control, manure, eggs, B12", needs: "A hut, rotation, and bark they cannot strip" },
      { id: "comfrey", job: "The mineral mine", gives: "Leaf mulch rich in K, Ca, silica", needs: "To be cut and laid — not left as a monument" },
      { id: "clover-white", job: "The living floor", gives: "Nitrogen and bee forage", needs: "Not to be scratched to dirt" },
      { id: "nasturtium", job: "The decoy", gives: "A pest buffet away from fruit", needs: "The edge" },
      { id: "daffodil", job: "The vole guard", gives: "A bitter ring rodents skip", needs: "To stay around the trunk, not in the salad" },
      { id: "bee", job: "The pollinator", gives: "Every apple that becomes fruit", needs: "Bloom and a place that is not sprayed" },
    ],
    links: [
      { from: "chicken", to: "apple", because: "Hens eat dropped fruit and the worms inside it, breaking the pest’s life cycle." },
      { from: "apple", to: "chicken", because: "Shade, winter windbreak, and a roof against hawks." },
      { from: "comfrey", to: "apple", because: "Cut leaves become mulch. Microbes release the minerals onto the drip line." },
      { from: "clover-white", to: "apple", because: "Clover’s root passwords start nitrogen factories under the trees." },
      { from: "daffodil", to: "apple", because: "Voles hate the bulbs, so they stop girdling the bark." },
    ],
    years: [
      { when: "Year 1", what: "Plant trees, daffodil rings, clover. No flock on tender bark." },
      { when: "Year 2", what: "Add the hens on rotation — hours on a patch, not a permanent camp." },
      { when: "Year 4+", what: "Fruit and eggs in the same footprint." },
    ],
    watch: [
      "Birds will strip young bark if you leave them. Move them.",
      "A floor scratched to dirt is a failure — rotate.",
      "Stay far from black walnut.",
      "Foxes and hawks still exist. Give a hut.",
    ],
    terms: ["silvopasture", "drip line", "dynamic accumulator", "AMF", "nodulation", "juglone", "trap crop", "B12", "harvest vs soil"],
  },
  {
    id: "olive-alley",
    plainHook: "Evergreen oil trees in permanent rows. Vegetables in the sunny lanes pay the rent for a decade.",
    metaphor:
      "The olives are the stone walls of a Mediterranean farm. The alleys are the market garden. Paulownia is the tall intern who rakes leaves from the sky. Herbs and clover are the paths you actually walk.",
    roles: [
      { id: "olive", job: "The permanent row", gives: "Oil, windbreak, a 100-year crop", needs: "Heat, and patience" },
      { id: "paulownia", job: "The deep nurse", gives: "Fast leaf mulch from deeper than the tomatoes drink", needs: "Suckers managed, or it becomes a weed" },
      { id: "tomato", job: "This year’s paycheck", gives: "Fruit while olives are teenagers", needs: "Sun in the alley, and no mustard cover" },
      { id: "eggplant", job: "The second paycheck", gives: "Another nightshade harvest", needs: "The same sunny lane" },
      { id: "basil", job: "The kitchen edge", gives: "Flavor and a pest cue", needs: "Not to be asked to fertilize the tomato" },
      { id: "oregano", job: "The path", gives: "A carpet that outcompetes grass", needs: "Dry feet" },
      { id: "clover-white", job: "The living path", gives: "Nitrogen underfoot", needs: "To stay as a path, not a tilled bed" },
    ],
    links: [
      { from: "paulownia", to: "tomato", because: "Deep roots and a rain of leaves feed the alley without stealing surface water." },
      { from: "clover-white", to: "olive", because: "The path is a nitrogen factory you walk on." },
      { from: "oregano", to: "tomato", because: "Its oils discourage some grasses so the alley stays a crop, not a lawn." },
      { from: "olive", to: "tomato", because: "The row is the bone. The alley is the meat — until the olives close." },
    ],
    years: [
      { when: "Years 1–7", what: "Alleys are the income. Olives are just standing there looking expensive." },
      { when: "Year 8+", what: "Olives close. Annuals shrink to the sunniest gaps, or you switch to shade herbs." },
    ],
    watch: [
      "Paulownia suckers in the American South. Manage them.",
      "Olives need heat. North of zone 8 they want a wall.",
      "Do not drop mustard into the tomato alley the year you want fungal partners.",
    ],
    terms: ["alley cropping", "litter", "AMF", "strigolactone", "nodulation", "succession", "harvest vs soil"],
  },
  {
    id: "walnut-asparagus",
    plainHook: "Walnut poisons most neighbors. So plant the few that do not care, and take timber, nuts, and a 20-year vegetable.",
    metaphor:
      "The walnut is a grumpy landlord with a chemical lease. Asparagus, black raspberry, and currant signed it anyway. Garlic is the doorman. Apple is not invited.",
    roles: [
      { id: "walnut-black", job: "The landlord", gives: "Nuts, veneer timber, and a chemical moat", needs: "To be isolated from the apple orchard" },
      { id: "asparagus", job: "The tenant who does not care", gives: "Spears every spring for twenty years", needs: "Patience the first two seasons" },
      { id: "raspberry-black", job: "The berry that shrugs", gives: "Fruit in the juglone shade", needs: "A cane to be cut, not a fight with walnut" },
      { id: "currant", job: "The other shrug", gives: "Berries that tolerate the moat", needs: "Some light from the side" },
      { id: "garlic", job: "The pest cue", gives: "A smell many insects dislike", needs: "Not to be asked to kill walnut’s fungi" },
    ],
    links: [
      { from: "walnut-black", to: "asparagus", because: "Juglone unplugs most plants. Asparagus’ machinery does not care." },
      { from: "walnut-black", to: "raspberry-black", because: "Same story: a rare berry that lives in the moat." },
      { from: "garlic", to: "asparagus", because: "A pest cue at ground level — not a fertilizer, a bouncer." },
    ],
    years: [
      { when: "Years 1–4", what: "Asparagus is the cash. Berries start." },
      { when: "Years 2–12", what: "Berries fill the middle years." },
      { when: "Year 15+", what: "Walnut dominates. The vegetable still comes in May." },
    ],
    watch: [
      "Isolate this block from apples, grapes, tomatoes, pines.",
      "Do not dump hulls on a sensitive bed and call it compost.",
      "More organic matter shortens juglone’s life. That is the practical fix.",
    ],
    terms: ["allelopathy", "juglone", "litter", "tannin", "guild", "harvest vs soil"],
  },
  {
    id: "fig-herb",
    plainHook: "A heat-loving fruit over a carpet of herbs that outcompetes grass and sells as a second crop.",
    metaphor:
      "The fig is a lazy, generous host. The herbs are a thick rug no lawn can invade. The hen tidies dropped fruit and ignores the perfume.",
    roles: [
      { id: "fig", job: "The heat fruit", gives: "Months of figs", needs: "Drainage, and a mulched crown in zone 7" },
      { id: "oregano", job: "The rug", gives: "A grass-proof floor and a cash bouquet", needs: "Gravel, not wet clay" },
      { id: "thyme", job: "The low rug", gives: "More carpet, more oil", needs: "Sun and sharp drainage" },
      { id: "lavender", job: "The bee magnet", gives: "Bloom and a dry-ground hold", needs: "The same sharp drainage" },
      { id: "rosemary", job: "The upright herb", gives: "Structure and oil", needs: "Not a wet winter" },
      { id: "chicken", job: "The tidier", gives: "Clean-up and eggs", needs: "Not to live in mint" },
    ],
    links: [
      { from: "oregano", to: "fig", because: "The herb floor steals the grass’s job, so the fig keeps its water." },
      { from: "chicken", to: "fig", because: "Dropped fruit becomes eggs instead of a wasp hotel." },
      { from: "lavender", to: "oregano", because: "Together they hold a dry, aromatic floor that grass hates." },
    ],
    years: [
      { when: "Year 1", what: "Herbs produce. Figs are sticks." },
      { when: "Year 3", what: "Figs come on. The understory stays forever — this one does not phase out." },
    ],
    watch: [
      "Figs die to the ground in a hard zone-7 winter. Mulch the crown.",
      "Herbs rot in wet clay. Gravel them.",
      "Keep mint and fennel out. They will occupy every damp inch.",
    ],
    terms: ["understory", "litter", "food forest", "B12", "harvest vs soil"],
  },
  {
    id: "locust-cattle",
    plainHook: "A tall, open tree that lets grass live, dropping sweet pods into a mineral-rich pasture.",
    metaphor:
      "Honey locust is a parasol, not a cave. Cattle loaf under it when the sun is a weapon. The sward is a salad bar: grass, clover, chicory, plantain. Pods are dessert in autumn.",
    roles: [
      { id: "honey-locust", job: "The parasol", gives: "Shade, nitrogen, sweet pods", needs: "A named thornless, podding variety" },
      { id: "switchgrass", job: "The prairie floor", gives: "A grass that lives in filtered light", needs: "Not to be overstocked" },
      { id: "clover-white", job: "The nitrogen clover", gives: "Factories in the sod", needs: "A mix, not a monoculture" },
      { id: "chicory", job: "The deep tap", gives: "Minerals and a compound that calms gut worms", needs: "To be in the sward, not a row" },
      { id: "plantain-forage", job: "The mineral leaf", gives: "A second deep green", needs: "Grazing, not plowing" },
      { id: "cattle", job: "The harvester", gives: "Meat, milk, dung, and the reason for shade", needs: "Protected trunks for 5–7 years" },
    ],
    links: [
      { from: "honey-locust", to: "cattle", because: "Shade cuts heat stress. Gains rise. Pods are a late-season energy bar." },
      { from: "clover-white", to: "switchgrass", because: "Clover’s nitrogen underwrites a grass that would otherwise fade." },
      { from: "chicory", to: "cattle", because: "Bitter compounds in the leaf are a mild worm strategy — forage chemistry, not a pill." },
      { from: "cattle", to: "honey-locust", because: "Dung is the mineral return the tree cannot make from air." },
    ],
    years: [
      { when: "Years 1–7", what: "Trees on a wide grid. Protect every trunk." },
      { when: "Year 7+", what: "You can ride a horse under the first limbs. That is when it is silvopasture." },
    ],
    watch: [
      "Seedlings grow six-inch thorns. Buy named thornless, podding cultivars.",
      "Never overstock a young stand.",
      "Pure alfalfa under the same canopy needs a bloat plan. This mix is safer.",
    ],
    terms: ["silvopasture", "nitrogen fixer", "nodulation", "tannin", "canopy", "B12"],
  },
  {
    id: "oak-mast",
    plainHook: "A keystone tree, two native fruits, a luxury fungus, and a pig that harvests what you cannot.",
    metaphor:
      "The oak is a cathedral that also drops groceries. Pawpaw and persimmon are the side chapels. Truffle is the secret under the floor. The pig is a seasonal deacon who turns weevily acorns into pork, then leaves.",
    roles: [
      { id: "oak-white", job: "The keystone", gives: "Mast, wildlife, a truffle partner on limestone", needs: "Thirty years and a clean floor at harvest" },
      { id: "pawpaw", job: "The shade fruit", gives: "A tropical-tasting native", needs: "Dappled light, not a plow" },
      { id: "persimmon", job: "The autumn fruit", gives: "Vitamin-A-orange pulp", needs: "The same shade the oak already made" },
      { id: "truffle", job: "The underground crop", gives: "A luxury if the fungus takes", needs: "High pH, no mustard, no pigs on the brulé" },
      { id: "shiitake", job: "The bolt crop", gives: "Mushrooms on thinnings", needs: "Oak wood, not the living root" },
      { id: "pig", job: "The mast harvester", gives: "Pork from acorns you will not pick", needs: "Hours, not weeks — they will rototill" },
    ],
    links: [
      { from: "oak-white", to: "truffle", because: "On limestone the oak hosts the fungus. The tree is the landlord; the fungus is the crop." },
      { from: "oak-white", to: "pawpaw", because: "Shade that would kill a tomato is exactly what pawpaw wants." },
      { from: "oak-white", to: "shiitake", because: "Thinnings become logs. The mushroom eats dead oak, not living soil vitamins." },
      { from: "pig", to: "oak-white", because: "A mast year the pig can use, you cannot. Then lock them out." },
    ],
    years: [
      { when: "Years 1–8", what: "Shiitake and pawpaw are the early yields." },
      { when: "Year 15+", what: "Mast. Truffles, if they come." },
      { when: "Always", what: "Pigs are a flash, never a resident." },
    ],
    watch: [
      "Pigs left too long ring-bark and till roots.",
      "Truffles need high pH and a clean brulé. Brassicas collapse the partnership.",
      "This is a 30-year farm. Do not expect year-two truffles.",
    ],
    terms: ["mast", "brulé", "tannin", "canopy", "understory", "silvopasture", "harvest vs soil"],
  },
  {
    id: "riparian-duck",
    plainHook: "The wet corner you were going to ignore becomes the most productive strip on the farm.",
    metaphor:
      "Willow and alder are the engineers who pin the bank. Elder and nettle are the medicine chest. Ducks are the slug patrol chickens will not do. Winecap is the crew that eats the woodchips you drop.",
    roles: [
      { id: "willow", job: "The bank pin", gives: "Roots that lock mud, wood you can cut forever", needs: "The wet feature — not the well-house" },
      { id: "alder", job: "The wet nitrogen", gives: "A fixer that likes wet feet", needs: "A coppice cycle" },
      { id: "elderberry", job: "The medicine shrub", gives: "Dark fruit and a wet-site harvest", needs: "The same damp strip" },
      { id: "nettle", job: "The calcium mine", gives: "Leaves that, once cut, lift topsoil calcium", needs: "Gloves, and not a daily tea habit" },
      { id: "duck", job: "The slug patrol", gives: "Protein, and a pest chickens ignore", needs: "Water and a night shelter" },
      { id: "winecap", job: "The chip eater", gives: "Mushrooms and a livelier soil food web", needs: "Fresh chip, no mustard" },
    ],
    links: [
      { from: "alder", to: "elderberry", because: "Alder’s nitrogen litter is the wet-site fertilizer." },
      { from: "willow", to: "winecap", because: "Coppice becomes chip. Chip becomes mushrooms." },
      { from: "duck", to: "nettle", because: "Ducks work the slugs; nettle works the minerals. Same strip, two jobs." },
      { from: "nettle", to: "willow", because: "Chop-and-drop nettle is a documented calcium pump into the topsoil." },
    ],
    years: [
      { when: "Year 1", what: "Stick cuttings of willow and alder. Plant elder. Start the nettle patch." },
      { when: "Year 2", what: "Add ducks. Coppice on a three-year rotation forever." },
    ],
    watch: [
      "Willow roots will find a water line. Site this on the feature.",
      "Do not biofumigate a winecap bed.",
    ],
    terms: ["nitrogen fixer", "Frankia", "dynamic accumulator", "coppice", "litter", "B12"],
  },
  {
    id: "three-sisters-grove",
    plainHook: "Corn, beans, and squash — the old annual partnership — used as a sunny alley while chestnut trees grow up.",
    metaphor:
      "Corn is the pole. Beans are the nitrogen crew climbing it. Squash is the living blanket. Chestnut is the landlord who will eventually take the light. Until then, the sisters pay the rent.",
    roles: [
      { id: "chestnut", job: "The future roof", gives: "The calorie tree that replaces corn", needs: "A decade of alley income first" },
      { id: "corn", job: "The pole", gives: "Calories and a trellis", needs: "Sun, and beans on its ankle" },
      { id: "bean-runner", job: "The nitrogen climb", gives: "Password chemicals and protein", needs: "The corn stalk" },
      { id: "squash", job: "The blanket", gives: "Shade on the soil, a fruit", needs: "Room to run" },
      { id: "sunflower", job: "The second pole", gives: "Seed and another ladder", needs: "Not to smother tiny seeds next door" },
      { id: "nasturtium", job: "The decoy", gives: "Pests at the edge", needs: "The margin" },
    ],
    links: [
      { from: "bean-runner", to: "corn", because: "The best-documented handshake on the farm: bean passwords, corn yield, more minerals in the grain." },
      { from: "squash", to: "corn", because: "Leaves are a living mulch. Weeds lose the light." },
      { from: "chestnut", to: "corn", because: "For a decade they share. Then the tree takes the sky and corn retires." },
      { from: "nasturtium", to: "squash", because: "The decoy at the edge keeps chew-holes off the fruit." },
    ],
    years: [
      { when: "Years 1–6", what: "Full sisters in the alley. Chestnuts are sticks." },
      { when: "Years 7–10", what: "Partial shade sisters." },
      { when: "After", what: "Canopy only. Clover stays on the floor." },
    ],
    watch: [
      "This is a bridge, not a destination. Stop tilling once the trees close.",
      "Do not sow tiny seeds into fresh sunflower residue.",
    ],
    terms: ["alley cropping", "nodulation", "AMF", "strigolactone", "succession", "trap crop", "canopy"],
  },
  {
    id: "medicinal-edge",
    plainHook: "A hedge that is a dispensary, an insect hotel, and a fertilizer factory you cut with a scythe.",
    metaphor:
      "Elder on the wet end, echinacea on the dry. Comfrey and nettle are the mines. Calendula fills the gaps. Hoverflies clock in here, then go hunt in the orchard.",
    roles: [
      { id: "elderberry", job: "The wet-end shrub", gives: "Dark fruit and a tall hedge", needs: "The damp side" },
      { id: "comfrey", job: "The leaf mine", gives: "Mulch minerals after you cut it", needs: "Division, not worship" },
      { id: "nettle", job: "The calcium mine", gives: "A real topsoil calcium lift", needs: "Gloves" },
      { id: "echinacea", job: "The dry-end bloom", gives: "A late-summer insectary", needs: "The dry end, not a wet foot" },
      { id: "yarrow", job: "The path edge", gives: "A mineral tap and a landing strip for wasps", needs: "Poor soil it actually likes" },
      { id: "calendula", job: "The self-sower", gives: "Gaps filled, more insects", needs: "To be allowed to seed" },
    ],
    links: [
      { from: "comfrey", to: "elderberry", because: "Cut leaves, let microbes work, and the hedge eats minerals you did not buy." },
      { from: "nettle", to: "comfrey", because: "Two mines. Nettle is the calcium specialist." },
      { from: "echinacea", to: "yarrow", because: "Together they are an insectary. The orchard next door inherits the hunters." },
    ],
    years: [
      { when: "Year 2", what: "Fully online. Coppice elder. Divide comfrey. Let calendula seed." },
    ],
    watch: [
      "Comfrey is for soil and animals, not a daily tea.",
      "Do not expect vitamins to walk from nettle into the apple next door.",
    ],
    terms: ["dynamic accumulator", "litter", "food forest", "harvest vs soil", "understory"],
  },
  {
    id: "arid-mesquite",
    plainHook: "When rain is a rumor, plant the trees that drink from a deeper story, and let sheep walk the floor.",
    metaphor:
      "Mesquite is a well with leaves. Olive and pomegranate take the heat. Lavender holds the dust down. Sheep eat what grass appears and leave the oils alone.",
    roles: [
      { id: "mesquite", job: "The deep well", gives: "Nitrogen, protein pods, unlocked phosphorus", needs: "A county that allows it" },
      { id: "olive", job: "The oil tree", gives: "Fat and vitamin E in a dry climate", needs: "Heat units" },
      { id: "pomegranate", job: "The aril", gives: "A fruit that laughs at drought", needs: "The same heat" },
      { id: "lavender", job: "The dry floor", gives: "A hold on bare ground, and bees", needs: "Not a wet clay" },
      { id: "sheep", job: "The walker", gives: "Browse control and dung", needs: "Shade and water you still provide" },
    ],
    links: [
      { from: "mesquite", to: "olive", because: "Deep nitrogen and acids that unlock phosphorus in high-pH dirt." },
      { from: "mesquite", to: "sheep", because: "Pods are the transfer — protein the animal can eat, not a vitamin drip." },
      { from: "lavender", to: "sheep", because: "Sheep leave the oils alone and graze the grass that would steal the water." },
    ],
    years: [
      { when: "Slow, then permanent", what: "Pods and herbs first. Oil and arils as the canopy settles." },
    ],
    watch: [
      "Mesquite is a regulated weed in some counties. Check.",
      "Do not add leucaena unless the flock can handle mimosine.",
    ],
    terms: ["silvopasture", "nitrogen fixer", "cineole", "mimosine", "harvest vs soil"],
  },
  {
    id: "hazel-truffle",
    plainHook: "A nut hedge that can out-earn the rest of the farm if the underground partner shows up.",
    metaphor:
      "Hazel is the visible crop. The truffle is the invisible one. Comfrey and clover feed the soil life the fungus wants. Chickens work the insects — then get locked out so they do not steal the prize.",
    roles: [
      { id: "hazel", job: "The host", gives: "Nuts in year four, a root the fungus can marry", needs: "High pH, drainage" },
      { id: "truffle", job: "The real paycheck", gives: "A luxury if it takes", needs: "A clean brulé, a dog, no mustard" },
      { id: "comfrey", job: "The mulch mine", gives: "K and Ca after microbes eat the leaves", needs: "To stay beside the row, not in the brulé" },
      { id: "clover-white", job: "The friendly floor", gives: "Nitrogen at the edge", needs: "Not to be tilled into the fungus" },
      { id: "chicken", job: "The insect crew", gives: "Pest control most of the year", needs: "A lock-out at harvest" },
    ],
    links: [
      { from: "hazel", to: "truffle", because: "The fungus, not the tree, is the crop. Hazel is the living dock." },
      { from: "comfrey", to: "hazel", because: "Mulch minerals after a microbial pause — never dumped on the bald ring." },
      { from: "chicken", to: "truffle", because: "Useful eleven months. A disaster in the twelfth." },
    ],
    years: [
      { when: "Year 4", what: "Nuts." },
      { when: "Years 8–12", what: "Truffles, if they come. A well-sited bet, not a guarantee." },
    ],
    watch: [
      "No brassicas. No tillage. No chickens on the brulé.",
      "A trained dog is not optional.",
    ],
    terms: ["brulé", "AMF", "strigolactone", "dynamic accumulator", "harvest vs soil"],
  },
  {
    id: "euc-leucaena",
    plainHook: "Two strong chemical personalities, used on purpose, with a nitrogen-fixer so the floor does not die.",
    metaphor:
      "Eucalyptus is a windbreak that also pickles the litter. Leucaena is the nitrogen engine — and a poison if the wrong animal eats it. Sorghum is a seasonal weed-killer you then remove. This is advanced chemistry, not a beginner garden.",
    roles: [
      { id: "eucalyptus", job: "The wind wall", gives: "A fast edge, and a litter that suppresses vegetables", needs: "An N-fixer in the mix" },
      { id: "leucaena", job: "The dangerous fixer", gives: "Nitrogen and fodder", needs: "Adapted livestock, or no grazing" },
      { id: "mesquite", job: "The deep pump", gives: "More nitrogen and unlocked phosphorus", needs: "High-pH ground" },
      { id: "sorghum", job: "The timed herbicide", gives: "A clean alley for a season", needs: "To be gone before anything tender" },
    ],
    links: [
      { from: "leucaena", to: "eucalyptus", because: "The fixer keeps a microbiome lively enough to process the eucalyptus oils." },
      { from: "sorghum", to: "leucaena", because: "Sorghum’s root oil is a weed tool. Then it must leave." },
      { from: "mesquite", to: "leucaena", because: "A second deep fixer on caliche — phosphorus as well as nitrogen." },
    ],
    years: [
      { when: "First", what: "Windbreak and coppice." },
      { when: "Seasonal", what: "Sorghum in the alley. Never graduate this into tomatoes." },
    ],
    watch: [
      "Mimosine plus cineole is not a food forest. It is management.",
      "Do not graze unadapted cattle on fresh leucaena.",
      "Keep this far from apple, vegetable clover, and any truffle host.",
    ],
    terms: ["cineole", "mimosine", "sorgoleone", "allelopathy", "nitrogen fixer", "alley cropping"],
  },
];

export const STORY_BY_ID: Record<string, GuildStory> = Object.fromEntries(
  STORIES.map((s) => [s.id, s]),
) as Record<string, GuildStory>;

export function nameOf(id: string) {
  return SPECIES_BY_ID[id]?.name ?? id;
}

export function guildFuel(memberIds: string[]) {
  const totals = {} as Record<NutrientKey, number>;
  for (const id of memberIds) {
    const sp = SPECIES_BY_ID[id];
    if (!sp) continue;
    for (const n of NUTRIENT_META) {
      totals[n.key] = (totals[n.key] ?? 0) + (sp.nutrients[n.key] ?? 0);
    }
  }
  return NUTRIENT_META.map((n) => ({
    ...n,
    score: totals[n.key] ?? 0,
    guide: GUIDE_BY_KEY[n.key],
    sources: memberIds
      .map((id) => SPECIES_BY_ID[id])
      .filter((sp): sp is NonNullable<typeof sp> => !!sp && (sp.nutrients[n.key] ?? 0) >= 20)
      .sort((a, b) => (b.nutrients[n.key] ?? 0) - (a.nutrients[n.key] ?? 0))
      .slice(0, 3),
  }))
    .filter((n) => n.score >= 24)
    .sort((a, b) => b.score - a.score);
}

export function guildByStory(id: string) {
  return GUILDS.find((g) => g.id === id) ?? GUILDS[0];
}
