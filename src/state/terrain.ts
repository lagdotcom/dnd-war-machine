import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { HexTag, TerrainType } from "../flavours";
import { TerrainEffect } from "../movement";
import { XY, XYTag } from "../types";
import { RootState } from "./store";

export interface TerrainData extends XY {
  id: XYTag;
  terrain: TerrainType;
  effects: TerrainEffect[];
  tags: HexTag[];
}

const terrainAdapter = createEntityAdapter<TerrainData>();

const terrainSlice = createSlice({
  name: "terrain",
  initialState: terrainAdapter.getInitialState(),
  reducers: { setTerrain: terrainAdapter.setAll },
});

export const { setTerrain } = terrainSlice.actions;
export default terrainSlice.reducer;

export const {
  selectAll: selectAllTerrain,
  selectById: selectHexById,
  selectEntities: selectTerrainEntities,
} = terrainAdapter.getSelectors<RootState>((s) => s.terrain);
