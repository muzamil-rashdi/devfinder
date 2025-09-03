import React from "react";
import styled from "styled-components";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";

interface StyledButtonProps {
  $theme: any;
  variant?: "contained" | "outlined" | "text";
}

const StyledButton = styled(MuiButton)<{ $theme: any; variant?: string }>`
  background-color: ${(props: any) => 
    props.variant === "contained" ? props.$theme.primary : "transparent"};
  color: ${(props: any) => 
    props.variant === "contained" ? "white" : props.$theme.text};
  border: ${(props: any) => 
    props.variant === "outlined" ? `1px solid ${props.$theme.primary}` : "none"};
  
  &:hover {
    background-color: ${(props: any) => 
      props.variant === "contained" ? props.$theme.primary : "rgba(0, 0, 0, 0.04)"};
  }
`;
interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "contained" | "outlined" | "text";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "contained", ...props }) => {
  const { theme } = useTheme();
  
  return (
    <StyledButton $theme={theme} variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;