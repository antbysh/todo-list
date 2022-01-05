import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/LocalStorage";
import tasksListReducer from "./reducers/tasksListSlice";

const preloadedState = loadState();
export const store = configureStore({
  reducer: {
    tasksList: tasksListReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    tasksList: store.getState().tasksList,
  });
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
