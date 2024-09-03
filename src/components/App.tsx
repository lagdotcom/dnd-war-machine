import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { HexGrid, Layout } from "react-hexgrid";

import { xyTag } from "../coord-tools";
import {
  borders,
  hexData,
  locations,
  scenario3Units,
} from "../data/karameikos";
import { useClearableState } from "../hooks";
import { setBorders } from "../state/borders";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setLocations } from "../state/locations";
import {
  getHexById,
  HexData,
  selectAllTerrain,
  setTerrain,
} from "../state/terrain";
import { setUnits, Unit } from "../state/units";
import { XY } from "../types";
import BorderLayer from "./BorderLayer";
import HexLayer from "./HexLayer";
import LocationLayer from "./LocationLayer";
import UnitLayer from "./UnitLayer";
import UnitView from "./UnitView";

function getTerrainExtents(terrain: HexData[]) {
  if (!terrain.length) return `0 0 100 100`;

  let left = Infinity;
  let right = -Infinity;
  let top = Infinity;
  let bottom = -Infinity;

  for (const { x, y } of terrain) {
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
  }

  const width = 30 + (right - left) * 15;
  const height = 50 + (bottom - top) * 17;

  // "0 -15 870 610"
  // TODO left and top
  return `0 -15 ${width} ${height}`;
}

export default function App() {
  const { width, height } = useWindowSize();
  const [hoverXY, setHoverXY] = useState<XY>();
  const hoverHex = useAppSelector((state) =>
    hoverXY ? getHexById(state, xyTag(hoverXY)) : undefined,
  );

  const [hoverUnit, setHoverUnit, clearHoverUnit] = useClearableState<Unit>();
  const [clickUnit, setClickUnit, clearClickUnit] = useClearableState<Unit>();

  const dispatch = useAppDispatch();
  const hexes = useAppSelector(selectAllTerrain);
  const viewBox = useMemo(() => getTerrainExtents(hexes), [hexes]);

  useEffect(() => {
    dispatch(setTerrain(hexData));
    dispatch(setBorders(borders));
    dispatch(setLocations(locations));
    dispatch(setUnits(scenario3Units));
  }, []);

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
      <HexGrid
        width={width ?? undefined}
        height={height ?? undefined}
        viewBox={viewBox}
      >
        <Layout size={{ x: 10, y: 10 }}>
          <HexLayer onClick={clearClickUnit} onHover={setHoverXY} />
          <BorderLayer />
          <LocationLayer />
          <UnitLayer
            selected={clickUnit}
            onClick={setClickUnit}
            onHover={setHoverUnit}
            onHoverEnd={clearHoverUnit}
          />
        </Layout>
      </HexGrid>
    </>
  );
}
