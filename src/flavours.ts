// https://spin.atomicobject.com/typescript-flexible-nominal-typing/
interface Flavouring<FlavourT> {
  _type?: FlavourT;
}
type Flavour<T, FlavourT> = T & Flavouring<FlavourT>;

export type HexTag = Flavour<string, "HexTag">;
export type TerrainType = Flavour<string, "TerrainType">;
