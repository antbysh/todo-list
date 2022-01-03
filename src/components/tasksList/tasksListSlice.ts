import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TasksState {
  tasks: TaskType[];
  status: "idle" | "loading" | "failed";
}

export interface TaskType {
  title: string;
  id: string;
  status: "complete" | "incomplete";
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
};

export const tasksListSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        ({ id }) => !id.includes(action.payload)
      );
    },
    changeTaskStatus: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) =>
        task.id.includes(action.payload)
          ? {
              ...task,
              status: task.status === "complete" ? "incomplete" : "complete",
            }
          : task
      );
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string }>) => {
      state.tasks = state.tasks.map((task) =>
        task.id.includes(action.payload.id)
          ? {
              ...task,
              title: action.payload.title,
            }
          : task
      );
    },
    updateTasksOrder: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  changeTaskStatus,
  editTask,
  updateTasksOrder,
} = tasksListSlice.actions;

export const selectAllTasks = (state: RootState) => state.tasksList.tasks;

export const selectCompletedTasks = (state: RootState) => {
  return state.tasksList.tasks.filter(({ status }) => status === "complete");
};

export const selectUncompletedTasks = (state: RootState) =>
  state.tasksList.tasks.filter(({ status }) => status === "incomplete");

export default tasksListSlice.reducer;
