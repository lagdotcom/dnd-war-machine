import {
  basicForceRating,
  battleRating,
  BattleRatingModifier,
  percentage,
  quickBattleRating,
  TroopClass,
  troopClass,
} from "./calculations";
import { item, section } from "./components/SectionView";
import { HexData } from "./state/terrain";
import { Unit } from "./state/units";
import { getAttackEffects, Tactics, TacticsResults } from "./tactics";
import { Fatigue, Situation } from "./types";

function getBRandTC(u: Unit): [battleRating: number, troopClass: number] {
  if (u.type === "normal") {
    const bfr = basicForceRating(u.force);
    const tc = troopClass(bfr);
    const br = battleRating(u.force, bfr);
    return [br, tc];
  }

  // TODO how do you get a troop class here?
  return [quickBattleRating(u.force), TroopClass.Average];
}

function getFlyingAttackers(u: Unit) {
  if (u.type === "normal")
    return percentage(u.force.flyingTroops, u.force.numberOfTroops);

  return u.force.hasFlyingBeings ? 100 : 0;
}

function getSideData(
  unit: Unit,
  tc: TroopClass,
  br: number,
  hex: HexData,
  situation: Situation,
) {
  const rater = new BattleRatingModifier();
  const sr = rater.rate(situation);
  const total = br + sr;

  return {
    unit,
    tc,
    br,
    hex,
    situation,
    sr,
    total,
    section: section(unit.force.name, total, [
      item("Battle Rating", br),
      ...Array.from(rater.factors, ([name, value]) =>
        section(
          name,
          value,
          rater.factorRatings[name].map((ratingName) =>
            item(ratingName, rater.ratings.get(ratingName) ?? 0),
          ),
        ),
      ),
    ]),
  };
}

export function getPendingBattleData(
  attacker: Unit,
  defender: Unit,
  attackerHex: HexData,
  defenderHex: HexData,
) {
  const [attackerBr, attackerTc] = getBRandTC(attacker);
  const [defenderBr, defenderTc] = getBRandTC(defender);
  const tcDifference = attackerTc - defenderTc;

  const mire = defenderHex.effects.includes("swamp");
  const shiftingGround =
    defenderHex.effects.includes("desert") ||
    defenderHex.effects.includes("snow");

  // TODO
  const attackerSituation: Situation = {
    troopRatio: attacker.force.numberOfTroops / defender.force.numberOfTroops,
    troopClassIsTwoLevelsHigher: tcDifference >= 2,
    inDominionOfLiege:
      attacker.liegeTag !== undefined &&
      defenderHex.tags.includes(attacker.liegeTag),
    percentImmuneToEnemyAttacks: 0,
    mire,
    shiftingGround,
    moderatelyFatigued: attacker.fatigue === Fatigue.Moderate,
    seriouslyFatigued: attacker.fatigue === Fatigue.Serious,

    percentFlyingAttackers: 0,
  };
  const defenderSituation: Situation = {
    troopRatio: defender.force.numberOfTroops / attacker.force.numberOfTroops,
    troopClassIsTwoLevelsHigher: tcDifference <= -2,
    inDominionOfLiege:
      defender.liegeTag !== undefined &&
      defenderHex.tags.includes(defender.liegeTag),
    percentImmuneToEnemyAttacks: 0,
    mire,
    shiftingGround,
    moderatelyFatigued: defender.fatigue === Fatigue.Moderate,
    seriouslyFatigued: defender.fatigue === Fatigue.Serious,

    isDefender: true,
    defendingStronghold: defenderHex.tags.includes("stronghold"),
    percentFlyingAttackers: getFlyingAttackers(attacker),
  };

  return {
    attack: getSideData(
      attacker,
      attackerTc,
      attackerBr,
      attackerHex,
      attackerSituation,
    ),
    defense: getSideData(
      defender,
      defenderTc,
      defenderBr,
      defenderHex,
      defenderSituation,
    ),
  };
}

export function getTacticsEffects(aTactics: Tactics, dTactics: Tactics) {
  const effects = TacticsResults[dTactics - 1][aTactics - 1];
  if (effects === "NC") return;

  const [aEff, dEff] = effects;
  const [acMod, atMod] = getAttackEffects(aEff);
  const [dcMod, dtMod] = getAttackEffects(dEff);

  return {
    attack: { casualties: acMod, rating: atMod },
    defense: { casualties: dcMod, rating: dtMod },
  };
}

export function d100() {
  return Math.ceil(Math.random() * 100);
}

export function d4() {
  return Math.ceil(Math.random() * 4);
}
