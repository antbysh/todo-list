import styled from "styled-components";
import { ThemeTypes } from "../../utils/Theme";

export const TaskContainer = styled.div<{ isDragging: boolean }>`
  border: 1px solid blueviolet;
  border-radius: 4px;
  box-shadow: 2px 2px 1px ${({ theme }: { theme: ThemeTypes }) => theme.shadow};
  opacity: ${({ isDragging }) => Number(!isDragging)};
  padding: 12px;
  margin: 6px 0;
  width: 50%;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s linear;
  cursor: move;
`;

export const TaskTitle = styled.span`
  display: flex;
  padding: 2px 4px;
  cursor: text;
  min-width: 30%;
  color: ${({ theme }: { theme: ThemeTypes }) => theme.text};
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`;
