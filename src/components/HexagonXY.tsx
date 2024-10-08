import { PropsWithChildren, useMemo } from "react";
import { HexUtils } from "react-hexgrid";

import { oddQToCube } from "../coord-tools";
import { ClassName } from "../flavours";
import { XY } from "../types";
import { useLayoutContext } from "./Layout";

export type HexagonXYProps = PropsWithChildren<
  XY & {
    className?: ClassName;
    fill?: string;
    extra?: ClassName;
  }
>;

export default function HexagonXY({
  children,
  x,
  y,
  className,
  fill,
  extra,
}: HexagonXYProps) {
  const { layout, pointsAsString } = useLayoutContext();

  const transform = useMemo(() => {
    const qrs = oddQToCube({ x, y });
    const pixel = HexUtils.hexToPixel(qrs, layout);
    return `translate(${pixel.x}, ${pixel.y})`;
  }, [x, y, layout]);

  return (
    <g className={className} transform={transform}>
      <g className="hexagon">
        <polygon
          className="terrain"
          points={pointsAsString}
          fill={fill && `url(#${fill})`}
        />
        {extra && <polygon className={extra} points={pointsAsString} />}
        {children}
      </g>
    </g>
  );
}
