import isDefined from "./tools/isDefined";
import { Force, HitDice, QuickForce, Situation } from "./types";

export class BasicForceRater {
  ratings: Map<string, number>;
  factors: Map<string, number>;
  factorRatings: Record<string, string[]>;
  private currentFactor: number;
  private currentFactorRatings: string[];

  constructor() {
    this.ratings = new Map();
    this.factors = new Map();
    this.factorRatings = {};
    this.currentFactor = 0;
    this.currentFactorRatings = [];
  }

  get total() {
    let total = 0;
    for (const value of this.factors.values()) total += value;
    return total;
  }

  rate(f: Force) {
    this.rateLeadershipFactor(f);
    this.rateExperienceFactor(f);
    this.rateTrainingFactor(f);
    this.rateEquipmentFactor(f);
    this.rateSpecialTroopFactor(f);

    return this.total;
  }

  private item(name: string, value: number, max?: number, min?: number) {
    if (isDefined(max)) value = Math.min(value, max);
    if (isDefined(min)) value = Math.max(value, min);
    this.ratings.set(name, value);

    this.currentFactor += value;
    this.currentFactorRatings.push(name);
  }

  private endFactor(name: string) {
    this.factors.set(name, this.currentFactor);
    this.factorRatings[name] = this.currentFactorRatings;

    this.currentFactor = 0;
    this.currentFactorRatings = [];
  }

  private rateLeadershipFactor(f: Force) {
    this.item("Leader Experience Level", f.leaderLevel);
    this.item("Leader Adjustments", f.leaderAbilityBonus);
    this.item("Name Level %", f.percentageNameLevelChar * 2);
    this.endFactor("Leadership");
  }

  private rateExperienceFactor(f: Force) {
    this.item("Average Officer Level", f.averageOfficerLevel * 3);
    this.item("Average Troop Level", f.averageTroopLevel * 2);
    this.item("Recent Victories", f.pastVictories, 10);
    this.item("Recent Routs", -f.pastRouts, undefined, -10);
    this.endFactor("Experience");
  }

  private rateTrainingFactor(f: Force) {
    this.item("Weeks Trained", f.weeksTraining, 20);
    this.item("Weeks Trained with Leader", f.weeksTrainingWithLeader, 20);
    this.item("Months on Duty", f.monthsTogether, 12);
    this.endFactor("Training");
  }

  private rateEquipmentFactor(f: Force) {
    this.item("Weapon Quality", f.weaponsQuality);
    this.item("Second Weapon", f.weaponsPerTroop > 1 ? 5 : 0);
    this.item("High AC", f.averageAC <= 5 ? 5 : 0);
    this.endFactor("Equipment");
  }

  private rateSpecialTroopFactor(f: Force) {
    this.item("Elves/Dwarves", f.demihuman ? 15 : 0);
    // TODO this.item('Special Monsters', f.percentageSpecial * 2);
    this.endFactor("Special Troop");
  }
}

export function basicForceRating(f: Force) {
  const rm = new BasicForceRater();
  return rm.rate(f);
}

export enum TroopClass {
  Untrained,
  Poor,
  BelowAverage,
  Average,
  Good,
  Excellent,
  Elite,
}

export function troopClass(bfr: number) {
  if (bfr < 20) return TroopClass.Untrained;
  if (bfr < 36) return TroopClass.Poor;
  if (bfr < 56) return TroopClass.BelowAverage;
  if (bfr < 71) return TroopClass.Average;
  if (bfr < 101) return TroopClass.Good;
  if (bfr < 126) return TroopClass.Excellent;
  return TroopClass.Elite;
}

export function percentage(count: number, max: number) {
  return Math.ceil((100 * count) / max);
}

export class BattleRater {
  amount: number;
  bonuses: Set<string>;

  constructor() {
    this.amount = 0;
    this.bonuses = new Set();
  }

  rate(f: Force, bfr: number) {
    this.bonuses.clear();
    const bfrBonus = Math.ceil(bfr / 10);
    this.amount = bfrBonus;

    const pMounted = percentage(f.mountedTroops, f.numberOfTroops);
    this.addBonus("20% mounted", pMounted >= 20);
    this.addBonus("50% mounted", pMounted >= 50);

    this.addBonus(
      "20% missiles",
      percentage(f.missileTroops, f.numberOfTroops) >= 20,
    );
    this.addBonus(
      "20% 100' range missiles",
      percentage(f.longRangeMissileTroops, f.numberOfTroops) >= 20,
    );

    const pMagic = percentage(f.magicalTroops, f.numberOfTroops);
    this.addBonus("1% magical", pMagic >= 1);
    this.addBonus("20% magical", pMagic >= 20);
    this.addBonus("100% magical", pMagic >= 100);

    const pSpells = percentage(f.spellcasters, f.numberOfTroops);
    this.addBonus("5% spellcasters", pSpells >= 5);
    this.addBonus("30% spellcasters", pSpells >= 30);

    const pFlying = percentage(f.flyingTroops, f.numberOfTroops);
    this.addBonus("1% flyers", pFlying >= 1);
    this.addBonus("20% flyers", pFlying >= 20);

    this.addBonus("100' movement", f.averageMovement >= 100);

    return bfr + bfrBonus * this.bonuses.size;
  }

  private addBonus(name: string, apply: boolean) {
    if (apply) this.bonuses.add(name);
  }
}

export function battleRating(f: Force, bfr: number) {
  const br = new BattleRater();
  return br.rate(f, bfr);
}

export class QuickBattleRater {
  ratings: Map<string, number>;

  constructor() {
    this.ratings = new Map();
  }

  get total() {
    let total = 0;
    for (const value of this.ratings.values()) total += value;
    return total;
  }

  rate(f: QuickForce) {
    this.ratings.clear();

    this.item("Leader Level", f.leaderLevel);

    this.item("Hit Dice Factor", this.hitDiceFactor(f.averageHitDice));

    if (f.hasArchers) this.item("Archers", 10);
    if (f.hasSpellcasters) this.item("Spellcasters", 10);
    if (f.hasMagicalBeings) this.item("Magical Beings", 10);
    if (f.hasFlyingBeings) this.item("Flying Beings", 10);

    this.item("Maximum Damage per Round", f.highestMaximumDamagePerRound);

    return this.total;
  }

  hitDiceFactor(hd: HitDice) {
    const dice = typeof hd === "number" ? hd : hd[0];
    if (dice < 1) return 20;
    if (dice < 3) return 30;
    if (dice < 5) return 40;
    if (dice < 7) return 55;
    if (dice < 9) return 65;
    return 80;
  }

  private item(name: string, value: number) {
    this.ratings.set(name, value);
  }
}

export function quickBattleRating(f: QuickForce) {
  const br = new QuickBattleRater();
  return br.rate(f);
}

export class BattleRatingModifier {
  ratings: Map<string, number>;
  factors: Map<string, number>;
  factorRatings: Record<string, string[]>;
  private currentFactor: number;
  private currentFactorRatings: string[];

  constructor() {
    this.ratings = new Map();
    this.factors = new Map();
    this.factorRatings = {};
    this.currentFactor = 0;
    this.currentFactorRatings = [];
  }

  get total() {
    let total = 0;
    for (const value of this.factors.values()) total += value;
    return total;
  }

  rate(s: Situation) {
    this.rateTroopRatio(s);
    this.rateMorale(s);
    this.rateEnvironment(s);
    this.rateTerrain(s);
    this.rateTerrainModifications(s);
    this.rateImmunities(s);
    this.rateFatigue(s);

    return this.total;
  }

  private item(name: string, value: number) {
    this.ratings.set(name, value);
    this.currentFactor += value;
    this.currentFactorRatings.push(name);
  }

  private endFactor(name: string) {
    this.factors.set(name, this.currentFactor);
    this.factorRatings[name] = this.currentFactorRatings;

    this.currentFactor = 0;
    this.currentFactorRatings = [];
  }

  rateTroopRatio(s: Situation) {
    this.item("Troop Ratio", this.getTroopRatioBonus(s.troopRatio));
    this.endFactor("Ratio");
  }

  getTroopRatioBonus(n: number) {
    if (n < 1.5) return 0;
    if (n < 2) return 15;
    if (n < 3) return 30;
    if (n < 4) return 45;
    if (n < 5) return 60;
    if (n < 6) return 70;
    if (n < 7) return 80;
    if (n < 8) return 90;
    if (n < 11) return 100;
    if (n < 16) return 110;
    if (n < 21) return 120;

    const tens = Math.floor((n - 21) / 10);
    return 130 + tens * 10;
  }

  rateMorale(s: Situation) {
    if (s.inDominionOfLiege) this.item("In Dominion of Liege", 10);
    if (s.haveBeatenFoeBefore) this.item("Beaten foe before", 10);
    if (s.troopClassIsTwoLevelsHigher)
      this.item("Troop Class is at least 2 levels higher", 10);
    if (s.enemyOnTheMarch) this.item("Enemy on the march", 30);
    if (s.accompanyingForceRouted) this.item("Accompanying force routed", -10);
    this.endFactor("Morale");
  }

  rateEnvironment(s: Situation) {
    if (s.extremelyFavorableEnvironment) this.item("Favorable environment", 25);
    if (s.extremelyUnfavorableEnvironment)
      this.item("Unfavorable environment", -25);
    if (s.nightBattleWithInfravision)
      this.item("Night battle with infravision", 20);
    this.endFactor("Environment");
  }

  rateTerrain(s: Situation) {
    if (s.higherAltitude) this.item("Higher altitude", 20);
    if (s.halflingsInFieldsOrWoods) this.item("Halflings in fields/woods", 20);
    if (s.elvesInWoods) this.item("Elves in woods", 10);
    if (s.dwarvesInHillsOrMountains)
      this.item("Dwarves in hills/mountains", 20);
    if (s.mountedInMountainsWoodsOrStronghold)
      this.item("Mounted troops in mountains/woods/stronghold", -20);
    if (s.mire) this.item("Mire", -20);
    if (s.shiftingGround) this.item("Shifting ground", -10);
    this.endFactor("Terrain");
  }

  rateTerrainModifications(s: Situation) {
    if (!s.isDefender) return;
    if (s.percentFlyingAttackers >= 100) return;
    const f = s.percentFlyingAttackers >= 5 ? 0.5 : 1;

    if (s.defendingInPlace) this.item("Defending in place", f * 10);
    if (s.defendingNarrowDefile) this.item("Narrow defile", f * 50);
    if (s.attackerMustCrossDeepWater)
      this.item("Attacker must cross deep water", f * 40);
    if (s.defendingInMountainsHillsRoughTerrainOrBehindWall)
      this.item("Defending in mountains/hills/rough terrain/wall", f * 20);
    if (s.defendingStronghold) this.item("Force in stronghold", f * 50);

    this.endFactor("Terrain Modifications");
  }

  rateImmunities(s: Situation) {
    /* 5. Immunities (Use only one per force):
        +150 if force is immune to enemy's attacks
        +50 if 1% of force is immune to enemy's attacks
        +50 if force is immune to 80% of enemy's attacks */

    if (s.percentImmuneToEnemyAttacks >= 100)
      this.item("Completely immune", 150);
    else if (s.percentImmuneToEnemyAttacks >= 80)
      this.item("Mostly immune", 50);
    // TODO
    this.endFactor("Immunities");
  }

  rateFatigue(s: Situation) {
    if (s.seriouslyFatigued) this.item("Seriously fatigued", -30);
    else if (s.moderatelyFatigued) this.item("Moderately fatigued", -10);
    this.endFactor("Fatigue");
  }
}

export function situationRating(s: Situation) {
  const r = new BattleRatingModifier();
  return r.rate(s);
}
