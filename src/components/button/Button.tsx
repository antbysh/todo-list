import React, { ReactNode } from "react";
import { Container } from "./Button.styles";

interface ButtonTypes {
  children: ReactNode;
  callback: () => void;
  disabled?: boolean;
  fill?: string;
}

export const Button = ({ children, callback, disabled, fill }: ButtonTypes) => {
  return (
    <Container disabled={disabled} onClick={callback} fill={fill}>
      {children}
    </Container>
  );
};
