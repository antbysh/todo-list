import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TaskTypes } from "../../../components/task/task.types";

export interface TasksState {
  tasks: TaskTypes[];
  status: "idle" | "loading" | "failed";
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
};

export const tasksListSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskTypes>) => {
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
    updateTasksOrder: (state, action: PayloadAction<TaskTypes[]>) => {
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
