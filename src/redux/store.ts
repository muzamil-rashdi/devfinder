import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "./slices/favoritesSlice";
import { uiSlice } from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;