import { amber, blueGrey } from "@mui/material/colors";

const themeComponents = {
  components: {
    // Name of the component

    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // padding: "15px 25px",
        },
        text: {
          // color: amber[800],
          fontWeight: "bold",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // borderRadius: "35px",
        },
      },
    },
  },
};

const darkThemePallete = {
  primary: amber,
  divider: blueGrey[700],
  background: {
    default: blueGrey[900],
    paper: blueGrey[900],
  },
  text: {
    primary: "#fff",
  },
};

const lightThemePallete = {
  primary: amber,
  divider: amber[200],
  text: {
    primary: blueGrey[900],
    secondary: blueGrey[800],
  },
};

export { themeComponents, darkThemePallete, lightThemePallete };
