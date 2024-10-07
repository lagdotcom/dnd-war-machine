import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { HexTag, Side, UnitID } from "../flavours";
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
  id: UnitID;
  liegeTag?: HexTag;
  side: Side;
} & XY &
  (NormalUnit | QuickUnit);

const unitsAdapter = createEntityAdapter<Unit>();

const unitsSlice = createSlice({
  name: "units",
  initialState: unitsAdapter.getInitialState(),
  reducers: {
    setUnits: unitsAdapter.setAll,
    updateUnit: unitsAdapter.updateOne,
  },
});

export const { setUnits, updateUnit } = unitsSlice.actions;
export default unitsSlice.reducer;

export const {
  selectAll: selectAllUnits,
  selectById: selectUnitById,
  selectEntities: selectUnitEntities,
} = unitsAdapter.getSelectors<RootState>((s) => s.units);
