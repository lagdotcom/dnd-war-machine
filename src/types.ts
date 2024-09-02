export interface Force {
  name: string;
  numberOfTroops: number;
  leaderLevel: number;
  leaderAbilityBonus: number;
  percentageNameLevelChar: number;
  averageOfficerLevel: number;
  averageTroopLevel: number;
  weeksTraining: number;
  weeksTrainingWithLeader: number;
  monthsTogether: number;
  pastVictories: number;
  pastRouts: number;
  weaponsQuality: number;
  weaponsPerTroop: number;
  averageAC: number;
  demihuman?: boolean;
  percentageSpecial: number;
  missileTroops: number;
  longRangeMissileTroops: number;
  magicalTroops: number;
  spellcasters: number;
  mountedTroops: number;
  flyingTroops: number;
  averageMovement: number;
}

export interface QuickForce {
  name: string;
  numberOfTroops: number;
  leaderLevel: number;
  averageHitDice: number;
  hasArchers?: boolean;
  hasSpellcasters?: boolean;
  hasMagicalBeings?: boolean;
  hasFlyingBeings?: boolean;
  highestMaximumDamagePerRound: number;
}

export interface Situation {
  troopRatio: number;

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
  percentFlyingAttackers: number;
  defendingInPlace?: boolean;
  defendingNarrowDefile?: boolean;
  attackerMustCrossDeepWater?: boolean;
  defendingInMountainsHillsRoughTerrainOrBehindWall?: boolean;
  defendingStronghold?: boolean;

  percentImmuneToEnemyAttacks: number;

  moderatelyFatigued?: boolean;
  seriouslyFatigued?: boolean;
}

export interface XY {
  x: number;
  y: number;
}

export type XYTag = `${number},${number}`;

export interface HexLocation extends XY {
  type: string;
  name: string;
}

export interface HexBorder extends XY {
  thickness: number;
  start: number;
  end: number;
}
