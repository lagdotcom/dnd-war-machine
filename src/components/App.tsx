import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { Hexagon, HexGrid, HexUtils, Layout, Text } from "react-hexgrid";
import { HexagonProps } from "react-hexgrid/lib/Hexagon/Hexagon";
import { useLayoutContext } from "react-hexgrid/lib/Layout";

import { oddq_to_cube } from "../coord-tools";
import {
  BlackEagleGuard,
  borders,
  Bugbears,
  DucalGuard,
  EasternElves,
  EasternGoblins,
  Gnomes,
  hexData,
  locations,
  Lycanthropes,
  MenOfKelven,
  NorthEasternGoblins,
  Orcs,
  positions,
  territories,
  ThyatianMercenaries,
  WesternElves,
} from "../data/karameikos";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { addUnits, selectUnits, Unit } from "../state/units";
import { HexBorder, HexLocation, XY } from "../types";

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
      className={`location ${type}`}
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

function UnitXY({ x, y, force, side, liegeTag }: Unit) {
  const { q, r, s } = useMemo(() => oddq_to_cube({ x, y }), [x, y]);
  const { layout } = useLayoutContext();
  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  const inTerritoryOfLiege =
    !!liegeTag && territories[liegeTag]?.includes(`${x},${y}`);

  return (
    <g
      className={`unit side-${side} ${inTerritoryOfLiege ? "in-liege" : ""}`}
      transform={`translate(${pixel.x},${pixel.y})`}
    >
      <circle x={0} y={0} r={getUnitRadius(force.numberOfTroops)} />
      <Text y="1.25em">{force.name} </Text>
      {inTerritoryOfLiege && <Text>👑</Text>}
    </g>
  );
}

export default function App() {
  const { width, height } = useWindowSize();
  const [hovered, setHovered] = useState<XY>();

  const dispatch = useAppDispatch();
  const units = useAppSelector(selectUnits);

  useEffect(() => {
    dispatch(
      addUnits([
        {
          id: BlackEagleGuard.name,
          side: 2,
          liegeTag: "Black Eagle",
          type: "normal",
          force: BlackEagleGuard,
          ...positions["Black Eagle Guard"],
        },
        {
          id: EasternGoblins.name,
          side: 2,
          type: "quick",
          force: EasternGoblins,
          ...positions["Goblins E"],
        },
        {
          id: Bugbears.name,
          side: 2,
          type: "quick",
          force: Bugbears,
          ...positions["Bugbears"],
        },
        {
          id: NorthEasternGoblins.name,
          side: 2,
          type: "quick",
          force: NorthEasternGoblins,
          ...positions["Goblins NE"],
        },
        {
          id: Orcs.name,
          side: 2,
          type: "quick",
          force: Orcs,
          ...positions["Orcs"],
        },
        {
          id: Lycanthropes.name,
          side: 2,
          type: "quick",
          force: Lycanthropes,
          ...positions["Were-creatures"],
        },
        {
          id: DucalGuard.name,
          side: 1,
          liegeTag: "Karameikos",
          type: "normal",
          force: DucalGuard,
          ...positions["Ducal Guard"],
        },
        {
          id: MenOfKelven.name,
          side: 1,
          liegeTag: "Karameikos",
          type: "normal",
          force: MenOfKelven,
          ...positions["Men of Kelven"],
        },
        {
          id: WesternElves.name,
          side: 1,
          type: "normal",
          force: WesternElves,
          ...positions["Western Elves"],
        },
        {
          id: Gnomes.name,
          side: 1,
          type: "quick",
          force: Gnomes,
          ...positions["Gnomes"],
        },
        {
          id: EasternElves.name,
          side: 1,
          type: "normal",
          force: EasternElves,
          ...positions["Eastern Elves"],
        },
        {
          id: ThyatianMercenaries.name,
          side: 1,
          type: "normal",
          force: ThyatianMercenaries,
          ...positions["Thyatian Mercenaries"],
        },
      ]),
    );
  }, []);

  const hexes = useMemo(
    () =>
      hexData.map(({ x, y, terrain }, i) => (
        <HexagonXY
          key={i}
          x={x}
          y={y}
          className={terrain}
          onMouseOver={() => setHovered({ x, y })}
        />
      )),
    [hexData],
  );

  const hexLocations = useMemo(
    () => locations.map((loc, i) => <LocationXY key={i} {...loc} />),
    [locations],
  );

  const hexBorders = useMemo(
    () => borders.map((border, i) => <BorderXY key={i} {...border} />),
    [borders],
  );

  return (
    <>
      {hovered && (
        <div style={{ position: "absolute", fontSize: "3em" }}>
          {hovered.x}, {hovered.y}
        </div>
      )}
      <HexGrid
        width={width ?? undefined}
        height={height ?? undefined}
        viewBox="0 -15 870 610"
      >
        <Layout size={{ x: 10, y: 10 }}>
          <g id="hexes">{hexes}</g>
          <g id="borders">{hexBorders}</g>
          <g id="locations">{hexLocations}</g>
          <g id="units">
            {units.ids.map((id) => (
              <UnitXY key={id} {...units.entities[id]} />
            ))}
          </g>
        </Layout>
      </HexGrid>
    </>
  );
}
