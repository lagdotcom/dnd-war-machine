import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { HexUtils, Text } from "react-hexgrid";

import { oddQToCube, xyTag } from "../coord-tools";
import { useAppSelector } from "../state/hooks";
import { selectAttackHexTags, selectSelectedUnitId } from "../state/selectors";
import { selectHexById } from "../state/terrain";
import { Unit } from "../state/units";
import clamp from "../tools/clamp";
import { useLayoutContext } from "./Layout";

function getUnitRadius(troops: number) {
  return clamp(troops / 50, 4, 10);
}

export default function UnitXY({
  unit,
  onClick,
  onHover,
}: {
  unit: Unit;
  onClick?: (unit: Unit) => void;
  onHover?: (unit: Unit) => void;
}) {
  const { liegeTag, side, force } = unit;
  const click = useCallback(() => onClick?.(unit), [onClick, unit]);
  const mouseEnter = useCallback(() => onHover?.(unit), [onHover, unit]);

  const { q, r, s } = useMemo(() => oddQToCube(unit), [unit]);
  const { layout } = useLayoutContext();
  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

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
      <Text y="1.25em">{force.name}</Text>
      {inTerritoryOfLiege && <Text>👑</Text>}
    </g>
  );
}
