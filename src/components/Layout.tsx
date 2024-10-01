import { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { xy } from "../data/tools";
import { ClassName } from "../flavours";
import { XY } from "../types";

interface Orientation {
  f0: number;
  f1: number;
  f2: number;
  f3: number;
  b0: number;
  b1: number;
  b2: number;
  b3: number;
  startAngle: number;
}

export interface LayoutDimension {
  size: XY;
  orientation: Orientation;
  origin: XY;
  spacing: number;
}
export interface LayoutContextProps {
  layout: LayoutDimension;
  points: XY[];
  pointsAsString: string;
}

const LAYOUT_FLAT: Orientation = {
  f0: 3.0 / 2.0,
  f1: 0.0,
  f2: Math.sqrt(3.0) / 2.0,
  f3: Math.sqrt(3.0),
  b0: 2.0 / 3.0,
  b1: 0.0,
  b2: -1.0 / 3.0,
  b3: Math.sqrt(3.0) / 3.0,
  startAngle: 0.0,
};
const LAYOUT_POINTY: Orientation = {
  f0: Math.sqrt(3.0),
  f1: Math.sqrt(3.0) / 2.0,
  f2: 0.0,
  f3: 3.0 / 2.0,
  b0: Math.sqrt(3.0) / 3.0,
  b1: -1.0 / 3.0,
  b2: 0.0,
  b3: 2.0 / 3.0,
  startAngle: 0.5,
};
const defaultSize = xy(10, 10);
const defaultOrigin = xy(0, 0);
const defaultSpacing = 1.0;

const Context = createContext<LayoutContextProps>({
  layout: {
    size: defaultSize,
    orientation: LAYOUT_FLAT,
    origin: defaultOrigin,
    spacing: defaultSpacing,
  },
  points: [],
  pointsAsString: "",
});

export const useLayoutContext = () => useContext(Context);

/**
 * Calculates the points for a hexagon given the size, angle, and center
 * @param circumradius Radius of the Hexagon
 * @param angle Angle offset for the hexagon in radians
 * @param center Central point for the hexagon
 * @returns Array of 6 points
 */

function calculateCoordinates(
  circumradius: number,
  angle = 0,
  center = xy(0, 0),
) {
  const corners: XY[] = [];

  for (let i = 0; i < 6; i++) {
    const x = circumradius * Math.cos((2 * Math.PI * i) / 6 + angle);
    const y = circumradius * Math.sin((2 * Math.PI * i) / 6 + angle);
    const point = xy(center.x + x, center.y + y);
    corners.push(point);
  }

  return corners;
}

export type LayoutProps = PropsWithChildren<{
  className?: ClassName;
  flat?: boolean;
  origin?: XY;
  size?: XY;
  space?: number;
  spacing?: number;
}>;

/**
 * Provides LayoutContext for all descendants and renders child elements inside a <g> (Group) element
 */
export function Layout({
  size = defaultSize,
  flat = true,
  spacing = defaultSpacing,
  origin = defaultOrigin,
  children,
  className,
  space,
}: LayoutProps) {
  const value = useMemo<LayoutContextProps>(() => {
    const orientation = flat ? LAYOUT_FLAT : LAYOUT_POINTY;
    const angle = flat ? 0 : Math.PI / 6;
    const points = calculateCoordinates(size.x, angle);

    return {
      layout: { space, orientation, size, origin, spacing },
      points,
      pointsAsString: points.map((p) => `${p.x},${p.y}`).join(" "),
    };
  }, [flat, size, space, origin, spacing]);

  return (
    <Context.Provider value={value}>
      <g className={className}>{children}</g>
    </Context.Provider>
  );
}

export default Layout;
