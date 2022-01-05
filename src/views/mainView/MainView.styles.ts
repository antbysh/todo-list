import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
  transition: all 0.2s linear;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 24px;

  button {
    position: absolute;
    padding: 12px;
    right: 20px;
    top: 10px;
  }
`;

export const SearchInput = styled.input`
  margin: 16px 0;
  display: flex;
  font-size: 16px;
  padding: 12px;
  align-self: center;
  width: 60%;
  border: none;
  border-bottom: 1px solid blueviolet;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s linear;

  &:focus {
    outline: none;
  }
`;
