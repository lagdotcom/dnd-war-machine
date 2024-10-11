import { HexTag, Pixels } from "../flavours";
import { Unit } from "../state/units";
import { Fatigue, Force, QuickForce, XY } from "../types";
import MapBuilder from "./MapBuilder";
import { xy } from "./tools";

const rebel: HexTag = "Black Eagle";
const loyal: HexTag = "Karameikos";

const map = new MapBuilder();

map.terrain(
  1,
  0,
  `
HHHHHHhHHHHHHHHhHhHHhhhhHhHHhhhhhhhHHHHHHHHHHHhhHHHhHHHhh
HhHhhhhHhhHHHHHHhhHHhhhhHHHHHhhhhHHhhHHHHHhHHHhHHHHHHHHHH
HhHhhhhhhhhHHhhHHhHHHhhHhhhhhhHhhHHHHHHhHHhHHHhHHHHHHHhHH
hhhhhhhhhhHHhHhHHHhHHHHHHHHHHHHHhhHHHHHhHHhHHhhhhhhHHhHhH
hhhhhhhhhhhhhhHHhhHHHHHHHHHHHHHhHHHHHHhhhHhhhhhhhhHHhhHhH
hhhhhhggghhhhhHHhhHHHHHHHHHHHHHHHHHHHHHhhhhhhhhhhHHHHHHhh
hhhhggggghhhhhhhhhHhHHHHHHHhHHHHHHhhhHhhhhhhhhhhhhhhHHhHh
hhhhggggggghhhhhhhhhhHhHHHHhHHhHhHHHhhhhhhhhhhhhhhHHHHhhh
HhhhggggggghhhhhhhhhhhHHHHHhhHhHHhhHhhhhhhhhhhhhhhHHhhhhh
hhhhggggggggghghghhhhHHhhHHhhHhHHhhhhhhhhhhhhhhhhhHHhhhhh
hhhhhgwwwgggggggghhhhhhhhHhHhhhhhhhhhhhhhhhhhhhhhhHhhhhhw
hhghgwwwwwwghhhhhhhhhhhhhHhHHhhhhhhhhhhhhhhhhhhhhhhhhwwww
gggggwwwwwwwhhhhhhhhhhhhhhghhhhhhhghghghhhgghhhhhhhhhwwww
ggggggmwwwwwhhhhhhhhhhggggggghhhhhggggghgwggghhhhhhhhhhww
hgggggmmmwgwhhhhhhhhhhwgggggghwhhhggggggwwgggghhhhhhhhwww
gggggmmmmgggghhhhhhhhwwggggggwwwhhgggggwwgggghwwwhhhhwwww
ggggmmmmmgggghhhhhwhwhwwwgggwwwwwhggwwwwwgwgwwwwwhhhwwwww
ggsgsssmmgggghhwhhwwgwgwwwgwwwwwwggggwwwwwwwwwwwwwwwwwwww
ggsssssssggggghhwwwwgggggwwwwwgwggggggwwwwwwwwwwwwwwwwwww
ggssssssssgggghhhhgwgggggwwwggggggggggwwwwwwwwwwwwwwwwwww
gsssssssssggghhhhhgggggggggggggggggggwwwwwwwwwwwwwwwwwwww
gssssssssgggghhhgggggggggggggggggggggwwwwwwwwwwwwwwwwwwgg
sssssssssgggggghgggggggggggggggggggggggggwwwwwwwwwwwggggg
ssssssssssgggggggggggggggggggggggggggggggwwwwwwwwwwwggggg
sssssssssssgggggggggggggggggggggggggggggswsgswwwwwsssgsgs
sssssssssssssgggggggggggggggggggggggggssssssssswsssssssss
sssssssssssssggggggggggssssgsggggggggssssssssssssssssssss
ssssssssssssssggggggsssssssssggggggggggssssssssssssssssss
ssssssssssssssgggggggssssssssssggggggggssssssssssssssssss
sssssssssssssssgssggggssssssssssgggggggssssssssssssssssss
sssssssssssssssssssgssssssssssssgggggggssssssssssssssssss
sssssssssssssssssssssssssssssssggssssggssssssssssssssssss
sssssssssssssssssssssssssssssssggsssssgssssssssssssssssss
sssssssssssssssssssssssssssssssgsssssssssssssssssssssssss`,
);

map.tag(loyal, 0, 10, 12);
map.tag(loyal, 0, 43, 53);
map.tag(loyal, 1, 8, 15);
map.tag(loyal, 1, 41, 53);
map.tag(loyal, 2, 6, 16);
map.tag(loyal, 2, 39, 53);
map.tag(loyal, 3, 6, 18);
map.tag(loyal, 3, 37, 53);
map.tag(loyal, 4, 6, 21);
map.tag(loyal, 4, 35, 53);
map.tag(loyal, 5, 6, 53);
map.tag(loyal, 6, 6, 53);
map.tag(loyal, 7, 6, 53);
map.tag(loyal, 8, 6, 53);
map.tag(loyal, 9, 6, 53);
map.tag(loyal, 10, 6, 53);
map.tag(loyal, 11, 6, 57);
map.tag(loyal, 12, 6, 57);
map.tag(loyal, 13, 6, 57);
map.tag(loyal, 14, 6, 57);
map.tag(loyal, 15, 6, 57);
map.tag(loyal, 16, 6, 12);
map.tag(loyal, 16, 14, 57);
map.tag(loyal, 17, 14, 57);
map.tag(loyal, 18, 14, 57);
map.tag(loyal, 19, 13, 57);
map.tag(loyal, 20, 13, 57);
map.tag(loyal, 21, 13, 56);
map.tag(loyal, 22, 11, 54);
map.tag(loyal, 23, 6, 53);
map.tag(loyal, 24, 6, 53);
map.tag(loyal, 25, 6, 53);
map.tag(loyal, 26, 6, 53);
map.tag(loyal, 27, 6, 53);
map.tag(loyal, 28, 6, 53);
map.tag(loyal, 29, 6, 53);
map.tag(loyal, 30, 6, 53);
map.tag(loyal, 31, 6, 53);
map.tag(loyal, 32, 6, 53);
map.tag(loyal, 33, 6, 53);

map.tag(rebel, 16, 13, 13);
map.tag(rebel, 17, 8, 13);
map.tag(rebel, 18, 10, 13);
map.tag(rebel, 19, 11, 12);
map.tag(rebel, 20, 11, 12);
map.tag(rebel, 21, 10, 12);
map.tag(rebel, 22, 10, 10);

map.settlement(29, 8, "village", "Threshold", "walled");
map.settlement(3, 11, "ruins", "Wereskalot", "walled");
map.settlement(50, 12, "village", "Haven", "walled");
map.settlement(35, 15, "village", "Kelven", "walled");
map.settlement(18, 17, "castle", "Haunted Keep", "walled");
map.settlement(11, 19, "castle", "Fort Doom", "stronghold");
map.settlement(31, 23, "castle", "Krakatos", "walled");
map.settlement(26, 25, "castle", "Estate of Marilenev", "walled");
map.settlement(28, 26, "capitol", "Specularum", "stronghold");

// Black Eagle Barony
const barony: Pixels = 1;
map.border(8, 17, 3, 6, barony);
map.border(9, 17, 4, 5, barony);
map.border(10, 17, 3, 6, barony);
map.border(11, 17, 4, 5, barony);
map.border(12, 17, 3, 5, barony);
map.border(13, 16, 3, 7, barony);
map.border(13, 17, 5, 7, barony);
map.border(13, 18, 5, 8, barony);
map.border(12, 19, 0, 1, barony);
map.border(12, 20, 5, 7, barony);
map.border(12, 21, 5, 8, barony);
map.border(11, 21, 0, 2, barony);
map.border(10, 22, 0, 2, barony);

// Grand Duchy of Karameikos
const grandDuchy: Pixels = 2;
map.border(6, 16, 2, 4, grandDuchy);
map.border(6, 15, 2, 4, grandDuchy);
map.border(6, 14, 2, 4, grandDuchy);
map.border(6, 13, 2, 4, grandDuchy);
map.border(6, 12, 2, 4, grandDuchy);
map.border(6, 11, 2, 4, grandDuchy);
map.border(6, 10, 2, 4, grandDuchy);
map.border(6, 9, 2, 4, grandDuchy);
map.border(6, 8, 2, 4, grandDuchy);
map.border(6, 7, 2, 4, grandDuchy);
map.border(6, 6, 2, 4, grandDuchy);
map.border(6, 5, 2, 4, grandDuchy);
map.border(6, 4, 2, 4, grandDuchy);
map.border(6, 3, 2, 4, grandDuchy);
map.border(6, 2, 2, 5, grandDuchy);
map.border(7, 1, 3, 5, grandDuchy);
map.border(8, 1, 3, 5, grandDuchy);
map.border(9, 0, 3, 5, grandDuchy);
map.border(10, 0, 3, 5, grandDuchy);
map.border(12, 0, 4, 6, grandDuchy);
map.border(13, 0, 4, 6, grandDuchy);
map.border(14, 1, 4, 6, grandDuchy);
map.border(15, 1, 4, 6, grandDuchy);
map.border(16, 2, 4, 6, grandDuchy);
map.border(17, 2, 4, 6, grandDuchy);
map.border(18, 3, 4, 6, grandDuchy);
map.border(19, 3, 4, 6, grandDuchy);
map.border(20, 4, 4, 6, grandDuchy);
map.border(21, 4, 4, 6, grandDuchy);
map.border(22, 5, 4, 6, grandDuchy);
map.border(23, 5, 4, 5, grandDuchy);
map.border(24, 5, 3, 6, grandDuchy);
map.border(25, 5, 4, 5, grandDuchy);
map.border(26, 5, 3, 6, grandDuchy);
map.border(27, 5, 4, 5, grandDuchy);
map.border(28, 5, 3, 6, grandDuchy);
map.border(29, 5, 4, 5, grandDuchy);
map.border(30, 5, 3, 6, grandDuchy);
map.border(31, 5, 4, 5, grandDuchy);
map.border(32, 5, 3, 6, grandDuchy);
map.border(33, 5, 4, 5, grandDuchy);
map.border(34, 5, 3, 5, grandDuchy);
map.border(35, 4, 3, 5, grandDuchy);
map.border(36, 4, 3, 5, grandDuchy);
map.border(37, 3, 3, 5, grandDuchy);
map.border(38, 3, 3, 5, grandDuchy);
map.border(39, 2, 3, 5, grandDuchy);
map.border(40, 2, 3, 5, grandDuchy);
map.border(41, 1, 3, 5, grandDuchy);
map.border(42, 1, 3, 5, grandDuchy);
map.border(43, 0, 3, 5, grandDuchy);
map.border(53, 0, 5, 7, grandDuchy);
map.border(53, 1, 5, 7, grandDuchy);
map.border(53, 2, 5, 7, grandDuchy);
map.border(53, 3, 5, 7, grandDuchy);
map.border(53, 4, 5, 7, grandDuchy);
map.border(53, 5, 5, 7, grandDuchy);
map.border(53, 6, 5, 7, grandDuchy);
map.border(53, 7, 5, 7, grandDuchy);
map.border(53, 8, 5, 7, grandDuchy);
map.border(53, 9, 5, 7, grandDuchy);
map.border(53, 10, 5, 6, grandDuchy);
map.border(54, 11, 4, 6, grandDuchy);
map.border(55, 11, 4, 5, grandDuchy);
map.border(56, 11, 3, 6, grandDuchy);
map.border(57, 11, 4, 5, grandDuchy);
map.border(57, 20, 0, 2, grandDuchy);
map.border(56, 21, 0, 2, grandDuchy);
map.border(55, 21, 0, 2, grandDuchy);
map.border(54, 22, 0, 2, grandDuchy);
map.border(53, 22, 0, 1, grandDuchy);
map.border(53, 23, 5, 7, grandDuchy);

// Highreach River etc.
const river: Pixels = 4;
map.line("water", river, 29, 26, "8999878989898");
map.line("water", river - 1, 34, 17, "787788877887889");
map.line("water", river - 1, 34, 17, "888898999998888888889");
map.line("water", river - 1, 34, 17, "999699899899");
map.line("water", river - 2, 44, 11, "88988899898988");
map.line("water", river - 2, 44, 11, "969898696989");
map.line("water", river - 2, 30, 11, "88");

// Blight Swamp etc.
map.line("water", river, 7, 17, "89898898");
map.line("water", river - 1, 10, 12, "999699699889999");
map.line("water", river - 1, 10, 11, "98998896");
map.line("water", river - 1, 10, 11, "7");
map.line("water", river - 2, 9, 10, "8898899988988");
map.line("water", river - 2, 9, 10, "78788778888898");

export const hexData = map.getHexData();
export const locations = map.locations;
export const borders = map.borders;
export const lines = map.lines;

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
  averageHitDice: [1, 1],
  highestMaximumDamagePerRound: 6,
};

export const NorthEasternGoblins: QuickForce = {
  name: "Goblins NE",
  numberOfTroops: 300,
  leaderLevel: 3,
  averageHitDice: [1, 1],
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

const unit = (
  force: Force,
  position: XY,
  side: number,
  liegeTag?: HexTag,
): Unit => ({
  id: force.name,
  side,
  liegeTag,
  type: "normal",
  force,
  fatigue: Fatigue.None,
  fatigueDuration: 0,
  ...position,
});
const quickUnit = (
  force: QuickForce,
  position: XY,
  side: number,
  liegeTag?: HexTag,
): Unit => ({
  id: force.name,
  side,
  liegeTag,
  type: "quick",
  force,
  fatigue: Fatigue.None,
  fatigueDuration: 0,
  x: position.x,
  y: position.y,
});

const BlackEagleGuardUnit = unit(BlackEagleGuard, xy(11, 19), 2, rebel);
const EasternGoblinsUnit = quickUnit(EasternGoblins, xy(49, 19), 2);
const BugbearsUnit = quickUnit(Bugbears, xy(20, 21), 2);
const NorthEasternGoblinsUnit = quickUnit(NorthEasternGoblins, xy(43, 6), 2);
const OrcsUnit = quickUnit(Orcs, xy(52, 11), 2);
const LycanthropesUnit = quickUnit(Lycanthropes, xy(3, 11), 2);

const DucalGuardUnit = unit(DucalGuard, xy(28, 26), 1, loyal);
const MenOfKelvenUnit = unit(MenOfKelven, xy(35, 15), 1, loyal);
const WesternElvesUnit = unit(WesternElves, xy(31, 16), 1);
const GnomesUnit = quickUnit(Gnomes, xy(33, 10), 1);
const EasternElvesUnit = unit(EasternElves, xy(55, 16), 1);
const ThyatianMercenariesUnit = unit(ThyatianMercenaries, xy(54, 23), 1);

export const scenario1Units: Unit[] = [
  BlackEagleGuardUnit,
  EasternGoblinsUnit,
  BugbearsUnit,
  DucalGuardUnit,
  MenOfKelvenUnit,
  WesternElvesUnit,
  GnomesUnit,
];

/*
You are playing a war game with the given map. You will be playing the forces in red. Your goal will be to capture and hold the city of Kelven, where the 'Men of Kelven' unit currently is. Ask me questions about the disposition of forces or any other relevant topic.

Forces Overview:
- Black Eagle Guard (200 men, well trained, excellent weapons, mounted, spellcasters)
- Orcs (300 orcs, HD 1, Leader LV 3, archers)
- Bugbears (80 bugbears, HD 3, Leader LV 5)
- Eastern Goblins (300 goblins, HD 1+1, Leader LV 3)
- Northeastern Goblins (300 goblins, HD 1+1, Leader LV 3)
- Lycanthropes (100 monsters, HD 4, Leader LV 4, archers, resistant to non-silvered weaponry)

- Ducal Guard (500 men, well trained, good weapons, mounted, spellcasters)
- Men of Kelven (80 men, poor training)
- Western Elves (100 elves, well trained, spellcasters, missile weapons)
- Eastern Elves (250 elves, well trained, good weapons, spellcasters, missile weapons, silvered weapons)
- Thyatian Mercenaries (800 men, well trained, spellcasters, missile weapons, mounted)
- Gnomes (150 gnomes, HD 1, Leader LV 4, archers)

No reinforcements are expected. Supply lines are not relevant for this scenario.

Brown hexes are mountains and hinder all troops. Dark green hexes are forests which elves prefer to fight in. Hexes with grey outlines are walled and provide defensive bonuses. There is a river between Specularum (Ducal Guard location) and Kelven which splits at Kelven, requiring river crossings to attack Kelven from any direction except north and northeast.
*/

export const scenario3Units: Unit[] = [
  BlackEagleGuardUnit,
  EasternGoblinsUnit,
  BugbearsUnit,
  NorthEasternGoblinsUnit,
  OrcsUnit,
  LycanthropesUnit,
  DucalGuardUnit,
  MenOfKelvenUnit,
  WesternElvesUnit,
  GnomesUnit,
  EasternElvesUnit, // TODO these elves are equipped with silver weapons
  ThyatianMercenariesUnit,
];
