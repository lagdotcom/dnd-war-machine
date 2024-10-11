import classNames from "classnames";
import { useMemo } from "react";

import { oddQToPixel } from "../coord-tools";
import { LocationData } from "../state/locations";
import { useLayoutContext } from "./Layout";

export default function Location({ x, y, type, name, defense }: LocationData) {
  const { layout, pointsAsString } = useLayoutContext();
  const pixel = useMemo(() => oddQToPixel(layout, { x, y }), [layout, x, y]);

  return (
    <g
      className={classNames("location", type, defense)}
      transform={`translate(${pixel.x},${pixel.y})`}
    >
      <polygon points={pointsAsString} />
      <text y="0.3em" textAnchor="middle">
        {name}
      </text>
    </g>
  );
}
