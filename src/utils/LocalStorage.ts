import { TaskTypes } from "../components/task/task.types";

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

export const saveState = (state: { tasksList: { tasks: TaskTypes[] } }) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};
