import { configureStore } from "@reduxjs/toolkit";

import terrain from "./terrain";
import units from "./units";

export const store = configureStore({
  reducer: { terrain, units },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
