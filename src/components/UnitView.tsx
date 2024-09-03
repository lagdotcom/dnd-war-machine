import classNames from "classnames";

import { Unit } from "../state/units";
import { Force, HitDice, QuickForce } from "../types";

export interface UnitViewProps {
  unit: Unit;
}

export default function UnitView({ unit }: UnitViewProps) {
  return (
    <div className="panel unit-view">
      <div className="name">{unit.force.name}</div>
      {unit.liegeTag && <div>Liege: {unit.liegeTag}</div>}
      <div>Troops: {unit.force.numberOfTroops}</div>
      <div>Leader LV {unit.force.leaderLevel}</div>
      {unit.type === "normal" && <NormalForceView force={unit.force} />}
      {unit.type === "quick" && <QuickForceView force={unit.force} />}
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
