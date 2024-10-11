import classNames from "classnames";
import panZoom, { Transform } from "panzoom";
import { useCallback, useEffect, useRef, useState } from "react";

import useFlag from "../hooks/useFlag";
import { Unit } from "../state/units";
import { XYTag } from "../types";
import BorderLayer from "./BorderLayer";
import HexLayer from "./HexLayer";
import Layout from "./Layout";
import LineLayer from "./LineLayer";
import LocationLayer from "./LocationLayer";
import styles from "./StrategyView.module.scss";
import UnitLayer from "./UnitLayer";

export interface StrategyViewProps {
  onClickUnit(u: Unit): void;
  onHoverUnit(u: Unit): void;

  onClickHex(tag: XYTag): void;
  onHoverHex(tag: XYTag): void;
}

const LAYOUT_ORIGIN = { x: 0, y: 15 };

export default function StrategyView({
  onClickUnit,
  onHoverUnit,
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
    (tag: XYTag) => {
      if (dragging) return;
      onClickHex(tag);
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
      className={classNames(styles.grid, { [styles.dragging]: dragging })}
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
        <LineLayer />
        <BorderLayer />
        <LocationLayer />
        <UnitLayer onClick={clickUnit} onHover={onHoverUnit} />
      </Layout>
    </svg>
  );
}
