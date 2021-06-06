import { CssBaseline } from "@material-ui/core";
import { StyledEngineProvider, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "./theme";

const MuiTheme: React.FC = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiTheme;
