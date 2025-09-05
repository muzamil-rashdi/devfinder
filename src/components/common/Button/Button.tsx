import React from "react";
import styled from "styled-components";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";

// Extended props for our styled button
type CustomButtonProps = {
  $theme: any;
  $variant?: "contained" | "outlined" | "text";
};

const CustomButton = styled(MuiButton)<CustomButtonProps>`
  ${({ $variant, $theme }) => `
    background-color: ${$variant === "contained" ? $theme.primary : "transparent"};
    color: ${$variant === "contained" ? "white" : $theme.text};
    border: ${$variant === "outlined" ? `1px solid ${$theme.primary}` : "none"};
    
    &:hover {
      background-color: ${
        $variant === "contained" ? $theme.primary : "rgba(0,0,0,0.04)"
      };
    }
  `}
`;

interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "contained" | "outlined" | "text";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "contained", ...rest }) => {
  const { theme } = useTheme();

  return (
    <CustomButton $theme={theme} $variant={variant} {...rest}>
      {children}
    </CustomButton>
  );
};

export default Button;
