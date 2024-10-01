import { xyTag } from "../coord-tools";
import { createAppSelector, RootState } from "./store";
import { selectTerrainEntities } from "./terrain";
import { selectAllUnits, selectUnitEntities } from "./units";

export const selectAttackHexTags = (state: RootState) => state.ui.attackTags;
export const selectHoveredHexTag = (state: RootState) => state.ui.hoverHex;
export const selectMoveHexTags = (state: RootState) => state.ui.moveTags;
export const selectSelectedUnitId = (state: RootState) => state.ui.selectUnit;

export const selectHoveredHex = createAppSelector(
  [selectTerrainEntities, selectHoveredHexTag],
  (terrain, tag) => {
    if (tag) return terrain[tag];
  },
);

export const selectHoveredUnit = createAppSelector(
  [selectAllUnits, selectHoveredHexTag],
  (units, tag) => {
    return units.find((u) => xyTag(u) === tag);
  },
);

export const selectSelectedUnit = createAppSelector(
  [selectUnitEntities, selectSelectedUnitId],
  (units, id) => {
    if (id) return units[id];
  },
);
