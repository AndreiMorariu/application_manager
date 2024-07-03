import { NavLink } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";

import { logOut } from "../services/apiUsers";

import { useColorMode } from "../context/Theme";

import Drawer from "./Drawer";

const pages = ["Dashboard", "Statistics"];

function Navbar() {
  const theme = useTheme();
  const colorMode = useColorMode();

  function handleTheme() {
    colorMode.toggleColorMode();
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}>
            <Drawer />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "1.5rem",
              textTransform: "uppercase",
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <NavLink
                to={`/${page.toLowerCase()}`}
                key={page}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {page}
              </NavLink>
            ))}
          </Box>

          <Box display="flex" alignItems="center">
            <IconButton onClick={handleTheme}>
              {theme.palette.mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
            <IconButton onClick={logOut}>
              <LogoutIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
