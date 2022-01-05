import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Container, SearchInput, Wrapper } from "./MainView.styles";
import { TasksList } from "../../components/tasksList/TasksList";
import { useAppSelector } from "../../app/hooks";

import { Tabs } from "../../components/tabs/Tabs";
import { TABS } from "../../components/tabs/tabs.constants";
import { Button } from "../../components/button/Button";
import {
  selectAllTasks,
  selectCompletedTasks,
  selectUncompletedTasks,
} from "../../app/redux/reducers/tasksListSlice";
import { TaskTypes } from "../../components/task/task.types";

interface MainViewProps {
  handleThemeChange: () => void;
}

export const MainView = ({ handleThemeChange }: MainViewProps) => {
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

  const getSearchedTasksData = (data: TaskTypes[]) =>
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
        <Button onClick={handleThemeChange} ariaLabel={"Switch theme"}>
          Switch Theme
        </Button>
      </Wrapper>
      <DndProvider backend={HTML5Backend}>
        <TasksList
          data={getSearchedTasksData(tabData)}
          currentTab={currentTab}
        />
      </DndProvider>
    </Container>
  );
};
