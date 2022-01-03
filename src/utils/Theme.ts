import { createGlobalStyle } from "styled-components";

export interface ThemeTypes {
  text: string;
  background: string;
  shadow: string;
}

export const lightTheme = {
  text: "black",
  background: "white",
  shadow: "lightgray",
};
export const darkTheme = {
  text: "lightgray",
  background: "#2c2e2c",
  shadow: "#202120",
};

export const globalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: blueviolet;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`;
