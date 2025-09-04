import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

interface GlobalStyleProps {
  theme: Theme;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s, color 0.3s;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  /* Material-UI theme integration */
  .MuiTextField-root, .MuiInputBase-root, .MuiOutlinedInput-root {
    background-color: ${props => props.theme.surface} !important;
    color: ${props => props.theme.text} !important;
  }

  .MuiInputBase-input {
    color: ${props => props.theme.text} !important;
    &::placeholder {
      color: ${props => props.theme.textSecondary} !important;
      opacity: 0.7;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.theme.border} !important;
  }

  .MuiPaper-root {
    background-color: ${props => props.theme.surface} !important;
    color: ${props => props.theme.text} !important;
  }

  .MuiTypography-root {
    color: ${props => props.theme.text} !important;
  }

  .MuiCardContent-root {
    background-color: ${props => props.theme.surface} !important;
  }
`;