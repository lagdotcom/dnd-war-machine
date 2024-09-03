import {
  AbilityBonus,
  ArmourClass,
  CartesianCoord,
  Damage,
  ExperienceLevel,
  Months,
  Percentage,
  Ratio,
  Weeks,
} from "./flavours";

export interface Force {
  name: string;
  numberOfTroops: number;
  leaderLevel: ExperienceLevel;
  leaderAbilityBonus: AbilityBonus;
  percentageNameLevelChar: Percentage;
  averageOfficerLevel: ExperienceLevel;
  averageTroopLevel: ExperienceLevel;
  weeksTraining: Weeks;
  weeksTrainingWithLeader: Weeks;
  monthsTogether: Months;
  pastVictories: number;
  pastRouts: number;
  weaponsQuality: number;
  weaponsPerTroop: number;
  averageAC: ArmourClass;
  demihuman?: boolean;
  percentageSpecial: Percentage;
  missileTroops: number;
  longRangeMissileTroops: number;
  magicalTroops: number;
  spellcasters: number;
  mountedTroops: number;
  flyingTroops: number;
  averageMovement: number;
}

export type HitDice = number | [dice: number, bonus: number];

export interface QuickForce {
  name: string;
  numberOfTroops: number;
  leaderLevel: ExperienceLevel;
  averageHitDice: HitDice;
  hasArchers?: boolean;
  hasSpellcasters?: boolean;
  hasMagicalBeings?: boolean;
  hasFlyingBeings?: boolean;
  highestMaximumDamagePerRound: Damage;
}

export interface Situation {
  troopRatio: Ratio;

  inDominionOfLiege?: boolean;
  haveBeatenFoeBefore?: boolean;
  troopClassIsTwoLevelsHigher?: boolean;
  enemyOnTheMarch?: boolean;
  accompanyingForceRouted?: boolean;

  extremelyFavorableEnvironment?: boolean;
  extremelyUnfavorableEnvironment?: boolean;
  nightBattleWithInfravision?: boolean;

  higherAltitude?: boolean;
  halflingsInFieldsOrWoods?: boolean;
  elvesInWoods?: boolean;
  dwarvesInHillsOrMountains?: boolean;
  mountedInMountainsWoodsOrStronghold?: boolean;
  mire?: boolean;
  shiftingGround?: boolean;

  isDefender?: boolean;
  percentFlyingAttackers: Percentage;
  defendingInPlace?: boolean;
  defendingNarrowDefile?: boolean;
  attackerMustCrossDeepWater?: boolean;
  defendingInMountainsHillsRoughTerrainOrBehindWall?: boolean;
  defendingStronghold?: boolean;

  percentImmuneToEnemyAttacks: Percentage;

  moderatelyFatigued?: boolean;
  seriouslyFatigued?: boolean;
}

export interface XY {
  x: CartesianCoord;
  y: CartesianCoord;
}

export type XYTag = `${CartesianCoord},${CartesianCoord}`;
