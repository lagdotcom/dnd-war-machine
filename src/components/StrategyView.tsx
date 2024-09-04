import classNames from "classnames";
import panZoom, { Transform } from "panzoom";
import { useCallback, useEffect, useRef, useState } from "react";

import useFlag from "../hooks/useFlag";
import { Unit } from "../state/units";
import { XY } from "../types";
import BorderLayer from "./BorderLayer";
import HexLayer from "./HexLayer";
import Layout from "./Layout";
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

const LAYOUT_ORIGIN = { x: 0, y: 15 };

export default function StrategyView({
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

  const [dragging, setDragging, clearDragging] = useFlag();
  const clearDraggingSoon = useCallback(() => {
    setTimeout(clearDragging, 0);
  }, [clearDragging]);

  const clickHex = useCallback(
    (xy: XY) => {
      if (dragging) return;
      onClickHex(xy);
    },
    [dragging, onClickHex],
  );

  const clickUnit = useCallback(
    (u: Unit) => {
      if (dragging) return;
      onClickUnit(u);
    },
    [dragging, onClickUnit],
  );

  useEffect(() => {
    if (ref.current) {
      const instance = panZoom(ref.current, {
        smoothScroll: false,
        initialZoom: 2,
        maxZoom: 10,
        minZoom: 0.5,
      });
      const updateTransform = () => setTransform(instance.getTransform());
      updateTransform();
      instance.on("zoom", updateTransform);
      instance.on("zoomend", updateTransform);

      instance.on("pan", setDragging);
      instance.on("panend", clearDraggingSoon);

      return () => instance.dispose();
    }
  }, [clearDraggingSoon, setDragging]);

  return (
    <svg
      ref={ref}
      className={classNames("grid", { dragging })}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Layout origin={LAYOUT_ORIGIN}>
        <HexLayer
          zoom={transform.scale}
          offset={transform}
          onClick={clickHex}
          onHover={onHoverHex}
        />
        <BorderLayer />
        <LocationLayer />
        <UnitLayer
          selected={selectedUnit}
          onClick={clickUnit}
          onHover={onHoverUnit}
          onHoverEnd={onHoverEndUnit}
        />
      </Layout>
    </svg>
  );
}
