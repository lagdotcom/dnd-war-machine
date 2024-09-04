import { useMemo } from "react";
import { HexUtils } from "react-hexgrid";

import { oddQToCube } from "../coord-tools";
import { HexBorder } from "../state/borders";
import { useLayoutContext } from "./Layout";

export default function BorderXY({ x, y, thickness, start, end }: HexBorder) {
  const { layout, points } = useLayoutContext();

  const linePoints = useMemo(() => {
    const linePoints: string[] = [];

    for (let s = start; s <= end; s++) {
      const pp = points[s % 6];
      linePoints.push(`${pp.x},${pp.y}`);
    }

    return linePoints.join(" ");
  }, [points, start, end]);

  const transform = useMemo(() => {
    const qrs = oddQToCube({ x, y });
    const pixel = HexUtils.hexToPixel(qrs, layout);
    return `translate(${pixel.x},${pixel.y})`;
  }, [x, y, layout]);

  return (
    <g className="border" transform={transform}>
      <polyline points={linePoints} strokeWidth={thickness} />
    </g>
  );
}
