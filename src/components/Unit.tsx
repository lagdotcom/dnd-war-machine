import classNames from "classnames";
import { useCallback, useMemo } from "react";

import { oddQToPixel, xyTag } from "../coord-tools";
import { useAppSelector } from "../state/hooks";
import { selectAttackHexTags, selectSelectedUnitId } from "../state/selectors";
import { selectHexById } from "../state/terrain";
import { UnitData } from "../state/units";
import clamp from "../tools/clamp";
import { useLayoutContext } from "./Layout";

function getUnitRadius(troops: number) {
  return clamp(troops / 50, 4, 10);
}

export default function Unit({
  unit,
  onClick,
  onHover,
}: {
  unit: UnitData;
  onClick?: (unit: UnitData) => void;
  onHover?: (unit: UnitData) => void;
}) {
  const { liegeTag, side, force } = unit;
  const click = useCallback(() => onClick?.(unit), [onClick, unit]);
  const mouseEnter = useCallback(() => onHover?.(unit), [onHover, unit]);

  const { layout } = useLayoutContext();
  const pixel = useMemo(() => oddQToPixel(layout, unit), [layout, unit]);

  const tag = xyTag(unit);
  const inHex = useAppSelector((state) => selectHexById(state, tag));
  const inTerritoryOfLiege = liegeTag && inHex.tags.includes(liegeTag);

  const selectedId = useAppSelector(selectSelectedUnitId);
  const canAttack = useAppSelector(selectAttackHexTags);

  return (
    <g
      className={classNames("unit", `side-${side}`, {
        "can-attack": canAttack[tag],
        "in-liege": inTerritoryOfLiege,
        selected: unit.id === selectedId,
      })}
      transform={`translate(${pixel.x},${pixel.y})`}
      onClick={click}
      onMouseEnter={mouseEnter}
    >
      <circle r={getUnitRadius(force.numberOfTroops)} />
      <text y="1.25em" textAnchor="middle">
        {force.name}
      </text>
      {inTerritoryOfLiege && (
        <text y="0.3em" textAnchor="middle">
          👑
        </text>
      )}
    </g>
  );
}
