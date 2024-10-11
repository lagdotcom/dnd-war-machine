import { d100 } from "./battle";
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
import {
  getAttackEffects,
  getAttackResults,
  Tactics,
  TacticsResults,
} from "./tactics";
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

  const [winner, loser, wcMod, lcMod] =
    aCR > dCR ? [aForce, dForce, acMod, dcMod] : [dForce, aForce, dcMod, acMod];
  const diffCR = Math.abs(aCR - dCR);
  console.log(`${winner.name} wins! (+${diffCR})`);

  const [wc, lc, wf, lf, wl, ll] = getAttackResults(diffCR);

  console.log(
    `${winner.name} loses ${wc + wcMod}% troops, fatigue ${wf}, location ${wl}`,
  );
  console.log(
    `${loser.name} loses ${lc + lcMod}% troops, fatigue ${lf}, location ${ll}`,
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
