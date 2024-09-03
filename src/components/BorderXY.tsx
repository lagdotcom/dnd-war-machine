import { useMemo } from "react";
import { HexUtils } from "react-hexgrid";
import { useLayoutContext } from "react-hexgrid/lib/Layout";

import { oddq_to_cube } from "../coord-tools";
import { HexBorder } from "../state/borders";

export function BorderXY({ x, y, thickness, start, end }: HexBorder) {
  const { q, r, s } = useMemo(() => oddq_to_cube({ x, y }), [x, y]);
  const { layout, points } = useLayoutContext();

  const linePoints = useMemo(() => {
    const positionPoints = points
      .split(" ")
      .map((p) => p.split(","))
      .map(([px, py]) => ({ x: Number(px), y: Number(py) }));

    const linePoints: string[] = [];

    for (let s = start; s <= end; s++) {
      const pp = positionPoints[s % 6];
      linePoints.push(`${pp.x},${pp.y}`);
    }

    return linePoints.join(" ");
  }, [points, start, end]);

  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  return (
    <g className="border" transform={`translate(${pixel.x},${pixel.y})`}>
      <polyline
        points={linePoints}
        fill="transparent"
        strokeWidth={thickness}
      />
    </g>
  );
}
