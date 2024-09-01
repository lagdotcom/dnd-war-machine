import {
  Force,
  HexBorder,
  HexData,
  HexLocation,
  QuickForce,
  XY,
  XYTag,
} from "../types";

const hex = (terrain: string, x: number, y: number): HexData => ({
  x,
  y,
  terrain,
});

const conversions: Record<string, string> = {
  h: "hill",
  H: "mountain",
  g: "grass",
  w: "wood",
  m: "marsh",
  s: "sea",
};

function* row(y: number, x: number, data: string) {
  for (const ch of data) {
    const terrain = conversions[ch];
    if (terrain) yield hex(terrain, x, y);
    x++;
  }
}

// square = castle
// empty square = ruins
// star circle = capitol
// circle circle = city
// circle = town
// empty circle = village

export const hexData: HexData[] = [
  ...row(0, 1, "HHHHHHhHHHHHHHHhHhHHhhhhHhHHhhhhhhhHHHHHHHHHHHhhHHHhHHHhh"),
  ...row(1, 1, "HhHhhhhHhhHHHHHHhhHHhhhhHHHHHhhhhHHhhHHHHHhHHHhHHHHHHHHHH"),
  ...row(2, 1, "HhHhhhhhhhhHHhhHHhHHHhhHhhhhhhHhhHHHHHHhHHhHHHhHHHHHHHhHH"),
  ...row(3, 1, "hhhhhhhhhhHHhHhHHHhHHHHHHHHHHHHHhhHHHHHhHHhHHhhhhhhHHhHhH"),
  ...row(4, 1, "hhhhhhhhhhhhhhHHhhHHHHHHHHHHHHHhHHHHHHhhhHhhhhhhhhHHhhHhH"),
  ...row(5, 1, "hhhhhhggghhhhhHHhhHHHHHHHHHHHHHHHHHHHHHhhhhhhhhhhHHHHHHhh"),
  ...row(6, 1, "hhhhggggghhhhhhhhhHhHHHHHHHhHHHHHHhhhHhhhhhhhhhhhhhhHHhHh"),
  ...row(7, 1, "hhhhggggggghhhhhhhhhhHhHHHHhHHhHhHHHhhhhhhhhhhhhhhHHHHhhh"),
  ...row(8, 1, "HhhhggggggghhhhhhhhhhhHHHHHhhHhHHhhHhhhhhhhhhhhhhhHHhhhhh"),
  ...row(9, 1, "hhhhggggggggghghghhhhHHhhHHhhHhHHhhhhhhhhhhhhhhhhhHHhhhhh"),
  ...row(10, 1, "hhhhhgwwwgggggggghhhhhhhhHhHhhhhhhhhhhhhhhhhhhhhhhHhhhhhw"),
  ...row(11, 1, "hhghgwwwwwwghhhhhhhhhhhhhHhHHhhhhhhhhhhhhhhhhhhhhhhhhwwww"),
  ...row(12, 1, "gggggwwwwwwwhhhhhhhhhhhhhhghhhhhhhghghghhhgghhhhhhhhhwwww"),
  ...row(13, 1, "ggggggmwwwwwhhhhhhhhhhggggggghhhhhggggghgwggghhhhhhhhhhww"),
  ...row(14, 1, "hgggggmmmwgwhhhhhhhhhhwgggggghwhhhggggggwwgggghhhhhhhhwww"),
  ...row(15, 1, "gggggmmmmgggghhhhhhhhwwggggggwwwhhgggggwwgggghwwwhhhhwwww"),
  ...row(16, 1, "ggggmmmmmgggghhhhhwhwhwwwgggwwwwwhggwwwwwgwgwwwwwhhhwwwww"),
  ...row(17, 1, "ggsgsssmmgggghhwhhwwgwgwwwgwwwwwwggggwwwwwwwwwwwwwwwwwwww"),
  ...row(18, 1, "ggsssssssggggghhwwwwgggggwwwwwgwggggggwwwwwwwwwwwwwwwwwww"),
  ...row(19, 1, "ggssssssssgggghhhhgwgggggwwwggggggggggwwwwwwwwwwwwwwwwwww"),
  ...row(20, 1, "gsssssssssggghhhhhgggggggggggggggggggwwwwwwwwwwwwwwwwwwww"),
  ...row(21, 1, "gssssssssgggghhhgggggggggggggggggggggwwwwwwwwwwwwwwwwwwgg"),
  ...row(22, 1, "sssssssssgggggghgggggggggggggggggggggggggwwwwwwwwwwwggggg"),
  ...row(23, 1, "ssssssssssgggggggggggggggggggggggggggggggwwwwwwwwwwwggggg"),
  ...row(24, 1, "sssssssssssgggggggggggggggggggggggggggggswsgswwwwwsssgsgs"),
  ...row(25, 1, "sssssssssssssgggggggggggggggggggggggggssssssssswsssssssss"),
  ...row(26, 1, "sssssssssssssggggggggggssssgsggggggggssssssssssssssssssss"),
  ...row(27, 1, "ssssssssssssssggggggsssssssssggggggggggssssssssssssssssss"),
  ...row(28, 1, "ssssssssssssssgggggggssssssssssggggggggssssssssssssssssss"),
  ...row(29, 1, "sssssssssssssssgssggggssssssssssgggggggssssssssssssssssss"),
  ...row(30, 1, "sssssssssssssssssssgssssssssssssgggggggssssssssssssssssss"),
  ...row(31, 1, "sssssssssssssssssssssssssssssssggssssggssssssssssssssssss"),
  ...row(32, 1, "sssssssssssssssssssssssssssssssggsssssgssssssssssssssssss"),
  ...row(33, 1, "sssssssssssssssssssssssssssssssgsssssssssssssssssssssssss"),
];

export const locations: HexLocation[] = [
  { x: 29, y: 8, type: "village", name: "Threshold" },
  { x: 3, y: 11, type: "ruins", name: "Wereskalot" },
  { x: 50, y: 12, type: "village", name: "Haven" },
  { x: 35, y: 15, type: "village", name: "Kelven" },
  { x: 18, y: 17, type: "castle", name: "Haunted Keep" },
  { x: 11, y: 19, type: "castle", name: "Fort Doom" },
  { x: 31, y: 23, type: "castle", name: "Krakatos" },
  { x: 26, y: 25, type: "castle", name: "Estate of Marilenev" },
  { x: 28, y: 26, type: "capitol", name: "Specularum" },
];

export const territories: Record<string, XYTag[]> = {
  "Black Eagle": [
    "13,16",
    "8,17",
    "9,17",
    "10,17",
    "11,17",
    "12,17",
    "10,18",
    "11,18",
    "12,18",
    "13,18",
    "11,19",
    "12,19",
    "11,20",
    "12,20",
    "10,21",
    "11,21",
    "12,21",
    "10,22",
  ],
  Karameikos: [
    /// TODO OH GOD SO MUCH
  ],
};

const border = (
  x: number,
  y: number,
  start: number,
  end: number,
  thickness = 1,
): HexBorder => ({ x, y, thickness, start, end });

export const borders = [
  // Black Eagle Barony
  border(8, 17, 3, 6),
  border(9, 17, 4, 5),
  border(10, 17, 3, 6),
  border(11, 17, 4, 5),
  border(12, 17, 3, 5),
  border(13, 16, 3, 7),
  border(13, 17, 5, 7),
  border(13, 18, 5, 8),
  border(12, 19, 0, 1),
  border(12, 20, 5, 7),
  border(12, 21, 5, 8),
  border(11, 21, 0, 2),
  border(10, 22, 0, 2),
];

const xy = (x: number, y: number): XY => ({ x, y });

export const positions = {
  "Black Eagle Guard": xy(11, 19),
  "Goblins E": xy(49, 19),
  "Goblins NE": xy(43, 6),
  Orcs: xy(52, 11),
  Bugbears: xy(20, 21),
  "Were-creatures": xy(3, 11),

  "Ducal Guard": xy(28, 26),
  "Men of Kelven": xy(35, 15),
  "Thyatian Mercenaries": xy(54, 23),
  "Western Elves": xy(31, 16),
  "Eastern Elves": xy(55, 16),
  Gnomes: xy(33, 10),
};

/* The Fall of the Black Eagle

This adventure is designed for use with the War Machine mass combat system. Any level character may participate.

The DM and players should organize the troops into Forces, and calculate their ratings (BFR, Troop Class, and RR), With that information, you can play a series of battles that should result in the defeat and destruction of the infamous Black Eagle Barony (of the D&D Expert Set). PCs may participate in the process if these scenarios do not conflict with the Campaign (DM's choice). If the Campaign requires the continued existence of the Barony as an evil Force, use the scenarios as a separate game, with no connection to the Campaign.

Use Map #1 in the Expert Set (page 32) to display and resolve the following scenarios.

The scale of the map is 6 miles per hex.

The Situation

The tenuous trading route along the River Highreach is the economic lifeline of Specularum. Kelven, at the intersection of 3 branches of the Highreach, is the key to the river's defense.

Baron Ludwig "Black Eagle" von Hendricks has long hated the yoke of restraint placed upon him by Archduke Stefan Karameikos. The Baron now feels strong enough to challenge the Archduke. The town of Kelven is the ideal location, since the Archduke must bring his army into the field to fight. In the open, the Baron feels that he could win.

The Sides

The underlying conflict of this brief war is between the Black Eagle Barony and the Grand Duchy of Karameikos, These sides remain opposed in each of the following scenarios, and allies join each- The following chart aligns all the opposing forces involved:

Black Eagle:
Black Eagle Guard (Barony)
Goblins E (east of Kelven)
Goblins NE (between northeast branches of the river)
Orcs (tip of eastern mountains)
Bugbears (east of hills near barony?)
Were-creatures (Wereskalot, just over the border)

Specularum:
Ducal Guard (Specularum)
Men of Kelven (Kelven)
Thyatian Mercenaries (coast road at border)
Western Elves (nearest to Kelven)
Eastern Elves (right side of the map)
Gnomes (southeast of Threshold)

Rules

Use a "time unit" of one day for these scenarios, (See the War Machine for its use.)

It takes the Leaders some time to coordinate their widely spread forces. To reflect this, each side can move one force on the first day, two forces on the second day, and so forth.

Only Fort Doom and Specularum are “strongholds” for these scenarios. When their armies are out fighting, each stronghold keeps a defensive force of 100 troops of the same type as the Guards. Other towns, ruins, and estates on the map are “walled” (for the War Machine defense factors).

In Black Eagle Barony, the Black Eagle Guard (only) is in the territory of its liege. The Ducal Guard and Men of Kelven arc in the territory of their liege everywhere in the Grand Duchy except in that Barony.

On Map #1, each force must begin each scenario within one hex of the word identifying its home territory. The Black Eagle Guard starts anywhere within the Barony, but the Ducal Guard's home is Specularum, The Western Elves are those nearest to Kelven; the Eastern Elves are near the right side of the map. “Goblins E” are the goblins east of Kelven; “Goblins NE” are those between the northeast branches of the river. The goblins and kobolds north of the Lost Valley (outside of the Grand Duchy) do not participate.

Scenarios

The following three scenarios do not go together; each is a different version of the whole war, involving different forces. Use the War Machine rules for initiative, movement, and combat. Any Optional rule may be used if the players agree before starting. Each scenario continues until one player surrenders or has no unrouted units in the field.

The Baron's objective is to occupy and hold the town of Kelven.
The Archduke’s objective is to destroy the forces of the Baron.

Scenario #1 Forces:
Black Eagle Guard
GoblinsE
Bugbears

Ducal Guard
Men of Kelven
Western Elves
Gnomes

Scenario #2 Forces:
Black Eagle Guard
GoblinsE
Bugbears
GoblinsNE
Orcs

Ducal Guard
Men of Kelven
Western Elves
Gnomes
Eastern Elves

Scenario #3 Forces:
Black Eagle Guard
GoblinsE
Bugbears
GoblinsNE
Orcs
Lycanthropes

Ducal Guard
Men of Kelven
Western Elves
Gnomes
Eastern Elves
Thyatian Mercenaries

For this scenario, the Eastern Elves are all equipped with silver weapons, Thyatian mer¬ cenaries start on the coast road, at the border of the Grand Duchy. Lycanthropes begin at Wereskalot.
*/

const Average = 5;
const Good = 10;
const Excellent = 15;

export const BlackEagleGuard: Force = {
  name: "Black Eagle Guard",
  numberOfTroops: 200,
  leaderLevel: 15,
  leaderAbilityBonus: 3,
  percentageNameLevelChar: 3,
  averageOfficerLevel: 6,
  averageTroopLevel: 1,
  weeksTraining: 20,
  weeksTrainingWithLeader: 12,
  monthsTogether: 12,
  pastVictories: 4,
  pastRouts: 0,
  weaponsQuality: Excellent,
  weaponsPerTroop: 2,
  averageAC: 4,
  percentageSpecial: 0,
  missileTroops: 50,
  longRangeMissileTroops: 0,
  magicalTroops: 0,
  spellcasters: 12,
  mountedTroops: 200,
  flyingTroops: 0,
  averageMovement: 120,
};

export const MenOfKelven: Force = {
  name: "Men of Kelven",
  numberOfTroops: 80,
  leaderLevel: 4,
  leaderAbilityBonus: 1,
  percentageNameLevelChar: 0,
  averageOfficerLevel: 2,
  averageTroopLevel: 1,
  weeksTraining: 4,
  weeksTrainingWithLeader: 4,
  monthsTogether: 1,
  pastVictories: 0,
  pastRouts: 0,
  weaponsQuality: Average,
  weaponsPerTroop: 1,
  averageAC: 8,
  percentageSpecial: 0,
  missileTroops: 40,
  longRangeMissileTroops: 0,
  magicalTroops: 0,
  spellcasters: 1,
  mountedTroops: 0,
  flyingTroops: 0,
  averageMovement: 120,
};

export const DucalGuard: Force = {
  name: "Ducal Guard",
  numberOfTroops: 500,
  leaderLevel: 18,
  leaderAbilityBonus: 3,
  percentageNameLevelChar: 1,
  averageOfficerLevel: 4,
  averageTroopLevel: 1,
  weeksTraining: 12,
  weeksTrainingWithLeader: 4,
  monthsTogether: 12,
  pastVictories: 6,
  pastRouts: 0,
  weaponsQuality: Good,
  weaponsPerTroop: 2,
  averageAC: 5,
  percentageSpecial: 0,
  missileTroops: 200,
  longRangeMissileTroops: 0,
  magicalTroops: 0,
  spellcasters: 21,
  mountedTroops: 100,
  flyingTroops: 0,
  averageMovement: 90,
};

export const WesternElves: Force = {
  name: "Western Elves",
  numberOfTroops: 100,
  leaderLevel: 5,
  leaderAbilityBonus: 1,
  percentageNameLevelChar: 0,
  averageOfficerLevel: 2,
  averageTroopLevel: 1,
  weeksTraining: 12,
  weeksTrainingWithLeader: 12,
  monthsTogether: 3,
  pastVictories: 3,
  pastRouts: 0,
  weaponsQuality: Good,
  weaponsPerTroop: 2,
  averageAC: 7,
  demihuman: true,
  percentageSpecial: 0,
  missileTroops: 50,
  longRangeMissileTroops: 50,
  magicalTroops: 0,
  spellcasters: 100,
  mountedTroops: 0,
  flyingTroops: 0,
  averageMovement: 120,
};

export const EasternElves: Force = {
  name: "Eastern Elves",
  numberOfTroops: 250,
  leaderLevel: 6,
  leaderAbilityBonus: 2,
  percentageNameLevelChar: 0,
  averageOfficerLevel: 3,
  averageTroopLevel: 1,
  weeksTraining: 14,
  weeksTrainingWithLeader: 8,
  monthsTogether: 3,
  pastVictories: 3,
  pastRouts: 0,
  weaponsQuality: Good,
  weaponsPerTroop: 2,
  averageAC: 7,
  demihuman: true,
  percentageSpecial: 0,
  missileTroops: 50,
  longRangeMissileTroops: 50,
  magicalTroops: 0,
  spellcasters: 50,
  mountedTroops: 0,
  flyingTroops: 20,
  averageMovement: 120,
};

export const ThyatianMercenaries: Force = {
  name: "Thyatian Mercenaries",
  numberOfTroops: 800,
  leaderLevel: 16,
  leaderAbilityBonus: 2,
  percentageNameLevelChar: 4,
  averageOfficerLevel: 7,
  averageTroopLevel: 1,
  weeksTraining: 18,
  weeksTrainingWithLeader: 8,
  monthsTogether: 12,
  pastVictories: 8,
  pastRouts: 0,
  weaponsQuality: Good,
  weaponsPerTroop: 2,
  averageAC: 4,
  percentageSpecial: 0,
  missileTroops: 200,
  longRangeMissileTroops: 0,
  magicalTroops: 0,
  spellcasters: 80,
  mountedTroops: 200,
  flyingTroops: 0,
  averageMovement: 90,
};

export const Gnomes: QuickForce = {
  name: "Gnomes",
  numberOfTroops: 150,
  leaderLevel: 4,
  averageHitDice: 1,
  highestMaximumDamagePerRound: 8,
  hasArchers: true,
};

export const Orcs: QuickForce = {
  name: "Orcs",
  numberOfTroops: 300,
  leaderLevel: 3,
  averageHitDice: 1,
  highestMaximumDamagePerRound: 8,
  hasArchers: true,
};

export const Bugbears: QuickForce = {
  name: "Bugbears",
  numberOfTroops: 80,
  leaderLevel: 5,
  averageHitDice: 3,
  highestMaximumDamagePerRound: 9,
};

export const EasternGoblins: QuickForce = {
  name: "Goblins E",
  numberOfTroops: 300,
  leaderLevel: 3,
  averageHitDice: 1.1,
  highestMaximumDamagePerRound: 6,
};

export const NorthEasternGoblins: QuickForce = {
  name: "Goblins NE",
  numberOfTroops: 300,
  leaderLevel: 3,
  averageHitDice: 1.1,
  highestMaximumDamagePerRound: 6,
};

export const Lycanthropes: QuickForce = {
  name: "Lycanthropes",
  numberOfTroops: 100,
  leaderLevel: 7,
  averageHitDice: 4,
  highestMaximumDamagePerRound: 8,
  hasArchers: true,
  hasMagicalBeings: true,
};
