import classNames from "classnames";
import { useMemo } from "react";
import { HexUtils, Text } from "react-hexgrid";

import { oddQToCube } from "../coord-tools";
import { HexLocation } from "../state/locations";
import { useLayoutContext } from "./Layout";

export default function LocationXY({ x, y, type, name, defence }: HexLocation) {
  const { q, r, s } = useMemo(() => oddQToCube({ x, y }), [x, y]);
  const { layout, pointsAsString } = useLayoutContext();
  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  return (
    <g
      className={classNames("location", type, defence)}
      transform={`translate(${pixel.x},${pixel.y})`}
    >
      <polygon points={pointsAsString} />
      <Text>{name}</Text>
    </g>
  );
}
