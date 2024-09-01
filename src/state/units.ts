import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { Force, QuickForce, XY } from "../types";
import { RootState } from "./store";

interface NormalUnit {
  type: "normal";
  force: Force;
}

interface QuickUnit {
  type: "quick";
  force: QuickForce;
}

export type Unit = {
  id: string;
  liegeTag?: string;
  side: number;
} & XY &
  (NormalUnit | QuickUnit);

const unitsAdapter = createEntityAdapter<Unit>();

const unitsSlice = createSlice({
  name: "units",
  initialState: unitsAdapter.getInitialState(),
  reducers: {
    addUnit: unitsAdapter.addOne,
    addUnits: unitsAdapter.addMany,
    updateUnit: unitsAdapter.updateOne,
  },
});

export const { addUnit, addUnits, updateUnit } = unitsSlice.actions;
export default unitsSlice.reducer;

export const selectUnits = (state: RootState) => state.units;
