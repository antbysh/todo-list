import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Container, StyledInput, CancelIcon } from "./AddTask.styles";
import { addTask, editTask } from "../tasksList/tasksListSlice";
import { useAppDispatch } from "../../app/hooks";
import { Button } from "../button/Button";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { TABS } from "../tabs/tabs.constants";

interface AddTaskTypes {
  currentTab?: string;
  editMode?: {
    id: string;
    title: string;
    setEditMode: (isEditMode: boolean) => void;
  };
}

export const AddTask = ({ editMode, currentTab }: AddTaskTypes) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editMode && setInputValue(editMode.title);
  }, [editMode]);

  const handleAddTask = () => {
    dispatch(
      addTask({
        title: inputValue,
        id: uuidv4(),
        status: currentTab === TABS.completed ? "complete" : "incomplete",
      })
    );
    setInputValue("");
  };

  const handleEditTask = () => {
    if (editMode) {
      dispatch(
        editTask({
          title: inputValue,
          id: editMode.id,
        })
      );
    }
    exitEditMode();
  };

  const exitEditMode = () => {
    if (editMode) {
      setInputValue("");
      editMode.setEditMode(false);
    }
  };

  const submitAction = editMode ? handleEditTask : handleAddTask;

  const handleInputChange = ({ value }: { value: string }) => {
    setInputError(false);
    setInputValue(value);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (inputValue.length) {
        submitAction();
      } else {
        setInputError(true);
      }
    }
    if (editMode && e.key === "Escape") {
      exitEditMode();
    }
  };

  return (
    <Container onClick={() => inputRef.current?.focus()} isDragging={false}>
      <StyledInput
        ref={inputRef}
        value={inputValue}
        error={inputError}
        onChange={({ target }) => handleInputChange(target)}
        onKeyDown={handleInputKeyDown}
        placeholder={editMode ? "Edit task" : "Add task"}
        autoFocus={Boolean(editMode)}
      />
      {editMode && (
        <Button callback={exitEditMode} fill={"red"} border={"red"}>
          <CancelIcon />
        </Button>
      )}
      <Button
        disabled={!inputValue.length}
        callback={submitAction}
        fill={"green"}
        border={"green"}
      >
        <AddIcon />
      </Button>
    </Container>
  );
};
