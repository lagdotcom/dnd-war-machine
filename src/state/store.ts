import { configureStore, createSelector } from "@reduxjs/toolkit";

import borders from "./borders";
import locations from "./locations";
import terrain from "./terrain";
import ui from "./ui";
import units from "./units";

export const store = configureStore({
  reducer: { borders, locations, terrain, ui, units },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const createAppSelector = createSelector.withTypes<RootState>();
