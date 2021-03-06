import styled from "styled-components";

export const TaskContainer = styled.li<{ isDragging: boolean }>`
  border: 1px solid blueviolet;
  border-radius: 4px;
  box-shadow: 2px 2px 1px ${({ theme }) => theme.shadow};
  opacity: ${({ isDragging }) => Number(!isDragging)};
  padding: 12px;
  margin: 6px 0;
  width: 50%;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s linear;
  cursor: move;
`;

export const TaskTitle = styled.span<{
  isCompleted: boolean;
}>`
  display: flex;
  padding: 2px 4px;
  cursor: text;
  min-width: 30%;
  color: ${({ theme, isCompleted }) => (isCompleted ? "gray" : theme.text)};
  text-decoration: ${({ isCompleted }) =>
    isCompleted ? "line-through" : "none"};
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
`;
