import { useMemo } from "react";

import { useAppSelector } from "../state/hooks";
import { selectAllLines } from "../state/lines";
import LineXY from "./LineXY";

export default function LineLayer() {
  const lines = useAppSelector(selectAllLines);

  const lineElements = useMemo(
    () => lines.map((line, i) => <LineXY key={i} {...line} />),
    [lines],
  );

  return <g id="lines">{lineElements}</g>;
}
