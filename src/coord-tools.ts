import { LayoutDimension } from "react-hexgrid/lib/Layout";

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

function hexRound(h: { q: CubicCoord; r: CubicCoord; s: CubicCoord }) {
  let q = Math.round(h.q);
  let r = Math.round(h.r);
  let s = Math.round(h.s);

  const qDiff = Math.abs(q - h.q);
  const rDiff = Math.abs(r - h.r);
  const sDiff = Math.abs(s - h.s);
  if (qDiff > rDiff && qDiff > sDiff) q = -r - s;
  else if (rDiff > sDiff) r = -q - s;
  else s = -q - r;

  return { q, r, s };
}

export function pixelToHex(
  { orientation, origin, size }: LayoutDimension,
  p: XY,
) {
  const px = (p.x - origin.x) / size.x;
  const py = (p.y - origin.y) / size.y;
  const q = orientation.b0 * px + orientation.b1 * py;
  const r = orientation.b2 * px + orientation.b3 * py;
  const s = -q - r;
  return cubeToOddQ(hexRound({ q, r, s }));
}
