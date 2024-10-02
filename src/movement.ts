import { Miles } from "./flavours";

export const TerrainEffects = [
  "trail",
  "unpaved road",
  "paved road",
  "clear",
  "city",
  "grassland",
  "forest",
  "muddy ground",
  "snow",
  "hill",
  "desert",
  "broken terrain",
  "mountain",
  "swamp",
  "jungle",
  "ice",
  "glacier",
] as const;
export type TerrainEffect = (typeof TerrainEffects)[number];

export const TerrainEffectRate: Record<TerrainEffect, number> = {
  trail: 1.5,
  "unpaved road": 1.5,
  "paved road": 1.5,

  clear: 1,
  city: 1,
  grassland: 1,

  forest: 2 / 3,
  "muddy ground": 2 / 3,
  snow: 2 / 3,
  hill: 2 / 3,
  desert: 2 / 3,
  "broken terrain": 2 / 3,

  mountain: 0.5,
  swamp: 0.5,
  jungle: 0.5,
  ice: 0.5,
  glacier: 0.5,
};

const unpavedRoadFilter: TerrainEffect[] = [
  "unpaved road",
  "muddy ground",
  "snow",
];
const pavedRoadFilter: TerrainEffect[] = ["paved road", "snow"];

export function getTerrainEffectModifier(effects: TerrainEffect[]) {
  if (effects.includes("unpaved road"))
    effects = effects.filter((e) => unpavedRoadFilter.includes(e));
  if (effects.includes("paved road"))
    effects = effects.filter((e) => pavedRoadFilter.includes(e));

  return effects.reduce((rate, e) => rate * TerrainEffectRate[e], 1);
}

export const TravelTypes = [
  "on foot", // 0-400cn
  "on foot light encumbrance", // 401-800 cn
  "on foot heavy encumbrance", // 801-1200 cn
  "camel",
  "elephant",
  "riding horse", // this requires 3 horses a day or the horses die
  "donkey/mule",
  "war horse",
  "draft horse",
  "ox",
] as const;
export type TravelType = (typeof TravelTypes)[number];

export interface TravelRate {
  trail: Miles;
  clear: Miles;
  hills: Miles;
  mountains: Miles;
  desert: Miles;
}
export type TravelRateType = keyof TravelRate;

const tr = (
  trail: Miles,
  clear: Miles,
  hills: Miles,
  mountains: Miles,
  desert: Miles,
): TravelRate => ({ trail, clear, hills, mountains, desert });

export const TravelRatePerDay: Record<TravelType, TravelRate> = {
  "on foot": tr(36, 24, 16, 12, 16),
  "on foot light encumbrance": tr(24, 12, 8, 6, 8),
  "on foot heavy encumbrance": tr(12, 8, 6, 4, 6),
  camel: tr(48, 32, 24, 16, 32),
  elephant: tr(36, 24, 12, 8, 8),
  "riding horse": tr(72, 48, 36, 24, 16),
  "donkey/mule": tr(36, 24, 16, 12, 16),
  "war horse": tr(36, 24, 16, 12, 8),
  "draft horse": tr(24, 16, 12, 8, 8),
  ox: tr(16, 12, 10, 8, 6),
};
