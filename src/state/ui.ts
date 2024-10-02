import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UnitID } from "../flavours";
import { XYTag } from "../types";

export interface PendingBattle {
  attacker: UnitID;
  defender: UnitID;
}

interface UIState {
  hoverHex?: XYTag;

  selectUnit?: UnitID;

  attackTags: XYTag[];
  moveTags: XYTag[];

  pendingBattle?: PendingBattle;
}

const initialState: UIState = { attackTags: [], moveTags: [] };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    hoverHex(state, { payload }: PayloadAction<XYTag | undefined>) {
      state.hoverHex = payload;
    },

    selectUnit(state, { payload }: PayloadAction<UnitID | undefined>) {
      state.selectUnit = payload;
    },
    deselectUnit(state) {
      state.selectUnit = undefined;
      state.attackTags = [];
      state.moveTags = [];
    },

    setAttackHexes(state, { payload }: PayloadAction<XYTag[]>) {
      state.attackTags = payload;
    },

    setMoveHexes(state, { payload }: PayloadAction<XYTag[]>) {
      state.moveTags = payload;
    },

    setPendingBattle(
      state,
      { payload }: PayloadAction<PendingBattle | undefined>,
    ) {
      state.pendingBattle = payload;
    },
  },
});

export const {
  deselectUnit,
  hoverHex,
  selectUnit,
  setAttackHexes,
  setMoveHexes,
  setPendingBattle,
} = uiSlice.actions;
export default uiSlice.reducer;
