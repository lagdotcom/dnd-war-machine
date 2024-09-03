import { PropsWithChildren, useCallback, useMemo } from "react";
import { Hexagon } from "react-hexgrid";

import { oddq_to_cube } from "../coord-tools";
import { ClassName } from "../flavours";
import { XY } from "../types";

export type HexagonXYProps = PropsWithChildren<
  XY & {
    className?: ClassName;
    onClick?: (xy: XY) => void;
    onHover?: (xy: XY) => void;
  }
>;

export default function HexagonXY({
  x,
  y,
  children,
  onClick,
  onHover,
  ...props
}: HexagonXYProps) {
  const click = useCallback(() => onClick?.({ x, y }), [onClick, x, y]);
  const hover = useCallback(() => onHover?.({ x, y }), [onHover, x, y]);

  const { q, r, s } = useMemo(() => oddq_to_cube({ x, y }), [x, y]);
  return (
    <Hexagon q={q} r={r} s={s} onClick={click} onMouseOver={hover} {...props}>
      {children}
    </Hexagon>
  );
}
