import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { Pixels } from "../flavours";
import { XY, XYTag } from "../types";
import { RootState } from "./store";

export interface BorderData extends XY {
  id: XYTag;
  thickness: Pixels;
  start: number;
  end: number;
}

const bordersAdapter = createEntityAdapter<BorderData>();

const bordersSlice = createSlice({
  name: "borders",
  initialState: bordersAdapter.getInitialState(),
  reducers: { setBorders: bordersAdapter.setAll },
});

export const { setBorders } = bordersSlice.actions;
export default bordersSlice.reducer;

export const { selectAll: selectAllBorders } =
  bordersAdapter.getSelectors<RootState>((s) => s.borders);
