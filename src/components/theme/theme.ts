import { createTheme } from "@material-ui/core/styles";

const grey = {
  900: "#2B3445", // Main Text
  800: "#373F50", // Paragraph
  700: "#4B566B",
  600: "#7D879C", // Low Priority form Title/Text
  500: "#AEB4BE",
  400: "#DAE1E7", // Border
  300: "#E3E9EF",
  200: "#F3F5F9", // Line Stroke
  100: "#F6F9FC",
};

const primary = {
  100: "#FCE9EC",
  200: "#F8C7CF",
  300: "#F07D90",
  400: "#EC6178",
  500: "rgb(233, 69, 96)", //"#D23F57"
  600: "#E63E58",
  700: "#E3364E",
  800: "#DF2E44",
  900: "#D91F33",
};

// const secondary = {
//   100: "#F3F6F9",
//   200: "#B7C2CF",
//   300: "#879AB0",
//   400: "#335278",
//   500: "#0F3460",
//   600: "#0D2F58",
//   700: "#0B274E",
//   800: "#082144",
//   900: "#041533",
//   main: "#0F3460",
// };

const error = {
  100: "#FFEAEA",
  200: "#FFCBCB",
  300: "#FFA9A9",
  400: "#FF6D6D",
  500: "#FF5353",
  600: "#FF4C4C",
  700: "#FF4242",
  800: "#FF3939",
  900: "#FF2929",
  main: "#E94560",
};

const success = {
  100: "#E7F9ED",
  200: "#C2F1D1",
  300: "#99E8B3",
  400: "#52D77E",
  500: "#33D067",
  600: "#2ECB5F",
  700: "#27C454",
  800: "#20BE4A",
  900: "#14B339",
  main: "#33D067",
};

const warning = {
  main: "#FFCD4E",
  contrastText: "#FFFFFF",
};

const fontSize = 14;

const fontFamily = [
  "Roboto",
  "Open Sans",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  "sans-serif",
].join(",");

// Create a theme instance.
const theme = createTheme({
  palette: {
    // primary: {
    //   ...primary,
    //   light: primary[100],
    // },
    // secondary,
    error,
    warning,
    success,
    text: {
      primary: grey[900],
      secondary: grey[800],
      disabled: grey[400],
    },
    divider: grey[200],
    grey: { ...grey },
    background: {
      default: grey[100],
    },
  },
  typography: {
    fontSize,
    fontFamily,
    htmlFontSize: 16,
    body1: { fontSize },
    body2: { fontSize },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        p: {
          lineHeight: 1.75,
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
        button: {
          fontFamily,
          fontSize,
        },
        "& #nprogress .bar": {
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          borderRadius: "0px 300px 300px 0px",
          zIndex: 1031,
          background: primary[500],
          overflow: "hidden",
        },
        "& #nprogress .peg": {
          boxShadow: `0 0 10px ${primary[500]}, 0 0 5px ${primary[500]}`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: "capitalize",
          minWidth: 0,
          minHeight: 0,
        },
      },
      defaultProps: {
        color: "inherit",
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media only screen and (min-width: 600px)": {
            paddingLeft: "1rem",
            paddingRight: "1rem",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
  },
});

theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";

export default theme;
