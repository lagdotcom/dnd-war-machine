import { useCallback, useEffect, useState } from "react";

import { xyTag } from "../coord-tools";
import {
  borders,
  hexData,
  locations,
  scenario3Units,
} from "../data/karameikos";
import useClearableState from "../hooks/useClearableState";
import { setBorders } from "../state/borders";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setLocations } from "../state/locations";
import { getHexById, setTerrain } from "../state/terrain";
import { setUnits, Unit } from "../state/units";
import { XY } from "../types";
import StrategyView from "./StrategyView";
import UnitView from "./UnitView";

export default function App() {
  const [hoverXY, setHoverXY] = useState<XY>();
  const hoverHex = useAppSelector((state) =>
    hoverXY ? getHexById(state, xyTag(hoverXY)) : undefined,
  );

  const [hoverUnit, setHoverUnit, clearHoverUnit] = useClearableState<Unit>();
  const [clickUnit, setClickUnit, clearClickUnit] = useClearableState<Unit>();

  const onHoverUnit = useCallback(
    (u: Unit) => {
      setHoverUnit(u);
      setHoverXY(u);
    },
    [setHoverUnit, setHoverXY],
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTerrain(hexData));
    dispatch(setBorders(borders));
    dispatch(setLocations(locations));
    dispatch(setUnits(scenario3Units));
  }, [dispatch]);

  return (
    <>
      {hoverHex && (
        <div
          className="panel"
          style={{
            position: "absolute",
            fontSize: "3em",
            left: 4,
            bottom: 4,
            pointerEvents: "none",
          }}
        >
          {xyTag(hoverHex)} {hoverHex.terrain} {hoverHex.tags.join(", ")}
        </div>
      )}
      <div className="unit-views">
        {clickUnit && <UnitView unit={clickUnit} />}
        {hoverUnit && hoverUnit !== clickUnit && <UnitView unit={hoverUnit} />}
      </div>
      <StrategyView
        onClickHex={clearClickUnit}
        onHoverHex={setHoverXY}
        selectedUnit={clickUnit}
        onClickUnit={setClickUnit}
        onHoverUnit={onHoverUnit}
        onHoverEndUnit={clearHoverUnit}
      />
    </>
  );
}
