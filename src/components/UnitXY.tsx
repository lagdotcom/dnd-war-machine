import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { HexUtils, Text } from "react-hexgrid";

import { oddQToCube, xyTag } from "../coord-tools";
import { useAppSelector } from "../state/hooks";
import { getHexById } from "../state/terrain";
import { Unit } from "../state/units";
import clamp from "../tools/clamp";
import { useLayoutContext } from "./Layout";

function getUnitRadius(troops: number) {
  return clamp(troops / 50, 4, 10);
}

export default function UnitXY({
  selected,
  unit,
  onClick,
  onHover,
  onHoverEnd,
}: {
  selected?: boolean;
  unit: Unit;
  onClick?: (unit: Unit) => void;
  onHover?: (unit: Unit) => void;
  onHoverEnd?: (unit: Unit) => void;
}) {
  const { liegeTag, side, force } = unit;
  const click = useCallback(() => onClick?.(unit), [onClick, unit]);
  const mouseEnter = useCallback(() => onHover?.(unit), [onHover, unit]);
  const mouseLeave = useCallback(() => onHoverEnd?.(unit), [onHoverEnd, unit]);

  const { q, r, s } = useMemo(() => oddQToCube(unit), [unit]);
  const { layout } = useLayoutContext();
  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  const tag = xyTag(unit);
  const inHex = useAppSelector((state) => getHexById(state, tag));
  const inTerritoryOfLiege = liegeTag && inHex.tags.includes(liegeTag);

  return (
    <g
      className={classNames("unit", `side-${side}`, {
        "in-liege": inTerritoryOfLiege,
        selected,
      })}
      transform={`translate(${pixel.x},${pixel.y})`}
      onClick={click}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <circle r={getUnitRadius(force.numberOfTroops)} />
      <Text y="1.25em">{force.name}</Text>
      {inTerritoryOfLiege && <Text>👑</Text>}
    </g>
  );
}
