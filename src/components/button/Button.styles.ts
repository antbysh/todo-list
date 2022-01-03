import styled from "styled-components";
import { ThemeTypes } from "../../utils/Theme";

export const Container = styled.button<{ fill?: string }>`
  background-color: ${({ theme }: { theme: ThemeTypes }) => theme.background};
  color: ${({ theme }: { theme: ThemeTypes }) => theme.text};
  border: 1px solid blueviolet;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 1px ${({ theme }: { theme: ThemeTypes }) => theme.shadow};
  padding: 4px;
  margin: 0 2px;
  cursor: pointer;
  max-height: 24px;
  transition: all 0.2s linear;

  &:not(:disabled):hover {
    opacity: 0.7;
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: ${({ fill }) => (fill ? fill : "blueviolet")};
  }
`;
