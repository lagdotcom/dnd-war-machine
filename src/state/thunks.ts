import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";

import { d4, d100, getPendingBattleData, getTacticsEffects } from "../battle";
import { TroopClass } from "../calculations";
import { oddQDistance, oddQNeighbors, tagToXY, xyTag } from "../coord-tools";
import { Percentage, Side, UnitID } from "../flavours";
import {
  FatigueResult,
  getAttackResults,
  LocationResult,
  Tactics,
} from "../tactics";
import isDefined from "../tools/isDefined";
import { Fatigue, XY, XYTag } from "../types";
import { BorderData, setBorders } from "./borders";
import { LineData, setLines } from "./lines";
import { LocationData, setLocations } from "./locations";
import { RootState } from "./store";
import { TerrainData, setTerrain } from "./terrain";
import {
  GameState,
  PendingBattle,
  setAttackHexes,
  setGameState,
  setHoveredHex,
  setMoveHexes,
  setPendingBattle,
  setSelectedUnit,
} from "./ui";
import {
  postCombatUnitUpdate,
  PostCombatUpdate,
  removeUnit,
  setUnits,
  UnitData,
  updateUnit,
} from "./units";

type AppThunk = ThunkAction<void, RootState, undefined, UnknownAction>;

export const beginGame =
  (
    terrain: TerrainData[],
    borders: BorderData[],
    locations: LocationData[],
    lines: LineData[],
    units: UnitData[],
    side: Side,
  ): AppThunk =>
  (dispatch) => {
    dispatch(setTerrain(terrain));
    dispatch(setBorders(borders));
    dispatch(setLocations(locations));
    dispatch(setLines(lines));
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
      ui: { game },
      units: { entities: unitByID },
    } = getState();

    const units = Object.values(unitByID);
    const me = unitByID[id];
    const canAttack = game.type === "move";
    const fleeFrom =
      game.type === "postMove" && game.flee ? unitByID[game.flee] : undefined;
    const attackHexes: Record<XYTag, UnitID> = {};
    const moveHexes: XYTag[] = [];

    for (const xy of oddQNeighbors(me)
      .map(xyTag)
      .map((tag) => hexByTag[tag])
      .filter(isDefined)
      .filter((h) => h.terrain !== "sea")) {
      const tag = xyTag(xy);
      const u = units.find((u) => xyTag(u) === tag);
      if (u) {
        if (canAttack && u.side !== me.side) attackHexes[tag] = u.id;
      } else if (
        !fleeFrom ||
        oddQDistance(me, fleeFrom) < oddQDistance(xy, fleeFrom)
      )
        moveHexes.push(tag);
    }

    dispatch(setAttackHexes(attackHexes));
    dispatch(setMoveHexes(moveHexes));
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

function getBattleResults(
  unit: UnitData,
  casualties: Percentage,
  fatigue: FatigueResult,
  location: LocationResult,
  game: GameState,
  battleHex: XY,
  otherUnit: UnitData,
) {
  const update: PostCombatUpdate = { id: unit.id, casualties: 0 };
  let routed = false;

  if (casualties >= 100 || fatigue === "Rout" || location.type === "rout") {
    routed = true;
  } else {
    if (casualties)
      update.casualties = Math.ceil(
        (casualties / 100) * unit.force.numberOfTroops,
      );

    if (fatigue !== Fatigue.None)
      update.fatigue = { level: fatigue, duration: d4() };

    switch (location.type) {
      case "forward":
        update.position = battleHex;
        if (location.bonus)
          game = {
            type: "postMove",
            previous: game,
            unit: unit.id,
            distance: location.bonus,
          };
        break;

      case "retreat":
        game = {
          type: "postMove",
          previous: game,
          unit: unit.id,
          distance: location.bonus + 1,
          flee: otherUnit.id,
        };
    }
  }

  return { routed, update, game };
}

const rout =
  (id: UnitID): AppThunk =>
  (dispatch, getState) => {
    const unit = getState().units.entities[id];
    console.log(`${unit.force.name} is routed!`);

    dispatch(removeUnit(id));
  };

export const combat =
  (
    attackerID: UnitID,
    attackerTactics: Tactics,
    defenderID: UnitID,
    defenderTactics: Tactics,
  ): AppThunk =>
  (dispatch, getState) => {
    const {
      ui: { game },
      terrain: { entities: hexByTag },
      units: { entities: unitByID },
    } = getState();

    if (game.type !== "tactics") throw new Error("not in tactics state");
    dispatch(setPendingBattle());

    const attacker = unitByID[attackerID];
    const defender = unitByID[defenderID];

    const defenderTag = xyTag(defender);

    const attackerHex = hexByTag[xyTag(attacker)];
    const defenderHex = hexByTag[defenderTag];

    const data = getPendingBattleData(
      attacker,
      defender,
      attackerHex,
      defenderHex,
    );

    console.log(
      `${attacker.force.name} (${attacker.force.numberOfTroops}, ${TroopClass[data.attack.tc]}) vs. ${defender.force.name} (${defender.force.numberOfTroops}, ${TroopClass[data.defense.tc]})`,
    );

    const effects = getTacticsEffects(attackerTactics, defenderTactics);
    if (!effects) {
      // TODO
      throw new Error("no combat");
    }

    console.log(
      `Attacker: ${Tactics[attackerTactics]} (${effects.attack.casualties}c/${effects.attack.rating}r) vs. Defender: ${Tactics[defenderTactics]} (${effects.defense.casualties}c/${effects.defense.rating}r)`,
    );

    const aRoll = d100();
    const attackerRating = aRoll + data.attack.total + effects.attack.rating;
    const attackerCasualtiesMod = effects.attack.casualties;

    const dRoll = d100();
    const defenderRating = dRoll + data.defense.total + effects.defense.rating;
    const defenderCasualtiesMod = effects.defense.casualties;

    console.log(
      `${attackerRating} (r ${aRoll} + BR ${data.attack.br} + sit ${data.attack.sr} + tac ${effects.attack.rating}) vs. ${defenderRating} (r ${dRoll} + BR ${data.defense.br} + sit ${data.defense.sr} + tac ${effects.defense.rating})`,
    );
    if (attackerRating === defenderRating) {
      // TODO
      throw new Error("it's a draw!");
    }

    const [winner, loser, winnerCasualtyMod, loserCasualtyMod] =
      attackerRating > defenderRating
        ? [attacker, defender, attackerCasualtiesMod, defenderCasualtiesMod]
        : [defender, attacker, defenderCasualtiesMod, attackerCasualtiesMod];
    const ratingDifference = Math.abs(attackerRating - defenderRating);
    const [
      winnerCasualties,
      loserCasualties,
      winnerFatigue,
      loserFatigue,
      winnerLocation,
      loserLocation,
    ] = getAttackResults(ratingDifference);

    console.log(
      `${winner.force.name} loses ${winnerCasualties + winnerCasualtyMod}% troops, fatigue ${winnerFatigue}, location ${winnerLocation.type}+${winnerLocation.type === "rout" ? "0" : winnerLocation.bonus}`,
    );
    console.log(
      `${loser.force.name} loses ${loserCasualties + loserCasualtyMod}% troops, fatigue ${loserFatigue}, location ${loserLocation.type}+${loserLocation.type === "rout" ? "0" : loserLocation.bonus}`,
    );

    let nextGame = game.previous;

    {
      const results = getBattleResults(
        winner,
        winnerCasualties + winnerCasualtyMod,
        winnerFatigue,
        winnerLocation,
        nextGame,
        defenderHex,
        loser,
      );
      nextGame = results.game;

      if (results.routed) {
        dispatch(rout(winner.id));
      } else {
        dispatch(postCombatUnitUpdate(results.update));
      }
    }

    {
      const results = getBattleResults(
        loser,
        loserCasualties + loserCasualtyMod,
        loserFatigue,
        loserLocation,
        nextGame,
        defenderHex,
        winner,
      );
      nextGame = results.game;

      if (results.routed) {
        dispatch(rout(loser.id));
      } else {
        dispatch(postCombatUnitUpdate(results.update));
      }
    }

    // TODO this is dumb
    dispatch(setGameState(nextGame));
    if (nextGame.type === "postMove") dispatch(selectUnit(nextGame.unit));
    else dispatch(deselectUnit());
  };
