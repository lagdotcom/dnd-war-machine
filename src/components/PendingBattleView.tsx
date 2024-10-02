import { useMemo } from "react";

import {
  basicForceRating,
  battleRating,
  BattleRatingModifier,
  percentage,
  quickBattleRating,
  TroopClass,
  troopClass,
} from "../calculations";
import { xyTag } from "../coord-tools";
import { useAppSelector } from "../state/hooks";
import { HexData, selectTerrainEntities } from "../state/terrain";
import { PendingBattle } from "../state/ui";
import { selectUnitEntities, Unit } from "../state/units";
import { Situation } from "../types";
import SectionView, { item, section } from "./SectionView";

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

export default function PendingBattleView({
  battle,
}: {
  battle: PendingBattle;
}) {
  const hexes = useAppSelector(selectTerrainEntities);
  const units = useAppSelector(selectUnitEntities);

  const { attack, defense } = useMemo(() => {
    const attacker = units[battle.attacker];
    const defender = units[battle.defender];

    const [attackerBr, attackerTc] = getBRandTC(attacker);
    const [defenderBr, defenderTc] = getBRandTC(defender);
    const tcDifference = attackerTc - defenderTc;

    const attackerHex = hexes[xyTag(attacker)];
    const defenderHex = hexes[xyTag(defender)];

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
  }, [battle, hexes, units]);

  return (
    <div className="panel">
      <table className="ratings">
        <tbody>
          <SectionView section={attack.section} />
          <tr>
            <th colSpan={2}>vs.</th>
          </tr>
          <SectionView section={defense.section} />
        </tbody>
      </table>
    </div>
  );
}
