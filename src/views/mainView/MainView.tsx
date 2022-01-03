import React, { useState } from "react";

import { Container, SearchInput, Wrapper } from "./MainView.styles";
import { TasksList } from "../../components/tasksList/TasksList";
import { useAppSelector } from "../../app/hooks";
import {
  selectAllTasks,
  selectCompletedTasks,
  selectUncompletedTasks,
} from "../../components/tasksList/tasksListSlice";
import { Tabs } from "../../components/tabs/Tabs";
import { TaskTypes } from "../../components/task/Task";
import { TABS } from "../../components/tabs/tabs.constants";
import { Button } from "../../components/button/Button";

interface MainViewTypes {
  handleThemeChange: () => void;
}

export const MainView = ({ handleThemeChange }: MainViewTypes) => {
  const allTasks = useAppSelector(selectAllTasks);
  const completedTasks = useAppSelector(selectCompletedTasks);
  const uncompletedTasks = useAppSelector(selectUncompletedTasks);
  const [currentTab, setCurrentTab] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const tabData = (() => {
    switch (currentTab) {
      case TABS.all:
        return allTasks;
      case TABS.completed:
        return completedTasks;
      case TABS.uncompleted:
        return uncompletedTasks;
      default:
        return [];
    }
  })();

  const taskData = (data: TaskTypes[]) =>
    searchValue.length
      ? data.filter(({ title }) =>
          title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        )
      : data;

  return (
    <Container>
      <Tabs setTab={setCurrentTab} activeTab={currentTab} />
      <Wrapper>
        <SearchInput
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
          placeholder={"Search for tasks"}
        />
        <Button callback={handleThemeChange}>Switch Theme</Button>
      </Wrapper>
      <TasksList data={taskData(tabData)} currentTab={currentTab} />
    </Container>
  );
};
