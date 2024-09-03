import { xyTag } from "../coord-tools";
import { CartesianCoord, HexTag, TerrainType } from "../flavours";
import { HexData } from "../state/terrain";
import { XY } from "../types";

const hex = (
  terrain: TerrainType,
  x: CartesianCoord,
  y: CartesianCoord,
  tags: HexTag[] = [],
): HexData => ({
  id: xyTag({ x, y }),
  x,
  y,
  terrain,
  tags,
});

const conversions: Record<string, TerrainType> = {
  h: "hill",
  H: "mountain",
  g: "grass",
  w: "wood",
  m: "marsh",
  s: "sea",
};

class Tags {
  data: Record<CartesianCoord, HexTag[]>;

  constructor() {
    this.data = {};
  }

  set(x: CartesianCoord, tag: HexTag) {
    const array = this.data[x] ?? [];
    array.push(tag);
    this.data[x] = array;
    return this;
  }

  done() {
    return this.data;
  }
}
function makeHexTags(
  ...groups: [
    HexTag,
    ...(CartesianCoord | [CartesianCoord, CartesianCoord])[],
  ][]
) {
  const tags = new Tags();
  for (const [tag, ...gs] of groups) {
    for (const g of gs) {
      if (typeof g === "number") tags.set(g, tag);
      else {
        const [s, e] = g;
        for (let x = s; x <= e; x++) tags.set(x, tag);
      }
    }
  }

  return tags.done();
}

export function* row(
  y: CartesianCoord,
  x: CartesianCoord,
  data: string,
  ...hexTagParams: Parameters<typeof makeHexTags>
) {
  const tagsByX = makeHexTags(...hexTagParams);
  for (const ch of data) {
    const terrain = conversions[ch];
    if (terrain) yield hex(terrain, x, y, tagsByX[x]);
    x++;
  }
}

export const xy = (x: CartesianCoord, y: CartesianCoord): XY => ({ x, y });
