import React from "react";

import { TABS } from "./tabs.constants";
import { Container, Tab } from "./Tabs.styles";

interface TabsTypes {
  setTab: (tab: string) => void;
  activeTab: string;
}

export const Tabs = ({ setTab, activeTab }: TabsTypes) => {
  return (
    <Container>
      {Object.values(TABS).map((tab) => (
        <Tab
          current={tab === activeTab}
          onClick={() => setTab(tab)}
          key={tab}
          aria-label={tab}
        >
          {tab}
        </Tab>
      ))}
    </Container>
  );
};
