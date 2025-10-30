import {
  createTheme,
  PaletteColor,
  SimplePaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    sand: PaletteColor;
  }

  interface PaletteOptions {
    sand: SimplePaletteColorOptions;
  }
}

const sand = "#faf6cf";
const orange = "#f35b2a";
const orangeLight = "#f57a51";
const orangeDark = "#cf4517";
const darkBlue = "#1c5765";
const darkBlueLight = "#317586";
const darkBlueDark = "#0b3d49";
const lightGrey = "#696565";
const darkGrey = "#1b1919";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: orange,
      light: orangeLight,
      dark: orangeDark,
      contrastText: "white",
    },
    secondary: {
      main: darkBlue,
      light: darkBlueLight,
      dark: darkBlueDark,
      contrastText: "white",
    },
    divider: lightGrey,
    text: {
      primary: "white",
      secondary: lightGrey,
    },
    background: {
      default: darkGrey,
      paper: darkBlueDark,
    },
    sand: {
      main: sand,
    },
  },
});

export default theme;
