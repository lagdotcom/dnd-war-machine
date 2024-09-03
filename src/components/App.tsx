import { useWindowSize } from "@uidotdev/usehooks";
import classNames from "classnames";
import { StrictMode, useCallback, useEffect, useMemo, useState } from "react";
import { Hexagon, HexGrid, HexUtils, Layout, Text } from "react-hexgrid";
import { useLayoutContext } from "react-hexgrid/lib/Layout";

import { oddq_to_cube, xyTag } from "../coord-tools";
import {
  borders,
  hexData,
  locations,
  scenario3Units,
} from "../data/karameikos";
import { useClearableState } from "../hooks";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  getHexById,
  HexData,
  selectAllTerrain,
  setTerrain,
} from "../state/terrain";
import { selectAllUnits, setUnits, Unit } from "../state/units";
import { HexBorder, HexLocation, XY } from "../types";
import UnitView from "./UnitView";

type HexagonProps = Parameters<typeof Hexagon>[0];
type HexagonXYProps = Omit<HexagonProps, "q" | "r" | "s"> & XY;

function HexagonXY({ x, y, children, ...props }: HexagonXYProps) {
  const { q, r, s } = useMemo(() => oddq_to_cube({ x, y }), [x, y]);
  return (
    <Hexagon q={q} r={r} s={s} {...props}>
      {children}
    </Hexagon>
  );
}

function LocationXY({ x, y, type, name }: HexLocation) {
  const { q, r, s } = useMemo(() => oddq_to_cube({ x, y }), [x, y]);
  const { layout } = useLayoutContext();
  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  return (
    <g
      className={classNames("location", type)}
      transform={`translate(${pixel.x},${pixel.y})`}
    >
      <Text>{name}</Text>
    </g>
  );
}

function BorderXY({ x, y, thickness, start, end }: HexBorder) {
  const { q, r, s } = useMemo(() => oddq_to_cube({ x, y }), [x, y]);
  const { layout, points } = useLayoutContext();

  const linePoints = useMemo(() => {
    const positionPoints = points
      .split(" ")
      .map((p) => p.split(","))
      .map(([px, py]) => ({ x: Number(px), y: Number(py) }));

    const linePoints: string[] = [];

    for (let s = start; s <= end; s++) {
      const pp = positionPoints[s % 6];
      linePoints.push(`${pp.x},${pp.y}`);
    }

    return linePoints.join(" ");
  }, [points, start, end]);

  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  return (
    <g className="border" transform={`translate(${pixel.x},${pixel.y})`}>
      <polyline
        points={linePoints}
        fill="transparent"
        strokeWidth={thickness}
      />
    </g>
  );
}

function getUnitRadius(troops: number) {
  return Math.min(10, Math.max(troops / 50, 4));
}

function UnitXY({
  selected,
  unit,
  onClick,
  onHover,
  onHoverEnd,
}: {
  selected?: boolean;
  unit: Unit;
  onClick?: (unit: Unit) => void;
  onHover?: (unit: Unit) => void;
  onHoverEnd?: (unit: Unit) => void;
}) {
  const { liegeTag, side, force } = unit;
  const click = useCallback(() => onClick?.(unit), [onClick, unit]);
  const mouseEnter = useCallback(() => onHover?.(unit), [onHover, unit]);
  const mouseLeave = useCallback(() => onHoverEnd?.(unit), [onHoverEnd, unit]);

  const { q, r, s } = useMemo(() => oddq_to_cube(unit), [unit]);
  const { layout } = useLayoutContext();
  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  const tag = xyTag(unit);
  const inHex = useAppSelector((state) => getHexById(state, tag));
  const inTerritoryOfLiege = liegeTag && inHex.tags.includes(liegeTag);

  return (
    <g
      className={classNames("unit", `side-${side}`, {
        "in-liege": inTerritoryOfLiege,
        selected,
      })}
      transform={`translate(${pixel.x},${pixel.y})`}
      onClick={click}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <circle x={0} y={0} r={getUnitRadius(force.numberOfTroops)} />
      <Text y="1.25em">{force.name} </Text>
      {inTerritoryOfLiege && <Text>👑</Text>}
    </g>
  );
}

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
  const units = useAppSelector(selectAllUnits);
  const hexes = useAppSelector(selectAllTerrain);
  const viewBox = useMemo(() => getTerrainExtents(hexes), [hexes]);

  useEffect(() => {
    dispatch(setTerrain(hexData));
    dispatch(setUnits(scenario3Units));
  }, []);

  const hexElements = useMemo(
    () =>
      hexes.map(({ x, y, terrain }, i) => (
        <HexagonXY
          key={i}
          x={x}
          y={y}
          className={terrain}
          onClick={clearClickUnit}
          onMouseOver={() => setHoverXY({ x, y })}
        />
      )),
    [hexes, clearClickUnit, setHoverXY],
  );

  const locationElements = useMemo(
    () => locations.map((loc, i) => <LocationXY key={i} {...loc} />),
    [locations],
  );

  const borderElements = useMemo(
    () => borders.map((border, i) => <BorderXY key={i} {...border} />),
    [borders],
  );

  const unitElements = useMemo(
    () =>
      units.map((u) => (
        <UnitXY
          key={u.id}
          unit={u}
          selected={clickUnit === u}
          onHover={setHoverUnit}
          onHoverEnd={clearHoverUnit}
          onClick={setClickUnit}
        />
      )),
    [units, clickUnit],
  );

  return (
    <StrictMode>
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
          <g id="hexes">{hexElements}</g>
          <g id="borders">{borderElements}</g>
          <g id="locations">{locationElements}</g>
          <g id="units">{unitElements}</g>
        </Layout>
      </HexGrid>
    </StrictMode>
  );
}
