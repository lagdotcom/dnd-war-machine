import { useMemo } from "react";

import { ClassName } from "../flavours";
import { useAppSelector } from "../state/hooks";
import { selectAllTerrain } from "../state/terrain";
import { XY } from "../types";
import HexagonXY from "./HexagonXY";

interface HexLayerProps {
  onClick?: (xy: XY) => void;
  onHover?: (xy: XY) => void;
}

export default function HexLayer({ onClick, onHover }: HexLayerProps) {
  const hexes = useAppSelector(selectAllTerrain);

  const hexElements = useMemo(
    () =>
      hexes.map(({ x, y, terrain }, i) => (
        <HexagonXY
          key={i}
          x={x}
          y={y}
          className={terrain as ClassName}
          onClick={onClick}
          onHover={onHover}
        />
      )),
    [hexes, onClick, onHover],
  );

  return <g id="hexes">{hexElements}</g>;
}
