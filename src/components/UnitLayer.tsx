import { useMemo } from "react";

import { useAppSelector } from "../state/hooks";
import { selectAllUnits, Unit } from "../state/units";
import UnitXY from "./UnitXY";

export interface UnitLayerProps {
  selected?: Unit;
  onClick?: (unit: Unit) => void;
  onHover?: (unit: Unit) => void;
  onHoverEnd?: (unit: Unit) => void;
}

export default function UnitLayer({
  selected,
  onClick,
  onHover,
  onHoverEnd,
}: UnitLayerProps) {
  const units = useAppSelector(selectAllUnits);

  const unitElements = useMemo(
    () =>
      units.map((u) => (
        <UnitXY
          key={u.id}
          unit={u}
          selected={selected === u}
          onClick={onClick}
          onHover={onHover}
          onHoverEnd={onHoverEnd}
        />
      )),
    [selected, units, onClick, onHover, onHoverEnd],
  );

  return <g id="units">{unitElements}</g>;
}
