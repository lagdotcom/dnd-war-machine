import classNames from "classnames";
import { useCallback, useEffect } from "react";

import { xyTag } from "../coord-tools";
import {
  borders,
  hexData,
  lines,
  locations,
  scenario3Units,
} from "../data/karameikos";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  selectGameState,
  selectHoveredHex,
  selectHoveredUnit,
  selectMoveHexTags,
  selectPendingBattle,
  selectSelectedUnit,
} from "../state/selectors";
import {
  beginGame,
  deselectUnit,
  hoverHex,
  moveUnit,
  selectUnit,
} from "../state/thunks";
import { setGameState } from "../state/ui";
import { UnitData } from "../state/units";
import { XYTag } from "../types";
import styles from "./App.module.scss";
import ChooseTacticsDialog from "./ChooseTacticsDialog";
import PendingBattleView from "./PendingBattleView";
import StrategyView from "./StrategyView";
import UnitView from "./UnitView";

export default function App() {
  const game = useAppSelector(selectGameState);
  const movableHexes = useAppSelector(selectMoveHexTags);
  const pendingBattle = useAppSelector(selectPendingBattle);
  const hoveredHex = useAppSelector(selectHoveredHex);
  const hovered = useAppSelector(selectHoveredUnit);
  const selected = useAppSelector(selectSelectedUnit);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(beginGame(hexData, borders, locations, lines, scenario3Units, 1));
  }, [dispatch]);

  const onClickHex = useCallback(
    (tag: XYTag) => {
      if (movableHexes.includes(tag) && selected) {
        dispatch(moveUnit(selected.id, tag));
        return;
      }

      if (pendingBattle) {
        dispatch(
          setGameState({ ...pendingBattle, type: "tactics", previous: game }),
        );
        return;
      }

      dispatch(deselectUnit());
    },
    [dispatch, game, movableHexes, pendingBattle, selected],
  );

  const onClickUnit = useCallback(
    (u: UnitData) => {
      if (pendingBattle?.defender === u.id) {
        dispatch(
          setGameState({ ...pendingBattle, type: "tactics", previous: game }),
        );
        return;
      }

      if (game.type === "move" && game.side === u.side)
        dispatch(selectUnit(u.id));
    },
    [dispatch, game, pendingBattle],
  );

  const onHoverHex = useCallback(
    (tag: XYTag) => {
      dispatch(hoverHex(tag));
    },
    [dispatch],
  );

  const onHoverUnit = useCallback(
    (u: UnitData) => onHoverHex(xyTag(u)),
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
      <ChooseTacticsDialog />
    </>
  );
}
