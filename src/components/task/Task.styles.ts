import styled from "styled-components";
import { ThemeTypes } from "../../utils/Theme";

export const TaskContainer = styled.div`
  border: 1px solid blueviolet;
  border-radius: 4px;
  box-shadow: 2px 2px 1px ${({ theme }: { theme: ThemeTypes }) => theme.shadow};
  padding: 12px;
  margin: 6px 0;
  width: 50%;
  display: flex;
  justify-content: space-between;
  transition: all 0.5s linear;
`;

export const TaskTitle = styled.span`
  display: flex;
  padding: 2px 4px;
  color: ${({ theme }: { theme: ThemeTypes }) => theme.text};
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`;
