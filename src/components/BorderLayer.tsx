import { useMemo } from "react";

import { selectAllBorders } from "../state/borders";
import { useAppSelector } from "../state/hooks";
import Border from "./Border";

export default function BorderLayer() {
  const borders = useAppSelector(selectAllBorders);

  const borderElements = useMemo(
    () => borders.map((border, i) => <Border key={i} {...border} />),
    [borders],
  );

  return <g id="borders">{borderElements}</g>;
}
