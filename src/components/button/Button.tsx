import React, { ReactNode } from "react";

import { Container } from "./Button.styles";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  fill?: string;
  border?: string;
  ariaLabel?: string;
}

export const Button = ({
  children,
  onClick,
  disabled,
  fill,
  border,
  ariaLabel,
}: ButtonProps) => {
  return (
    <Container
      disabled={disabled}
      onClick={onClick}
      fill={fill}
      border={border}
      aria-label={ariaLabel}
    >
      {children}
    </Container>
  );
};
