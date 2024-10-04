import classNames from "classnames";
import { useCallback, useEffect } from "react";
import { HexUtils } from "react-hexgrid";

import { cubeToOddQ, oddQToCube, tagToXY, xyTag } from "../coord-tools";
import {
  borders,
  hexData,
  locations,
  scenario3Units,
} from "../data/karameikos";
import { UnitID } from "../flavours";
import { setBorders } from "../state/borders";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setLocations } from "../state/locations";
import {
  selectAttackHexTags,
  selectChoosingTactics,
  selectHoveredHex,
  selectHoveredUnit,
  selectMoveHexTags,
  selectPendingBattle,
  selectSelectedUnit,
} from "../state/selectors";
import { selectTerrainEntities, setTerrain } from "../state/terrain";
import {
  deselectUnit,
  hoverHex,
  PendingBattle,
  selectUnit,
  setAttackHexes,
  setChoosingTactics,
  setMoveHexes,
  setPendingBattle,
} from "../state/ui";
import {
  selectAllUnits,
  selectUnitEntities,
  setUnits,
  Unit,
  updateUnit,
} from "../state/units";
import { XY, XYTag } from "../types";
import styles from "./App.module.scss";
import ChooseTacticsDialog from "./ChooseTacticsDialog";
import PendingBattleView from "./PendingBattleView";
import StrategyView from "./StrategyView";
import UnitView from "./UnitView";

export default function App() {
  const units = useAppSelector(selectAllUnits);
  const unitsById = useAppSelector(selectUnitEntities);
  const hexes = useAppSelector(selectTerrainEntities);
  const attackHexes = useAppSelector(selectAttackHexTags);
  const movableHexes = useAppSelector(selectMoveHexTags);

  const choosing = useAppSelector(selectChoosingTactics);
  const pendingBattle = useAppSelector(selectPendingBattle);
  const hoveredHex = useAppSelector(selectHoveredHex);
  const hovered = useAppSelector(selectHoveredUnit);
  const selected = useAppSelector(selectSelectedUnit);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTerrain(hexData));
    dispatch(setBorders(borders));
    dispatch(setLocations(locations));
    dispatch(setUnits(scenario3Units));
  }, [dispatch]);

  const updateHexHighlights = useCallback(
    (id: UnitID, xy: XY) => {
      const tags = HexUtils.neighbors(oddQToCube(xy))
        .map(cubeToOddQ)
        .map(xyTag)
        .map((tag) => hexes[tag])
        .filter((h) => h.terrain !== "sea")
        .map(xyTag);

      const me = unitsById[id];
      const enemies = units.filter((u) => u.id !== id).map(xyTag);
      const blocked = units
        .filter((u) => u.side === me.side && u.id !== id)
        .map(xyTag);

      dispatch(
        setAttackHexes(
          tags.filter((tag) => enemies.includes(tag) && !blocked.includes(tag)),
        ),
      );
      dispatch(
        setMoveHexes(
          tags.filter(
            (tag) => !enemies.includes(tag) && !blocked.includes(tag),
          ),
        ),
      );
    },
    [dispatch, hexes, units, unitsById],
  );

  const onClickHex = useCallback(
    (tag: XYTag) => {
      if (movableHexes.includes(tag) && selected) {
        const xy = tagToXY(tag);
        dispatch(updateUnit({ id: selected.id, changes: xy }));
        updateHexHighlights(selected.id, xy);
        return;
      }

      if (pendingBattle) {
        dispatch(setChoosingTactics(pendingBattle));
        return;
      }

      dispatch(deselectUnit());
    },
    [dispatch, movableHexes, pendingBattle, selected, updateHexHighlights],
  );

  const onClickUnit = useCallback(
    (u: Unit) => {
      if (pendingBattle?.defender === u.id) {
        dispatch(setChoosingTactics(pendingBattle));
        return;
      }

      dispatch(selectUnit(u.id));
      updateHexHighlights(u.id, u);
    },
    [dispatch, pendingBattle, updateHexHighlights],
  );

  const onHoverHex = useCallback(
    (tag: XYTag) => {
      dispatch(hoverHex(tag));

      let pending: PendingBattle | undefined;
      if (attackHexes.includes(tag) && selected) {
        const defender = units.find((u) => xyTag(u) === tag);
        if (defender)
          pending = { attacker: selected.id, defender: defender.id };
      }
      dispatch(setPendingBattle(pending));
    },
    [attackHexes, dispatch, selected, units],
  );

  const onHoverUnit = useCallback(
    (u: Unit) => onHoverHex(xyTag(u)),
    [onHoverHex],
  );

  return (
    <>
      <main className={styles.main}>
        {hoveredHex && (
          <div className={classNames("panel", styles.hoverHex)}>
            {xyTag(hoveredHex)} {hoveredHex.terrain}{" "}
            {hoveredHex.tags.join(", ")}
          </div>
        )}
        <div className={styles.unitViews}>
          {pendingBattle && <PendingBattleView battle={pendingBattle} />}
          {selected && <UnitView unit={selected} />}
          {hovered && hovered !== selected && <UnitView unit={hovered} />}
        </div>
        <StrategyView
          onClickHex={onClickHex}
          onHoverHex={onHoverHex}
          onClickUnit={onClickUnit}
          onHoverUnit={onHoverUnit}
        />
      </main>
      {choosing && <ChooseTacticsDialog choose={choosing} />}
    </>
  );
}
