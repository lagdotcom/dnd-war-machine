import classNames from "classnames";
import { useMemo } from "react";

import {
  BasicForceRater,
  BattleRater,
  QuickBattleRater,
} from "../calculations";
import { Unit } from "../state/units";
import { Force, HitDice, QuickForce } from "../types";
import SectionView, { item, RatingSection, section } from "./SectionView";

function getRatings(u: Unit): RatingSection[] {
  if (u.type === "normal") {
    const forceRater = new BasicForceRater();
    const bfr = forceRater.rate(u.force);

    const battleRater = new BattleRater();
    const br = battleRater.rate(u.force, bfr);

    return [
      section(
        "Battle Rating",
        br,
        Array.from(battleRater.bonuses, (name) =>
          item(name, battleRater.amount),
        ),
      ),
      section(
        "Basic Force Rating",
        bfr,
        Array.from(forceRater.factors, ([name, value]) =>
          section(
            name,
            value,
            forceRater.factorRatings[name].map((ratingName) =>
              item(ratingName, forceRater.ratings.get(ratingName) ?? 0),
            ),
          ),
        ),
      ),
    ];
  } else {
    const battleRater = new QuickBattleRater();
    const br = battleRater.rate(u.force);

    return [
      section(
        "Battle Rating",
        br,
        Array.from(battleRater.ratings, ([name, value]) => item(name, value)),
      ),
    ];
  }
}

export interface UnitViewProps {
  unit: Unit;
}

export default function UnitView({ unit }: UnitViewProps) {
  const sections = useMemo(() => getRatings(unit), [unit]);

  return (
    <div className="panel unit-view">
      <div className="name">{unit.force.name}</div>
      {unit.liegeTag && <div>Liege: {unit.liegeTag}</div>}
      <div>Troops: {unit.force.numberOfTroops}</div>
      <div>Leader LV {unit.force.leaderLevel}</div>
      {unit.type === "normal" && <NormalForceView force={unit.force} />}
      {unit.type === "quick" && <QuickForceView force={unit.force} />}

      <table className="ratings">
        <tbody>
          {sections.map((section, i) => (
            <SectionView key={i} section={section} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NormalForceView({ force }: { force: Force }) {
  return (
    <>
      <div>Officer LV {force.averageOfficerLevel}</div>
      <div>Troop LV {force.averageTroopLevel}</div>
    </>
  );
}

function hdView(hd: HitDice) {
  if (typeof hd === "number") return String(hd);

  const [dice, bonus] = hd;
  return `${dice}+${bonus}`;
}

function QuickForceView({ force }: { force: QuickForce }) {
  const tags = classNames({
    archers: force.hasArchers,
    flying: force.hasFlyingBeings,
    magical: force.hasMagicalBeings,
    spellcasters: force.hasSpellcasters,
  });

  return (
    <>
      <div>{hdView(force.averageHitDice)} HD</div>
      <div>up to {force.highestMaximumDamagePerRound} damage per round</div>
      {tags && <div>has: {tags}</div>}
    </>
  );
}
