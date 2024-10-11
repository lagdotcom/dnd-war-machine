import { useMemo } from "react";
import { Hex, HexUtils } from "react-hexgrid";

import { oddQToCube } from "../coord-tools";
import { HexLine } from "../state/lines";
import { useLayoutContext } from "./Layout";

export default function LineXY({ start, end, thickness, className }: HexLine) {
  const { layout } = useLayoutContext();
  const points = useMemo(() => {
    const startCubic = oddQToCube(start);
    const endCubic = oddQToCube(end);

    const distance = HexUtils.distance(startCubic, endCubic);
    const intersects: Hex[] = [];
    const step = 1.0 / Math.max(distance, 1);
    for (let i = 0; i <= distance; i++)
      intersects.push(
        HexUtils.round(HexUtils.hexLerp(startCubic, endCubic, step * i)),
      );

    let points = "M";
    points += intersects
      .map((hex) => {
        const p = HexUtils.hexToPixel(hex, layout);
        return ` ${p.x},${p.y} `;
      })
      .join("L");

    return points;
  }, [end, layout, start]);

  return (
    <path
      className={className}
      strokeWidth={thickness}
      fill="transparent"
      d={points}
    />
  );
}
