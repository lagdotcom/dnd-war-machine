import { LayoutDimension } from "./components/Layout";
import { CartesianCoord, CubicCoord } from "./flavours";
import { XY, XYTag } from "./types";

interface QRS {
  q: CubicCoord;
  r: CubicCoord;
  s: CubicCoord;
}

export enum HexDir {
  SE = 0,
  NE,
  N,
  NW,
  SW,
  S,
}

export function cubeToOddQ({ q, r }: QRS): XY {
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

function cubeRound(frac: QRS): QRS {
  let q = Math.round(frac.q);
  let r = Math.round(frac.r);
  let s = Math.round(frac.s);

  const qDiff = Math.abs(q - frac.q);
  const rDiff = Math.abs(r - frac.r);
  const sDiff = Math.abs(s - frac.s);

  if (qDiff > rDiff && qDiff > sDiff) {
    q = -r - s;
  } else if (rDiff > sDiff) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
}

function pixelToCube(layout: LayoutDimension, point: XY): QRS {
  const px = point.x - layout.origin.x;
  const py = point.y - layout.origin.y;
  const q = ((2 / 3) * px) / layout.size.x;
  const r = ((-1 / 3) * px + (Math.sqrt(3) / 3) * py) / layout.size.y;
  const s = -q - r;
  return cubeRound({ q, r, s });
}

export function pixelToOddQ(layout: LayoutDimension, p: XY) {
  return cubeToOddQ(pixelToCube(layout, p));
}

export function oddQToPixel(layout: LayoutDimension, hex: XY): XY {
  const x = layout.origin.x + ((layout.size.x * 3) / 2) * hex.x;
  const y =
    layout.origin.y +
    layout.size.y * Math.sqrt(3) * (hex.y + 0.5 * (hex.x & 1));
  return { x, y };
}

function cubeDistance(a: QRS, b: QRS) {
  return (Math.abs(a.q - b.q) + Math.abs(a.r - b.r) + Math.abs(a.s - b.s)) / 2;
}

export function oddQDistance(a: XY, b: XY) {
  return cubeDistance(oddQToCube(a), oddQToCube(b));
}

function lerp<T extends number>(a: T, b: T, t: number) {
  return (a + (b - a) * t) as T;
}

function cubeLerp(a: QRS, b: QRS, t: number) {
  return { q: lerp(a.q, b.q, t), r: lerp(a.r, b.r, t), s: lerp(a.s, b.s, t) };
}

function cubeLineDraw(a: QRS, b: QRS) {
  const N = cubeDistance(a, b);
  const results = [];
  for (let i = 0; i <= N; i++)
    results.push(cubeRound(cubeLerp(a, b, (1.0 / N) * i)));
  return results;
}

export function oddQLineDraw(a: XY, b: XY) {
  return cubeLineDraw(oddQToCube(a), oddQToCube(b)).map(cubeToOddQ);
}

const oddQDirectionDifferences = [
  // even cols
  [
    [+1, 0],
    [+1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [0, +1],
  ],
  // odd cols
  [
    [+1, +1],
    [+1, 0],
    [0, -1],
    [-1, 0],
    [-1, +1],
    [0, +1],
  ],
];

export function oddQOffsetNeighbor(hex: XY, direction: HexDir): XY {
  const parity = hex.x & 1;
  const [dx, dy] = oddQDirectionDifferences[parity][direction];
  return { x: hex.x + dx, y: hex.y + dy };
}

export function oddQNeighbors(hex: XY) {
  const neighbors: XY[] = [];
  for (let i = 0; i < 6; i++) neighbors.push(oddQOffsetNeighbor(hex, i));
  return neighbors;
}
