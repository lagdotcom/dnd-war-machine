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
  reducers: { setTerrain: hexAdapter.setAll },
});

export const { setTerrain } = terrainSlice.actions;
export default terrainSlice.reducer;

export const {
  selectAll: selectAllTerrain,
  selectById: selectHexById,
  selectEntities: selectTerrainEntities,
} = hexAdapter.getSelectors<RootState>((s) => s.terrain);
