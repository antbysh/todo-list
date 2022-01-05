import React, { useCallback } from "react";
import update from "immutability-helper";

import { Container } from "./TasksList.styles";
import { Task } from "../task/Task";
import { AddTask } from "../addTask/AddTask";
import { useAppDispatch } from "../../app/hooks";
import { updateTasksOrder } from "../../app/redux/reducers/tasksListSlice";
import { TaskTypes } from "../task/task.types";

export interface TasksListProps {
  data: TaskTypes[];
  currentTab: string;
}

export const TasksList = ({ data, currentTab }: TasksListProps) => {
  const dispatch = useAppDispatch();

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragTask = data[dragIndex];
      dispatch(
        updateTasksOrder(
          update(data, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragTask],
            ],
          })
        )
      );
    },
    [data, dispatch]
  );

  return (
    <Container>
      {data.length
        ? data.map((task, index) => (
            <Task {...task} dragMode={{ moveCard, index }} key={task.id} />
          ))
        : null}
      <AddTask currentTab={currentTab} />
    </Container>
  );
};
