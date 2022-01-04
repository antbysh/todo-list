import React, { ReactNode } from "react";

import { Container } from "./Button.styles";

interface ButtonTypes {
  children: ReactNode;
  callback: () => void;
  disabled?: boolean;
  fill?: string;
  border?: string;
  ariaLabel?: string;
}

export const Button = ({
  children,
  callback,
  disabled,
  fill,
  border,
  ariaLabel,
}: ButtonTypes) => {
  return (
    <Container
      disabled={disabled}
      onClick={callback}
      fill={fill}
      border={border}
      aria-label={ariaLabel}
    >
      {children}
    </Container>
  );
};
