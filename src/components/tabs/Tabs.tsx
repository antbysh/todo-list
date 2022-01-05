import React from "react";

import { TABS } from "./tabs.constants";
import { Container, Tab } from "./Tabs.styles";

interface TabsProps {
  setTab: (tab: string) => void;
  activeTab: string;
}

export const Tabs = ({ setTab, activeTab }: TabsProps) => {
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
