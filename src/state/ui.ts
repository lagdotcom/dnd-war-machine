import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Miles, Side, UnitID } from "../flavours";
import { Tactics } from "../tactics";
import { XYTag } from "../types";

export interface PendingBattle {
  attacker: UnitID;
  defender: UnitID;
}

export interface ChooseTactics extends PendingBattle {
  attackerTactics?: Tactics;
  defenderTactics?: Tactics;
}

export interface MoveGameState {
  type: "move";
  side: Side;
  movedSoFar: Record<UnitID, Miles>;
}

type GameState = MoveGameState;

interface UIState {
  game: GameState;
  hoverHex?: XYTag;

  selectedUnit?: UnitID;

  attackTags: Record<XYTag, UnitID>;
  moveTags: XYTag[];

  pendingBattle?: PendingBattle;
  choosingTactics?: ChooseTactics;
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

    setChoosingTactics(
      state,
      { payload }: PayloadAction<ChooseTactics | undefined>,
    ) {
      state.choosingTactics = payload;
    },
    updateChoosingTactics(
      state,
      { payload }: PayloadAction<Partial<ChooseTactics>>,
    ) {
      if (state.choosingTactics)
        state.choosingTactics = { ...state.choosingTactics, ...payload };
    },
  },
});

export const {
  setAttackHexes,
  setChoosingTactics,
  setGameState,
  setHoveredHex,
  setMoveHexes,
  setPendingBattle,
  setSelectedUnit,
  updateChoosingTactics,
} = uiSlice.actions;
export default uiSlice.reducer;
