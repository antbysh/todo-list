import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: blueviolet;
  padding-left: 5%;
`;

export const Tab = styled.div<{ current: boolean }>`
  display: flex;
  padding: 16px;
  margin-top: 16px;
  cursor: pointer;
  color: white;
  border-radius: 4px 4px 0 0;
  background-color: blueviolet;
  font-weight: bold;
  transition: all 0.5s linear;

  ${({ current, theme }) =>
    current && `color: blueviolet; background-color: ${theme.background}`};

  &:hover {
    ${({ current }) => !current && "opacity: 0.8"};
  }
`;
