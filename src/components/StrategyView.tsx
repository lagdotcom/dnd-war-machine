import panzoom, { Transform } from "panzoom";
import { useEffect, useRef, useState } from "react";
import { Layout } from "react-hexgrid";

import { Unit } from "../state/units";
import { XY } from "../types";
import BorderLayer from "./BorderLayer";
import HexLayer from "./HexLayer";
import LocationLayer from "./LocationLayer";
import UnitLayer from "./UnitLayer";

export interface StrategyViewProps {
  selectedUnit?: Unit;
  onClickUnit(u: Unit): void;
  onHoverUnit(u: Unit): void;
  onHoverEndUnit(u: Unit): void;

  onClickHex(xy: XY): void;
  onHoverHex(xy: XY): void;
}

export function StrategyView({
  selectedUnit,
  onClickUnit,
  onHoverUnit,
  onHoverEndUnit,
  onClickHex,
  onHoverHex,
}: StrategyViewProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState<Transform>({
    scale: 2,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const instance = panzoom(ref.current, {
        smoothScroll: false,
        initialZoom: 2,
        maxZoom: 10,
        minZoom: 0.5,
      });

      setTransform(instance.getTransform());
      instance.on("zoom", () => setTransform(instance.getTransform()));
      instance.on("zoomend", () => setTransform(instance.getTransform()));

      return () => instance.dispose();
    }
  }, []);

  return (
    <svg
      ref={ref}
      className="grid"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Layout size={{ x: 10, y: 10 }} origin={{ x: 0, y: 15 }}>
        <HexLayer
          zoom={transform.scale}
          offset={transform}
          onClick={onClickHex}
          onHover={onHoverHex}
        />
        <BorderLayer />
        <LocationLayer />
        <UnitLayer
          selected={selectedUnit}
          onClick={onClickUnit}
          onHover={onHoverUnit}
          onHoverEnd={onHoverEndUnit}
        />
      </Layout>
    </svg>
  );
}
