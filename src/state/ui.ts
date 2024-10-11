import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Miles, Side, UnitID } from "../flavours";
import { XYTag } from "../types";

export interface PendingBattle {
  attacker: UnitID;
  defender: UnitID;
}

export interface MoveGameState {
  type: "move";
  side: Side;
  movedSoFar: Record<UnitID, Miles>;
}

export interface ChooseTacticsGameState {
  type: "tactics";
  attacker: UnitID;
  defender: UnitID;
  previous: GameState;
}

export interface PostBattleMoveGameState {
  type: "postMove";
  unit: UnitID;
  previous: GameState;
  distance: number;
  flee?: UnitID;
}

export type GameState =
  | MoveGameState
  | ChooseTacticsGameState
  | PostBattleMoveGameState;

interface UIState {
  game: GameState;
  hoverHex?: XYTag;

  selectedUnit?: UnitID;

  attackTags: Record<XYTag, UnitID>;
  moveTags: XYTag[];

  pendingBattle?: PendingBattle;
}

const initialState: UIState = {
  game: { type: "move", side: NaN, movedSoFar: {} },
  attackTags: {},
  moveTags: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGameState(state, { payload }: PayloadAction<GameState>) {
      state.game = payload;
    },

    setHoveredHex(state, { payload }: PayloadAction<XYTag | undefined>) {
      state.hoverHex = payload;
    },

    setSelectedUnit(state, { payload }: PayloadAction<UnitID | undefined>) {
      state.selectedUnit = payload;
    },

    setAttackHexes(state, { payload }: PayloadAction<UIState["attackTags"]>) {
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
  setAttackHexes,
  setGameState,
  setHoveredHex,
  setMoveHexes,
  setPendingBattle,
  setSelectedUnit,
} = uiSlice.actions;
export default uiSlice.reducer;
