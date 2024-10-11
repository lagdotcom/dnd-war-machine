import { useMemo } from "react";

import { oddQLineDraw, oddQToPixel } from "../coord-tools";
import { LineData } from "../state/lines";
import { useLayoutContext } from "./Layout";

export default function Line({ start, end, thickness, className }: LineData) {
  const { layout } = useLayoutContext();
  const points = useMemo(() => {
    let points = "M";
    points += oddQLineDraw(start, end)
      .map((hex) => {
        const p = oddQToPixel(layout, hex);
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
