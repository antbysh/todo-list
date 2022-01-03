import React, { useState } from "react";

import { TaskContainer, TaskTitle, ActionWrapper } from "./Task.styles";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as CompleteIcon } from "../../assets/icons/complete.svg";
import { ReactComponent as IncompleteIcon } from "../../assets/icons/incomplete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { useAppDispatch } from "../../app/hooks";
import { changeTaskStatus, deleteTask } from "../tasksList/tasksListSlice";
import { AddTask } from "../addTask/AddTask";
import { Button } from "../button/Button";

export interface TaskTypes {
  title: string;
  id: string;
  status: string;
}

export const Task = ({ title, id, status }: TaskTypes) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  const handleDeleteTask = (targetId: string) => {
    dispatch(deleteTask(targetId));
  };

  const handleChangeStatus = (targetId: string) => {
    dispatch(changeTaskStatus(targetId));
  };

  return editMode ? (
    <AddTask editMode={{ id, title, setEditMode }} />
  ) : (
    <TaskContainer>
      <TaskTitle onClick={() => setEditMode(true)}>{title}</TaskTitle>
      <ActionWrapper>
        <Button callback={() => setEditMode(true)}>
          <EditIcon />
        </Button>
        <Button callback={() => handleDeleteTask(id)}>
          <TrashIcon />
        </Button>
        <Button callback={() => handleChangeStatus(id)}>
          {status === "complete" ? <CompleteIcon /> : <IncompleteIcon />}
        </Button>
      </ActionWrapper>
    </TaskContainer>
  );
};
