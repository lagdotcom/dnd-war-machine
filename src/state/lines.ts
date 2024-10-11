import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { ClassName, LineID, Pixels } from "../flavours";
import { XY } from "../types";
import { RootState } from "./store";

export interface LineData {
  id: LineID;
  start: XY;
  end: XY;
  thickness: Pixels;
  className: ClassName;
}

const linesAdapter = createEntityAdapter<LineData>();

const linesSlice = createSlice({
  name: "lines",
  initialState: linesAdapter.getInitialState(),
  reducers: { setLines: linesAdapter.setAll },
});

export const { setLines } = linesSlice.actions;
export default linesSlice.reducer;

export const { selectAll: selectAllLines } =
  linesAdapter.getSelectors<RootState>((s) => s.lines);
