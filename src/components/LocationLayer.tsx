import { useMemo } from "react";

import { useAppSelector } from "../state/hooks";
import { selectAllLocations } from "../state/locations";
import Location from "./Location";

export default function LocationLayer() {
  const locations = useAppSelector(selectAllLocations);

  const locationElements = useMemo(
    () => locations.map((loc, i) => <Location key={i} {...loc} />),
    [locations],
  );

  return <g id="locations">{locationElements}</g>;
}
