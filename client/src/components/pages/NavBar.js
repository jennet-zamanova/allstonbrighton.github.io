import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./NavBar.css";

const navItems = ["About", "Map", "History"];

function NavBar() {
  return (
    <Box sx={{ display: "flex", height: "10vh" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar className="NavBar-container">
          {/* TODO: Add link to main website */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            className="NavBar-title"
          >
            Allston Brighton
          </Typography>
          {/* links to pages */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link to={"/" + item + "/"} key={item} className="NavBar-link">
                {item}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
