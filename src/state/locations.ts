import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { LocationType } from "../flavours";
import { XY, XYTag } from "../types";
import { RootState } from "./store";

export interface HexLocation extends XY {
  id: XYTag;
  type: LocationType;
  name: string;
  defense?: "walled" | "stronghold";
}

const locationsAdapter = createEntityAdapter<HexLocation>();

const locationsSlice = createSlice({
  name: "locations",
  initialState: locationsAdapter.getInitialState(),
  reducers: { setLocations: locationsAdapter.setAll },
});

export const { setLocations } = locationsSlice.actions;
export default locationsSlice.reducer;

export const { selectAll: selectAllLocations } =
  locationsAdapter.getSelectors<RootState>((s) => s.locations);
