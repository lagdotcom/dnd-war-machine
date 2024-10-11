import { PropsWithChildren, useMemo } from "react";

import { oddQToPixel } from "../coord-tools";
import { ClassName } from "../flavours";
import { XY } from "../types";
import { useLayoutContext } from "./Layout";

export type HexagonProps = PropsWithChildren<
  XY & {
    className?: ClassName;
    fill?: string;
    extra?: ClassName;
  }
>;

export default function Hexagon({
  children,
  x,
  y,
  className,
  fill,
  extra,
}: HexagonProps) {
  const { layout, pointsAsString } = useLayoutContext();

  const transform = useMemo(() => {
    const pixel = oddQToPixel(layout, { x, y });
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
