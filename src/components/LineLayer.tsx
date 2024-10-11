import { useMemo } from "react";

import { useAppSelector } from "../state/hooks";
import { selectAllLines } from "../state/lines";
import Line from "./Line";

export default function LineLayer() {
  const lines = useAppSelector(selectAllLines);

  const lineElements = useMemo(
    () => lines.map((line, i) => <Line key={i} {...line} />),
    [lines],
  );

  return <g id="lines">{lineElements}</g>;
}
