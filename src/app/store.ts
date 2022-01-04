import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tasksListReducer from "../components/tasksList/tasksListSlice";
import { loadState, saveState } from "../utils/LocalStorage";

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
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
