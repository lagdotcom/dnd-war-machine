import { HexUtils } from "react-hexgrid";

import { cubeToOddQ, oddQToCube, xyTag } from "../coord-tools";
import {
  CartesianCoord,
  ClassName,
  HexTag,
  LineID,
  LocationType,
  Pixels,
  TerrainType,
} from "../flavours";
import { TerrainEffect } from "../movement";
import { HexBorder } from "../state/borders";
import { HexLine } from "../state/lines";
import { HexLocation } from "../state/locations";
import { HexData } from "../state/terrain";
import { XY, XYTag } from "../types";

const conversions: Record<
  string,
  { type: TerrainType; effects: TerrainEffect[] }
> = {
  h: { type: "hill", effects: ["hill"] },
  H: { type: "mountain", effects: ["mountain"] },
  g: { type: "grass", effects: ["grassland"] },
  w: { type: "wood", effects: ["forest"] },
  m: { type: "marsh", effects: ["swamp"] },
  s: { type: "sea", effects: [] },
};

export default class MapBuilder {
  borders: HexBorder[];
  hexes: Record<XYTag, HexData>;
  locations: HexLocation[];
  lines: HexLine[];
  private nextLineID: LineID;

  constructor() {
    this.borders = [];
    this.hexes = {};
    this.locations = [];
    this.lines = [];
    this.nextLineID = 1;
  }

  terrain(startX: CartesianCoord, y: CartesianCoord, data: string) {
    for (const row of data.trim().split("\n")) {
      let x = startX;

      for (const c of row) {
        const terrain = conversions[c];
        if (!terrain) throw new Error(`invalid terrain char: ${c}`);

        const id = xyTag({ x, y });
        this.hexes[id] = {
          id,
          x,
          y,
          terrain: terrain.type,
          effects: terrain.effects.slice(),
          tags: [],
        };

        x++;
      }

      y++;
    }

    return this;
  }

  tag(
    tag: HexTag,
    y: CartesianCoord,
    xStart: CartesianCoord,
    xEnd: CartesianCoord,
  ) {
    for (let x = xStart; x <= xEnd; x++)
      this.hexes[xyTag({ x, y })].tags.push(tag);

    return this;
  }

  settlement(
    x: CartesianCoord,
    y: CartesianCoord,
    type: LocationType,
    name: string,
    defense?: "walled" | "stronghold",
  ) {
    const id = xyTag({ x, y });
    this.locations.push({ id, x, y, type, name, defense });
    this.hexes[id].effects.push("city");
    if (defense) this.hexes[id].tags.push(defense);
    return this;
  }

  border(
    x: CartesianCoord,
    y: CartesianCoord,
    start: number,
    end: number,
    thickness: Pixels = 1,
  ) {
    this.borders.push({
      id: xyTag({ x, y }),
      x,
      y,
      start,
      end,
      thickness,
    });
    return this;
  }

  getHexData() {
    return Object.values(this.hexes);
  }

  line(
    className: ClassName,
    thickness: Pixels,
    x: CartesianCoord,
    y: CartesianCoord,
    path: string,
  ) {
    let lastPathChar = path[0];
    let start: XY = { x, y };
    let end: XY = { x, y };

    for (const ch of path + "!") {
      const dir = pathToDir[ch];
      if (ch !== lastPathChar) {
        this.lines.push({
          id: this.nextLineID++,
          className,
          thickness,
          start,
          end,
        });
        start = end;
        lastPathChar = ch;
      }

      end = cubeToOddQ(HexUtils.neighbor(oddQToCube(end), dir ?? 0));
    }
  }
}

const pathToDir: Record<string, number> = {
  "6": 0,
  "5": 5,
  "4": 4,
  "7": 3,
  "8": 2,
  "9": 1,
};
