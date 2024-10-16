// https://spin.atomicobject.com/typescript-flexible-nominal-typing/
interface Flavouring<FlavourT> {
  _type?: FlavourT;
}
type Flavour<T, FlavourT> = T & Flavouring<FlavourT>;

export type ClassName = Flavour<string, "ClassName">;
export type HexTag = Flavour<string, "HexTag">;
export type LocationType = Flavour<string, "LocationType">;
export type TerrainType = Flavour<string, "TerrainType">;
export type UnitID = Flavour<string, "UnitID">;

export type AbilityBonus = Flavour<number, "AbilityBonus">;
export type ArmourClass = Flavour<number, "ArmourClass">;
export type CartesianCoord = Flavour<number, "CartesianCoord">;
export type CubicCoord = Flavour<number, "CubicCoord">;
export type Damage = Flavour<number, "Damage">;
export type Days = Flavour<number, "Days">;
export type ExperienceLevel = Flavour<number, "ExperienceLevel">;
export type LineID = Flavour<number, "LineID">;
export type Miles = Flavour<number, "Miles">;
export type Months = Flavour<number, "Months">;
export type Percentage = Flavour<number, "Percentage">;
export type Pixels = Flavour<number, "Pixels">;
export type Ratio = Flavour<number, "Ratio">;
export type Side = Flavour<number, "Side">;
export type Weeks = Flavour<number, "Weeks">;
