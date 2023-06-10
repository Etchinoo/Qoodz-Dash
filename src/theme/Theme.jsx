import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    background: "#FFFFFF",
    foreground: "#282A37",
    primary: "#ECE856",
    secondary: "#0D99FF",
    succses: "#14AE5C",
    alert: "#FF754C",
    highlight: "#00BEA7",
    disbled: "#E4E4E4",
    pednding: "#939BAF",
  },
  fontSizes: {
    xsmall: "12px",
    small: "16px",
    medium: "20px",
    large: "24px",
    xlarge: "28px",
  },
  fontWeights: {
    light: 100,
    normal: 300,
    bold: 500,
  },
};

export const ThemeType = typeof theme;

export default ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
