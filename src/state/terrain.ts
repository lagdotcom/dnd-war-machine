import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { HexTag, TerrainType } from "../flavours";
import { XY, XYTag } from "../types";
import { RootState } from "./store";

export interface HexData extends XY {
  id: XYTag;
  terrain: TerrainType;
  tags: HexTag[];
}

const hexAdapter = createEntityAdapter<HexData>();

const terrainSlice = createSlice({
  name: "terrain",
  initialState: hexAdapter.getInitialState(),
  reducers: { setTerrain: hexAdapter.setAll, updateHex: hexAdapter.updateOne },
});

export const { setTerrain, updateHex } = terrainSlice.actions;
export default terrainSlice.reducer;

export const {
  selectAll: selectAllTerrain,
  selectById: selectHexById,
  selectEntities: selectTerrainEntities,
} = hexAdapter.getSelectors<RootState>((s) => s.terrain);
