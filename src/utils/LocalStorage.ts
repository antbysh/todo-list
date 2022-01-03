import { TaskType } from "../components/tasksList/tasksListSlice";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch {
    return null;
  }
};

export const saveState = (state: { tasksList: { tasks: TaskType[] } }) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};
