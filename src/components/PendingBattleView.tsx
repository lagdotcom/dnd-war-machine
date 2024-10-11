import { useMemo } from "react";

import { getPendingBattleData } from "../battle";
import { xyTag } from "../coord-tools";
import { useAppSelector } from "../state/hooks";
import { selectTerrainEntities } from "../state/terrain";
import { PendingBattle } from "../state/ui";
import { selectUnitEntities } from "../state/units";
import SectionView from "./SectionView";

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

    const attackerHex = hexes[xyTag(attacker)];
    const defenderHex = hexes[xyTag(defender)];

    return getPendingBattleData(attacker, defender, attackerHex, defenderHex);
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
