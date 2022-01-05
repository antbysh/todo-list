import React, { useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

import { TaskContainer, TaskTitle, ActionWrapper } from "./Task.styles";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as CompleteIcon } from "../../assets/icons/complete.svg";
import { ReactComponent as IncompleteIcon } from "../../assets/icons/incomplete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { useAppDispatch } from "../../app/hooks";
import { AddTask } from "../addTask/AddTask";
import { Button } from "../button/Button";
import {
  changeTaskStatus,
  deleteTask,
} from "../../app/redux/reducers/tasksListSlice";
import { TaskTypes } from "./task.types";

interface TaskProps extends TaskTypes {
  dragMode?: {
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    index: number;
  };
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Task = ({ title, id, status, dragMode }: TaskProps) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const isCompleted = status === "complete";

  const handleDeleteTask = (targetId: string) => {
    dispatch(deleteTask(targetId));
  };

  const handleChangeStatus = (targetId: string) => {
    dispatch(changeTaskStatus(targetId));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "Task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current || !dragMode) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = dragMode.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dragMode.moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Task",
    item: () => {
      return { id, index: dragMode?.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return editMode ? (
    <AddTask editMode={{ id, title, setEditMode }} />
  ) : (
    <TaskContainer
      ref={ref}
      data-handler-id={handlerId}
      isDragging={isDragging}
      data-task-completed={isCompleted}
    >
      <TaskTitle onClick={() => setEditMode(true)} isCompleted={isCompleted}>
        {title}
      </TaskTitle>
      <ActionWrapper>
        <Button onClick={() => setEditMode(true)} ariaLabel={"Edit task"}>
          <EditIcon />
        </Button>
        <Button onClick={() => handleDeleteTask(id)} ariaLabel={"Delete task"}>
          <TrashIcon />
        </Button>
        <Button
          onClick={() => handleChangeStatus(id)}
          ariaLabel={"Change task status"}
        >
          {isCompleted ? <CompleteIcon /> : <IncompleteIcon />}
        </Button>
      </ActionWrapper>
    </TaskContainer>
  );
};
