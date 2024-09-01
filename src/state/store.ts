import { configureStore } from "@reduxjs/toolkit";

import units from "./units";

export const store = configureStore({
  reducer: { units },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
