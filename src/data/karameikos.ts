import { HexTag } from "../flavours";
import { HexData } from "../state/terrain";
import { Unit } from "../state/units";
import { Force, HexBorder, HexLocation, QuickForce } from "../types";
import { row, xy } from "./tools";

const rebel: HexTag = "Black Eagle";
const loyal: HexTag = "Karameikos";

export const hexData: HexData[] = [
  ...row(0, 1, "HHHHHHhHHHHHHHHhHhHHhhhhHhHHhhhhhhhHHHHHHHHHHHhhHHHhHHHhh", [
    loyal,
    [10, 12],
    [43, 53],
  ]),
  ...row(1, 1, "HhHhhhhHhhHHHHHHhhHHhhhhHHHHHhhhhHHhhHHHHHhHHHhHHHHHHHHHH", [
    loyal,
    [8, 15],
    [41, 53],
  ]),
  ...row(2, 1, "HhHhhhhhhhhHHhhHHhHHHhhHhhhhhhHhhHHHHHHhHHhHHHhHHHHHHHhHH", [
    loyal,
    [6, 16],
    [39, 53],
  ]),
  ...row(3, 1, "hhhhhhhhhhHHhHhHHHhHHHHHHHHHHHHHhhHHHHHhHHhHHhhhhhhHHhHhH", [
    loyal,
    [6, 18],
    [37, 53],
  ]),
  ...row(4, 1, "hhhhhhhhhhhhhhHHhhHHHHHHHHHHHHHhHHHHHHhhhHhhhhhhhhHHhhHhH", [
    loyal,
    [6, 21],
    [35, 53],
  ]),
  ...row(5, 1, "hhhhhhggghhhhhHHhhHHHHHHHHHHHHHHHHHHHHHhhhhhhhhhhHHHHHHhh", [
    loyal,
    [6, 53],
  ]),
  ...row(6, 1, "hhhhggggghhhhhhhhhHhHHHHHHHhHHHHHHhhhHhhhhhhhhhhhhhhHHhHh", [
    loyal,
    [6, 53],
  ]),
  ...row(7, 1, "hhhhggggggghhhhhhhhhhHhHHHHhHHhHhHHHhhhhhhhhhhhhhhHHHHhhh", [
    loyal,
    [6, 53],
  ]),
  ...row(8, 1, "HhhhggggggghhhhhhhhhhhHHHHHhhHhHHhhHhhhhhhhhhhhhhhHHhhhhh", [
    loyal,
    [6, 53],
  ]),
  ...row(9, 1, "hhhhggggggggghghghhhhHHhhHHhhHhHHhhhhhhhhhhhhhhhhhHHhhhhh", [
    loyal,
    [6, 53],
  ]),
  ...row(10, 1, "hhhhhgwwwgggggggghhhhhhhhHhHhhhhhhhhhhhhhhhhhhhhhhHhhhhhw", [
    loyal,
    [6, 53],
  ]),
  ...row(11, 1, "hhghgwwwwwwghhhhhhhhhhhhhHhHHhhhhhhhhhhhhhhhhhhhhhhhhwwww", [
    loyal,
    [6, 57],
  ]),
  ...row(12, 1, "gggggwwwwwwwhhhhhhhhhhhhhhghhhhhhhghghghhhgghhhhhhhhhwwww", [
    loyal,
    [6, 57],
  ]),
  ...row(13, 1, "ggggggmwwwwwhhhhhhhhhhggggggghhhhhggggghgwggghhhhhhhhhhww", [
    loyal,
    [6, 57],
  ]),
  ...row(14, 1, "hgggggmmmwgwhhhhhhhhhhwgggggghwhhhggggggwwgggghhhhhhhhwww", [
    loyal,
    [6, 57],
  ]),
  ...row(15, 1, "gggggmmmmgggghhhhhhhhwwggggggwwwhhgggggwwgggghwwwhhhhwwww", [
    loyal,
    [6, 57],
  ]),
  ...row(
    16,
    1,
    "ggggmmmmmgggghhhhhwhwhwwwgggwwwwwhggwwwwwgwgwwwwwhhhwwwww",
    [rebel, 13],
    [loyal, [6, 12], [14, 57]],
  ),
  ...row(
    17,
    1,
    "ggsgsssmmgggghhwhhwwgwgwwwgwwwwwwggggwwwwwwwwwwwwwwwwwwww",
    [rebel, [8, 13]],
    [loyal, [14, 57]],
  ),
  ...row(
    18,
    1,
    "ggsssssssggggghhwwwwgggggwwwwwgwggggggwwwwwwwwwwwwwwwwwww",
    [rebel, [10, 13]],
    [loyal, [14, 57]],
  ),
  ...row(
    19,
    1,
    "ggssssssssgggghhhhgwgggggwwwggggggggggwwwwwwwwwwwwwwwwwww",
    [rebel, 11, 12],
    [loyal, [13, 57]],
  ),
  ...row(
    20,
    1,
    "gsssssssssggghhhhhgggggggggggggggggggwwwwwwwwwwwwwwwwwwww",
    [rebel, 11, 12],
    [loyal, [13, 57]],
  ),
  ...row(
    21,
    1,
    "gssssssssgggghhhgggggggggggggggggggggwwwwwwwwwwwwwwwwwwgg",
    [rebel, [10, 12]],
    [loyal, [13, 56]],
  ),
  ...row(
    22,
    1,
    "sssssssssgggggghgggggggggggggggggggggggggwwwwwwwwwwwggggg",
    [rebel, 10],
    [loyal, [11, 54]],
  ),
  ...row(23, 1, "ssssssssssgggggggggggggggggggggggggggggggwwwwwwwwwwwggggg", [
    loyal,
    [6, 53],
  ]),
  ...row(24, 1, "sssssssssssgggggggggggggggggggggggggggggswsgswwwwwsssgsgs", [
    loyal,
    [6, 53],
  ]),
  ...row(25, 1, "sssssssssssssgggggggggggggggggggggggggssssssssswsssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(26, 1, "sssssssssssssggggggggggssssgsggggggggssssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(27, 1, "ssssssssssssssggggggsssssssssggggggggggssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(28, 1, "ssssssssssssssgggggggssssssssssggggggggssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(29, 1, "sssssssssssssssgssggggssssssssssgggggggssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(30, 1, "sssssssssssssssssssgssssssssssssgggggggssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(31, 1, "sssssssssssssssssssssssssssssssggssssggssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(32, 1, "sssssssssssssssssssssssssssssssggsssssgssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
  ...row(33, 1, "sssssssssssssssssssssssssssssssgsssssssssssssssssssssssss", [
    loyal,
    [6, 53],
  ]),
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

  // Grand Duchy of Karameikos
  border(6, 16, 2, 4, 2),
  border(6, 15, 2, 4, 2),
  border(6, 14, 2, 4, 2),
  border(6, 13, 2, 4, 2),
  border(6, 12, 2, 4, 2),
  border(6, 11, 2, 4, 2),
  border(6, 10, 2, 4, 2),
  border(6, 9, 2, 4, 2),
  border(6, 8, 2, 4, 2),
  border(6, 7, 2, 4, 2),
  border(6, 6, 2, 4, 2),
  border(6, 5, 2, 4, 2),
  border(6, 4, 2, 4, 2),
  border(6, 3, 2, 4, 2),
  border(6, 2, 2, 5, 2),
  border(7, 1, 3, 5, 2),
  border(8, 1, 3, 5, 2),
  border(9, 0, 3, 5, 2),
  border(10, 0, 3, 5, 2),
  border(12, 0, 4, 6, 2),
  border(13, 0, 4, 6, 2),
  border(14, 1, 4, 6, 2),
  border(15, 1, 4, 6, 2),
  border(16, 2, 4, 6, 2),
  border(17, 2, 4, 6, 2),
  border(18, 3, 4, 6, 2),
  border(19, 3, 4, 6, 2),
  border(20, 4, 4, 6, 2),
  border(21, 4, 4, 6, 2),
  border(22, 5, 4, 6, 2),
  border(23, 5, 4, 5, 2),
  border(24, 5, 3, 6, 2),
  border(25, 5, 4, 5, 2),
  border(26, 5, 3, 6, 2),
  border(27, 5, 4, 5, 2),
  border(28, 5, 3, 6, 2),
  border(29, 5, 4, 5, 2),
  border(30, 5, 3, 6, 2),
  border(31, 5, 4, 5, 2),
  border(32, 5, 3, 6, 2),
  border(33, 5, 4, 5, 2),
  border(34, 5, 3, 5, 2),
  border(35, 4, 3, 5, 2),
  border(36, 4, 3, 5, 2),
  border(37, 3, 3, 5, 2),
  border(38, 3, 3, 5, 2),
  border(39, 2, 3, 5, 2),
  border(40, 2, 3, 5, 2),
  border(41, 1, 3, 5, 2),
  border(42, 1, 3, 5, 2),
  border(43, 0, 3, 5, 2),
  border(53, 0, 5, 7, 2),
  border(53, 1, 5, 7, 2),
  border(53, 2, 5, 7, 2),
  border(53, 3, 5, 7, 2),
  border(53, 4, 5, 7, 2),
  border(53, 5, 5, 7, 2),
  border(53, 6, 5, 7, 2),
  border(53, 7, 5, 7, 2),
  border(53, 8, 5, 7, 2),
  border(53, 9, 5, 7, 2),
  border(53, 10, 5, 6, 2),
  border(54, 11, 4, 6, 2),
  border(55, 11, 4, 5, 2),
  border(56, 11, 3, 6, 2),
  border(57, 11, 4, 5, 2),
  border(57, 20, 0, 2, 2),
  border(56, 21, 0, 2, 2),
  border(55, 21, 0, 2, 2),
  border(54, 22, 0, 2, 2),
  border(53, 22, 0, 1, 2),
  border(53, 23, 5, 7, 2),
];

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

For this scenario, the Eastern Elves are all equipped with silver weapons, Thyatian mercenaries start on the coast road, at the border of the Grand Duchy. Lycanthropes begin at Wereskalot.
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

export const scenario3Units: Unit[] = [
  {
    id: BlackEagleGuard.name,
    side: 2,
    liegeTag: rebel,
    type: "normal",
    force: BlackEagleGuard,
    ...positions["Black Eagle Guard"],
  },
  {
    id: EasternGoblins.name,
    side: 2,
    type: "quick",
    force: EasternGoblins,
    ...positions["Goblins E"],
  },
  {
    id: Bugbears.name,
    side: 2,
    type: "quick",
    force: Bugbears,
    ...positions["Bugbears"],
  },
  {
    id: NorthEasternGoblins.name,
    side: 2,
    type: "quick",
    force: NorthEasternGoblins,
    ...positions["Goblins NE"],
  },
  {
    id: Orcs.name,
    side: 2,
    type: "quick",
    force: Orcs,
    ...positions["Orcs"],
  },
  {
    id: Lycanthropes.name,
    side: 2,
    type: "quick",
    force: Lycanthropes,
    ...positions["Were-creatures"],
  },
  {
    id: DucalGuard.name,
    side: 1,
    liegeTag: loyal,
    type: "normal",
    force: DucalGuard,
    ...positions["Ducal Guard"],
  },
  {
    id: MenOfKelven.name,
    side: 1,
    liegeTag: loyal,
    type: "normal",
    force: MenOfKelven,
    ...positions["Men of Kelven"],
  },
  {
    id: WesternElves.name,
    side: 1,
    type: "normal",
    force: WesternElves,
    ...positions["Western Elves"],
  },
  {
    id: Gnomes.name,
    side: 1,
    type: "quick",
    force: Gnomes,
    ...positions["Gnomes"],
  },
  {
    id: EasternElves.name,
    side: 1,
    type: "normal",
    force: EasternElves,
    ...positions["Eastern Elves"],
  },
  {
    id: ThyatianMercenaries.name,
    side: 1,
    type: "normal",
    force: ThyatianMercenaries,
    ...positions["Thyatian Mercenaries"],
  },
];
