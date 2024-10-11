import { useAppSelector } from "../state/hooks";
import { selectAllUnits, UnitData } from "../state/units";
import Unit from "./Unit";

export interface UnitLayerProps {
  onClick?: (unit: UnitData) => void;
  onHover?: (unit: UnitData) => void;
}

export default function UnitLayer({ onClick, onHover }: UnitLayerProps) {
  const units = useAppSelector(selectAllUnits);

  return (
    <g id="units">
      {units.map((u) => (
        <Unit key={u.id} unit={u} onClick={onClick} onHover={onHover} />
      ))}
    </g>
  );
}
