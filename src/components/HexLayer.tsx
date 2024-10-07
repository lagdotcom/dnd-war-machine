import { MouseEvent, MouseEventHandler, useCallback, useMemo } from "react";

import { pixelToOddQ, xyTag } from "../coord-tools";
import { ClassName } from "../flavours";
import { useAppSelector } from "../state/hooks";
import { selectAttackHexTags, selectMoveHexTags } from "../state/selectors";
import { selectAllTerrain } from "../state/terrain";
import { XY, XYTag } from "../types";
import HexagonXY from "./HexagonXY";
import { useLayoutContext } from "./Layout";

interface HexLayerProps {
  offset: XY;
  zoom: number;

  onClick?: (xy: XYTag) => void;
  onHover?: (xy: XYTag) => void;
}

export default function HexLayer({
  offset,
  zoom,
  onClick,
  onHover,
}: HexLayerProps) {
  const { layout } = useLayoutContext();

  const hexes = useAppSelector(selectAllTerrain);
  const canAttack = useAppSelector(selectAttackHexTags);
  const canMove = useAppSelector(selectMoveHexTags);

  const getExtraClass = useCallback(
    (xy: XY) => {
      const tag = xyTag(xy);
      if (canAttack[tag]) return "can-attack";
      if (canMove.includes(tag)) return "can-move";
    },
    [canAttack, canMove],
  );

  const hexElements = useMemo(
    () =>
      hexes.map((h, i) => (
        <HexagonXY
          key={i}
          x={h.x}
          y={h.y}
          className={h.terrain as ClassName}
          extra={getExtraClass(h)}
        />
      )),
    [getExtraClass, hexes],
  );

  const convert = useCallback(
    (e: MouseEvent) => ({
      x: (e.clientX - offset.x) / zoom,
      y: (e.clientY - offset.y) / zoom,
    }),
    [offset, zoom],
  );

  const click = useCallback<MouseEventHandler>(
    (e) => onClick?.(xyTag(pixelToOddQ(layout, convert(e)))),
    [convert, layout, onClick],
  );
  const move = useCallback<MouseEventHandler>(
    (e) => onHover?.(xyTag(pixelToOddQ(layout, convert(e)))),
    [convert, layout, onHover],
  );

  return (
    <g id="hexes" onClick={click} onMouseMove={move}>
      {hexElements}
    </g>
  );
}
