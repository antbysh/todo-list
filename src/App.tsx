import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import { MainView } from "./views/mainView/MainView";
import { lightTheme, darkTheme, globalStyles } from "./utils/Theme";

function App() {
  const [theme, setTheme] = useState("dark");
  const GlobalStyle = globalStyles;

  const handleThemeChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div>
        <MainView handleThemeChange={handleThemeChange} />
      </div>
    </ThemeProvider>
  );
}

export default App;
