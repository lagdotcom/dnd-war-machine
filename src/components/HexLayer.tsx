import { MouseEvent, MouseEventHandler, useCallback, useMemo } from "react";
import { useLayoutContext } from "react-hexgrid/lib/Layout";

import { pixelToHex } from "../coord-tools";
import { ClassName } from "../flavours";
import { useAppSelector } from "../state/hooks";
import { selectAllTerrain } from "../state/terrain";
import { XY } from "../types";
import HexagonXY from "./HexagonXY";

interface HexLayerProps {
  offset: XY;
  zoom: number;

  onClick?: (xy: XY) => void;
  onHover?: (xy: XY) => void;
}

export default function HexLayer({
  offset,
  zoom,
  onClick,
  onHover,
}: HexLayerProps) {
  const { layout } = useLayoutContext();

  const hexes = useAppSelector(selectAllTerrain);
  const hexElements = useMemo(
    () =>
      hexes.map(({ x, y, terrain }, i) => (
        <HexagonXY key={i} x={x} y={y} className={terrain as ClassName} />
      )),
    [hexes],
  );

  const convert = useCallback(
    (e: MouseEvent) => ({
      x: (e.clientX - offset.x) / zoom,
      y: (e.clientY - offset.y) / zoom,
    }),
    [offset, zoom],
  );

  const click = useCallback<MouseEventHandler>(
    (e) => onClick?.(pixelToHex(layout, convert(e))),
    [layout, onClick],
  );
  const move = useCallback<MouseEventHandler>(
    (e) => onHover?.(pixelToHex(layout, convert(e))),
    [layout, onHover],
  );

  return (
    <g id="hexes" onClick={click} onMouseMove={move}>
      {hexElements}
    </g>
  );
}
