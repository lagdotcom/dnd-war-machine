import {
  BasicForceRater,
  basicForceRating,
  BattleRater,
  battleRating,
  percentage,
  QuickBattleRater,
  situationRating,
  TroopClass,
  troopClass,
} from "./calculations";
import {
  BlackEagleGuard,
  Bugbears,
  DucalGuard,
  EasternElves,
  EasternGoblins,
  Gnomes,
  Lycanthropes,
  MenOfKelven,
  NorthEasternGoblins,
  Orcs,
  ThyatianMercenaries,
  WesternElves,
} from "./data/karameikos";
import { Force, Situation } from "./types";

for (const force of [
  BlackEagleGuard,
  MenOfKelven,
  DucalGuard,
  WesternElves,
  EasternElves,
  ThyatianMercenaries,
]) {
  const a = new BasicForceRater();
  const bfr = a.rate(force);

  const b = new BattleRater();
  const br = b.rate(force, a.total);

  console.log(
    `${force.name} - BFR ${bfr} (${troopClass(bfr)}) - BR ${br} (${[...b.bonuses].join(", ")})`,
  );
}

for (const force of [
  Gnomes,
  Orcs,
  Bugbears,
  EasternGoblins,
  NorthEasternGoblins,
  Lycanthropes,
]) {
  const b = new QuickBattleRater();
  const br = b.rate(force);

  console.log(`${force.name} - qBR ${br}`);
}

type FatigueResult = "N" | "M" | "S" | "Rout";
type LocationResult =
  | "F"
  | "R"
  | "R+1"
  | "R+2"
  | "R+3"
  | "F+1"
  | "F+3"
  | "F+5"
  | "Rout";

type AttackResult = [
  winnerCasualties: number,
  loserCasualties: number,
  winnerFatigue: FatigueResult,
  loserFatigue: FatigueResult,
  winnerLocation: LocationResult,
  loserLocation: LocationResult,
];

function getAttackResults(diff: number): AttackResult {
  if (diff < 9) return [0, 10, "N", "N", "F", "R"];
  if (diff < 16) return [0, 20, "N", "N", "F", "R"];
  if (diff < 25) return [10, 20, "N", "M", "F", "R"];
  if (diff < 31) return [10, 30, "N", "M", "F", "R+1"];
  if (diff < 39) return [20, 40, "M", "S", "R", "R"];
  if (diff < 51) return [0, 30, "N", "S", "F", "R+2"];
  if (diff < 64) return [20, 50, "M", "S", "F+1", "R+3"];
  if (diff < 81) return [30, 60, "M", "S", "F+1", "R+3"];
  if (diff < 91) return [10, 50, "N", "S", "F+3", "R+2"];
  if (diff < 101) return [0, 30, "N", "Rout", "F+3", "Rout"];
  if (diff < 121) return [20, 70, "N", "Rout", "F+3", "Rout"];
  if (diff < 151) return [10, 70, "N", "Rout", "F+3", "Rout"];
  return [10, 100, "N", "Rout", "F+5", "Rout"];
}

function d100() {
  return Math.ceil(Math.random() * 100);
}

enum Tactics {
  Overrun = 1,
  Attack,
  Envelop,
  Trap,
  Hold,
  Withdraw,
}

type TacticResult =
  | "--"
  | "C1"
  | "C2"
  | "C3"
  | "C-1"
  | "-10"
  | "-20"
  | "-25"
  | "+10"
  | "+20";

const TacticsResults: ("NC" | TacticResult[])[][] = [
  [
    ["C2", "C2"],
    ["-20", "C2"],
    ["C1", "+10"],
    ["+20", "C2"],
    ["-25", "C2"],
    ["C3", "+20"],
  ],
  [
    ["C2", "-20"],
    ["C1", "C1"],
    ["-10", "C1"],
    ["+10", "C1"],
    ["C-1", "--"],
    ["C2", "+10"],
  ],
  [
    ["+10", "C1"],
    ["C1", "-10"],
    ["--", "--"],
    ["-20", "C-1"],
    ["C2", "+20"],
    ["C-1", "+10"],
  ],
  [
    ["C2", "+20"],
    ["C1", "+10"],
    ["C-1", "-20"],
    ["--", "--"],
    ["C-1", "-20"],
    ["C-1", "C-1"],
  ],
  [["C2", "-25"], ["--", "C-1"], ["+20", "C2"], ["-20", "C-1"], "NC", "NC"],
  [["+20", "C3"], ["+10", "C2"], ["+10", "C-1"], ["C-1", "C-1"], "NC", "NC"],
] as const;

function getAttackEffects(
  r: TacticResult,
): [casualtiesMod: number, brMod: number] {
  switch (r) {
    case "--":
      return [0, 0];

    case "C-1":
      return [-10, 0];
    case "C1":
      return [10, 0];
    case "C2":
      return [20, 0];
    case "C3":
      return [30, 0];

    case "-25":
      return [0, -25];
    case "-20":
      return [0, -20];
    case "-10":
      return [0, -10];
    case "+10":
      return [0, 10];
    case "+20":
      return [0, 20];
  }
}

function simulateAttack(
  aForce: Force,
  dForce: Force,
  aIn: Omit<
    Situation,
    | "isDefender"
    | "troopRatio"
    | "troopClassIsTwoLevelsHigher"
    | "percentFlyingAttackers"
  >,
  dIn: Omit<
    Situation,
    | "isDefender"
    | "troopRatio"
    | "troopClassIsTwoLevelsHigher"
    | "percentFlyingAttackers"
  >,
  aTactics?: Tactics,
  dTactics?: Tactics,
) {
  const aBFR = basicForceRating(aForce);
  const aClass = troopClass(aBFR);
  const aBR = battleRating(aForce, aBFR);

  const dBFR = basicForceRating(dForce);
  const dClass = troopClass(dBFR);
  const dBR = battleRating(dForce, dBFR);

  const classDiff = aClass - dClass;

  const aSit: Situation = {
    ...aIn,
    troopRatio: aForce.numberOfTroops / dForce.numberOfTroops,
    troopClassIsTwoLevelsHigher: classDiff >= 2,
    percentFlyingAttackers: 0,
  };
  const aMod = situationRating(aSit);

  const dSit: Situation = {
    ...dIn,
    troopRatio: dForce.numberOfTroops / aForce.numberOfTroops,
    troopClassIsTwoLevelsHigher: classDiff <= -2,
    isDefender: true,
    percentFlyingAttackers: percentage(
      aForce.flyingTroops,
      aForce.numberOfTroops,
    ),
  };
  const dMod = situationRating(dSit);

  console.log(
    `${aForce.name} (${aForce.numberOfTroops}, ${TroopClass[aClass]}) vs. ${dForce.name} (${dForce.numberOfTroops}, ${TroopClass[dClass]})`,
  );

  let atMod = 0;
  let dtMod = 0;
  let acMod = 0;
  let dcMod = 0;

  if (aTactics && dTactics) {
    const effects = TacticsResults[dTactics - 1][aTactics - 1];
    if (effects === "NC") {
      console.log(
        `Attacker: ${Tactics[aTactics]} vs. Defender: ${Tactics[dTactics]}: No Combat occurred`,
      );
      return;
    }

    const [aEff, dEff] = effects;
    [acMod, atMod] = getAttackEffects(aEff);
    [dcMod, dtMod] = getAttackEffects(dEff);

    console.log(
      `Attacker: ${Tactics[aTactics]} (${aEff}) vs. Defender: ${Tactics[dTactics]} (${dEff})`,
    );
  }

  const aRoll = d100();
  const dRoll = d100();
  const aCR = aRoll + aBR + aMod + atMod;
  const dCR = dRoll + dBR + dMod + dtMod;

  console.log(
    `${aCR} (r ${aRoll} + BR ${aBR} + sit ${aMod} + tac ${atMod}) vs. ${dCR} (r ${dRoll} + BR ${dBR} + sit ${dMod} + tac ${dtMod})`,
  );
  if (aCR === dCR) console.log("It's a draw!");

  const [winner, loser, wcmod, lcmod] =
    aCR > dCR ? [aForce, dForce, acMod, dcMod] : [dForce, aForce, dcMod, acMod];
  const diffCR = Math.abs(aCR - dCR);
  console.log(`${winner.name} wins! (+${diffCR})`);

  const [wc, lc, wf, lf, wl, ll] = getAttackResults(diffCR);

  console.log(
    `${winner.name} loses ${wc + wcmod}% troops, fatigue ${wf}, location ${wl}`,
  );
  console.log(
    `${loser.name} loses ${lc + lcmod}% troops, fatigue ${lf}, location ${ll}`,
  );
}

simulateAttack(
  BlackEagleGuard,
  MenOfKelven,
  { percentImmuneToEnemyAttacks: 0 },
  {
    percentImmuneToEnemyAttacks: 0,
    defendingInPlace: true,
    defendingInMountainsHillsRoughTerrainOrBehindWall: true,
    inDominionOfLiege: true,
  },
  Math.ceil(Math.random() * 6),
  Tactics.Hold,
);
