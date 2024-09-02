import { xyTag } from "../coord-tools";
import { HexTag, TerrainType } from "../flavours";
import { HexData } from "../state/terrain";
import { XY } from "../types";

const hex = (
  terrain: TerrainType,
  x: number,
  y: number,
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
  data: Record<number, HexTag[]>;

  constructor() {
    this.data = {};
  }

  set(x: number, tag: HexTag) {
    const array = this.data[x] ?? [];
    array.push(tag);
    this.data[x] = array;
    return this;
  }

  done() {
    return this.data;
  }
}
function makeHexTags(...groups: [HexTag, ...(number | [number, number])[]][]) {
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
  y: number,
  x: number,
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

export const xy = (x: number, y: number): XY => ({ x, y });
