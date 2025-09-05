import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Favorite, Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { theme, themeMode, toggleTheme } = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.primary }}>
      <Toolbar>
        {/* Logo / Title */}
        <Box
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Typography variant="h6" component="span">
            DevFinder
          </Typography>
        </Box>

        {/* Favorites Button */}
        <Button
          onClick={() => navigate("/favorites")}
          color="inherit"
          startIcon={<Favorite />}
        >
          Favorites
        </Button>

        {/* Theme Toggle */}
        <IconButton onClick={toggleTheme} color="inherit">
          {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
