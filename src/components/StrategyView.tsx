import panzoom from "panzoom";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (ref.current) {
      const instance = panzoom(ref.current, {
        smoothScroll: false,
        initialZoom: 2,
      });
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
        <HexLayer onClick={onClickHex} onHover={onHoverHex} />
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
