import { useMemo } from "react";

import { oddQToPixel } from "../coord-tools";
import { BorderData } from "../state/borders";
import { useLayoutContext } from "./Layout";

export default function Border({ x, y, thickness, start, end }: BorderData) {
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
    const pixel = oddQToPixel(layout, { x, y });
    return `translate(${pixel.x},${pixel.y})`;
  }, [x, y, layout]);

  return (
    <g className="border" transform={transform}>
      <polyline points={linePoints} strokeWidth={thickness} />
    </g>
  );
}
