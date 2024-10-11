import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Days, HexTag, Side, UnitID } from "../flavours";
import { Fatigue, Force, QuickForce, XY } from "../types";
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
  fatigue: Fatigue;
  fatigueDuration: Days;
} & XY &
  (NormalUnit | QuickUnit);

export interface PostCombatUpdate {
  id: UnitID;
  casualties: number;
  fatigue?: { level: Fatigue; duration: Days };
  position?: XY;
}

const unitsAdapter = createEntityAdapter<Unit>();

const unitsSlice = createSlice({
  name: "units",
  initialState: unitsAdapter.getInitialState(),
  reducers: {
    removeUnit: unitsAdapter.removeOne,
    setUnits: unitsAdapter.setAll,
    updateUnit: unitsAdapter.updateOne,

    postCombatUnitUpdate(
      state,
      {
        payload: { id, casualties, fatigue, position },
      }: PayloadAction<PostCombatUpdate>,
    ) {
      const unit = state.entities[id];

      unit.force.numberOfTroops -= casualties;
      if (fatigue && unit.fatigue < fatigue?.level) {
        unit.fatigue = fatigue.level;
        unit.fatigueDuration = fatigue.duration;
      }

      if (position) {
        unit.x = position.x;
        unit.y = position.y;
      }
    },
  },
});

export const { postCombatUnitUpdate, removeUnit, setUnits, updateUnit } =
  unitsSlice.actions;
export default unitsSlice.reducer;

export const {
  selectAll: selectAllUnits,
  selectById: selectUnitById,
  selectEntities: selectUnitEntities,
} = unitsAdapter.getSelectors<RootState>((s) => s.units);
