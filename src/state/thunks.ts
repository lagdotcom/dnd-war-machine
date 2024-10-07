import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { HexUtils } from "react-hexgrid";

import { cubeToOddQ, oddQToCube, tagToXY, xyTag } from "../coord-tools";
import { Side, UnitID } from "../flavours";
import { XYTag } from "../types";
import { HexBorder, setBorders } from "./borders";
import { HexLocation, setLocations } from "./locations";
import { RootState } from "./store";
import { HexData, setTerrain } from "./terrain";
import {
  PendingBattle,
  setAttackHexes,
  setGameState,
  setHoveredHex,
  setMoveHexes,
  setPendingBattle,
  setSelectedUnit,
} from "./ui";
import { setUnits, Unit, updateUnit } from "./units";

type AppThunk = ThunkAction<void, RootState, undefined, UnknownAction>;

export const beginGame =
  (
    terrain: HexData[],
    borders: HexBorder[],
    locations: HexLocation[],
    units: Unit[],
    side: Side,
  ): AppThunk =>
  (dispatch) => {
    dispatch(setTerrain(terrain));
    dispatch(setBorders(borders));
    dispatch(setLocations(locations));
    dispatch(setUnits(units));
    dispatch(setGameState({ type: "move", side, movedSoFar: {} }));
  };

export const hoverHex =
  (tag: XYTag): AppThunk =>
  (dispatch, getState) => {
    const {
      ui: { hoverHex, attackTags, selectedUnit: attacker, pendingBattle },
    } = getState();
    if (hoverHex !== tag) dispatch(setHoveredHex(tag));

    if (attacker) {
      let newPendingBattle: PendingBattle | undefined;
      if (attackTags[tag])
        newPendingBattle = { attacker: attacker, defender: attackTags[tag] };

      if (
        pendingBattle?.attacker !== newPendingBattle?.attacker ||
        pendingBattle?.defender !== newPendingBattle?.defender
      )
        dispatch(setPendingBattle(newPendingBattle));
    }
  };

const updateHexHighlights =
  (id: UnitID): AppThunk =>
  (dispatch, getState) => {
    const {
      terrain: { entities: hexByTag },
      units: { entities: unitByID },
    } = getState();

    const units = Object.values(unitByID);
    const me = unitByID[id];
    const canAttack: Record<XYTag, UnitID> = {};
    const canMove: XYTag[] = [];

    for (const xy of HexUtils.neighbors(oddQToCube(me))
      .map(cubeToOddQ)
      .map(xyTag)
      .map((tag) => hexByTag[tag])
      .filter((h) => h.terrain !== "sea")
      .map(xyTag)) {
      const u = units.find((u) => xyTag(u) === xy);
      if (u) {
        if (u.side !== me.side) canAttack[xy] = u.id;
      } else canMove.push(xy);
    }

    dispatch(setAttackHexes(canAttack));
    dispatch(setMoveHexes(canMove));
  };

export const selectUnit =
  (id: UnitID): AppThunk =>
  (dispatch) => {
    dispatch(setSelectedUnit(id));
    dispatch(updateHexHighlights(id));
  };

export const deselectUnit = (): AppThunk => (dispatch) => {
  dispatch(setSelectedUnit());
  dispatch(setAttackHexes({}));
  dispatch(setMoveHexes([]));
};

export const moveUnit =
  (id: UnitID, tag: XYTag): AppThunk =>
  (dispatch) => {
    dispatch(updateUnit({ id, changes: tagToXY(tag) }));
    dispatch(updateHexHighlights(id));
  };
