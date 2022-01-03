import styled from "styled-components";

import { TaskContainer } from "../task/Task.styles";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ThemeTypes } from "../../utils/Theme";

export const Container = styled(TaskContainer)`
  opacity: 0.7;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled.input<{ error: boolean }>`
  border: none;
  display: flex;
  font-size: 16px;
  flex: 1;
  padding: 2px 4px;
  background-color: ${({ theme }: { theme: ThemeTypes }) => theme.background};
  color: ${({ theme }: { theme: ThemeTypes }) => theme.text};
  transition: all 0.5s linear;

  ${({ error }) => error && "border-bottom: 1px solid red"};

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }
`;

export const CancelIcon = styled(AddIcon)`
  transform: rotate(45deg);
`;
