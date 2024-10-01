import { HexUtils } from "react-hexgrid";

import { LayoutDimension } from "./components/Layout";
import { CartesianCoord, CubicCoord } from "./flavours";
import { XY, XYTag } from "./types";

export function cubeToOddQ({ q, r }: { q: CubicCoord; r: CubicCoord }): XY {
  const x = q as CartesianCoord;
  const y = r + (q - (q & 1)) / 2;
  return { x, y };
}

export function oddQToCube({ x, y }: XY) {
  const q = x as CubicCoord;
  const r = (y - (x - (x & 1)) / 2) as CubicCoord;
  const s = (-q - r) as CubicCoord;
  return { q, r, s };
}

export const xyTag = ({ x, y }: XY): XYTag => `${x},${y}`;
export const tagToXY = (tag: XYTag): XY => {
  const [x, y] = tag.split(",").map(Number);
  return { x, y };
};

export function pixelToOddQ(layout: LayoutDimension, p: XY) {
  const hex = HexUtils.pixelToHex(p, layout);
  return cubeToOddQ(hex);
}
