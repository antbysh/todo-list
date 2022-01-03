import React from "react";

import { Container } from "./TasksList.styles";
import { Task, TaskTypes } from "../task/Task";
import { AddTask } from "../addTask/AddTask";

export interface TasksListTypes {
  data: TaskTypes[];
  currentTab: string;
}

export const TasksList = ({ data, currentTab }: TasksListTypes) => {
  return (
    <Container>
      {data.length
        ? data.map((task) => <Task {...task} key={task.id} />)
        : null}
      <AddTask currentTab={currentTab} />
    </Container>
  );
};
