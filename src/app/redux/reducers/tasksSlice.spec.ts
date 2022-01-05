import faker from "faker";

import tasksListReducer, {
  TasksState,
  addTask,
  editTask,
  deleteTask,
  changeTaskStatus,
  updateTasksOrder,
} from "./tasksListSlice";
import { mockTask } from "../../../mocks/task";

describe("tasks list reducer", () => {
  const initialState: TasksState = {
    tasks: [mockTask("complete"), mockTask("incomplete")],
    status: "idle",
  };

  it("should handle add task", () => {
    const actual = tasksListReducer(
      initialState,
      addTask(mockTask("incomplete"))
    );
    expect(actual.tasks.length).toEqual(3);
  });

  it("should handle delete task", () => {
    const targetId = initialState.tasks[0].id;
    const restTaskId = initialState.tasks[1].id;
    const actual = tasksListReducer(initialState, deleteTask(targetId));

    expect(actual.tasks.length).toEqual(1);
    expect(actual.tasks[0].id).toEqual(restTaskId);
  });

  it("should handle edit task", () => {
    const targetId = initialState.tasks[0].id;
    const newTitle = faker.random.words(3);
    const actual = tasksListReducer(
      initialState,
      editTask({ id: targetId, title: newTitle })
    );

    expect(actual.tasks[0].title).toEqual(newTitle);
  });

  it("should handle task status change", () => {
    const targetId = initialState.tasks[0].id;
    const actual = tasksListReducer(initialState, changeTaskStatus(targetId));

    expect(actual.tasks[0].status).toEqual("incomplete");
  });

  it("should handle change tasks order", () => {
    const reorganizedTaskArray = [...initialState.tasks].reverse();
    const targetId = initialState.tasks[1].id;
    const actual = tasksListReducer(
      initialState,
      updateTasksOrder(reorganizedTaskArray)
    );

    expect(actual.tasks[0].id).toEqual(targetId);
  });
});
