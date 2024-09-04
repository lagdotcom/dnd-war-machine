import { PropsWithChildren, useMemo } from "react";
import { Hexagon } from "react-hexgrid";

import { oddQToCube } from "../coord-tools";
import { ClassName } from "../flavours";
import { XY } from "../types";

export type HexagonXYProps = PropsWithChildren<
  XY & {
    className?: ClassName;
  }
>;

export default function HexagonXY({
  x,
  y,
  children,
  ...props
}: HexagonXYProps) {
  const { q, r, s } = useMemo(() => oddQToCube({ x, y }), [x, y]);
  return (
    <Hexagon q={q} r={r} s={s} {...props}>
      {children}
    </Hexagon>
  );
}
