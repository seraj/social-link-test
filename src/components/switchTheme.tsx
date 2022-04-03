import React from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useChangeTheme } from "../mui-configs";

const SwitchTheme = () => {
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  return (
    <div style={{ position: "absolute", left: 0, top: "50%" }}>
      <IconButton title="Toggle light/dark mode" onClick={() => changeTheme()}>
        {theme.palette.mode === "light" ? (
          <Brightness4Icon />
        ) : (
          <Brightness7Icon />
        )}
      </IconButton>
    </div>
  );
};

export default SwitchTheme;
