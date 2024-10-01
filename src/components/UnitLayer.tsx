import { useAppSelector } from "../state/hooks";
import { selectAllUnits, Unit } from "../state/units";
import UnitXY from "./UnitXY";

export interface UnitLayerProps {
  onClick?: (unit: Unit) => void;
  onHover?: (unit: Unit) => void;
}

export default function UnitLayer({ onClick, onHover }: UnitLayerProps) {
  const units = useAppSelector(selectAllUnits);

  return (
    <g id="units">
      {units.map((u) => (
        <UnitXY key={u.id} unit={u} onClick={onClick} onHover={onHover} />
      ))}
    </g>
  );
}
