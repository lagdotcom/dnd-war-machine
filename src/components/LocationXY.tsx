import classNames from "classnames";
import { useMemo } from "react";
import { HexUtils, Text } from "react-hexgrid";
import { useLayoutContext } from "react-hexgrid/lib/Layout";

import { oddQToCube } from "../coord-tools";
import { HexLocation } from "../state/locations";

export default function LocationXY({ x, y, type, name, defence }: HexLocation) {
  const { q, r, s } = useMemo(() => oddQToCube({ x, y }), [x, y]);
  const { layout, points } = useLayoutContext();
  const pixel = useMemo(
    () => HexUtils.hexToPixel({ q, r, s }, layout),
    [q, r, s, layout],
  );

  return (
    <g
      className={classNames("location", type, defence)}
      transform={`translate(${pixel.x},${pixel.y})`}
    >
      <polygon points={points} />
      <Text>{name}</Text>
    </g>
  );
}
