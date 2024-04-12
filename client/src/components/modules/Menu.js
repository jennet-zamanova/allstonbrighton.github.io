import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Drawer,
  ListItemButton,
} from "@mui/material";
import { ExpandLess, ExpandMore, Menu } from "@mui/icons-material";

function SideMenu() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCategory, setOpenCategory] = useState({});

  const toggleCategory = (category) => {
    setOpenCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const toggleMenu = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleClickCategory = () => {};

  return (
    <div>
      <IconButton onClick={toggleMenu}>
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={toggleMenu}>
        <List>
          <ListItemButton onClick={() => toggleCategory("Category 1")}>
            <ListItemText primary="Category 1" />
            {openCategory["Category 1"] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCategory["Category 1"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={handleClickCategory}>
                <ListItemText primary="JSE_T006_0" />
              </ListItemButton>
              <ListItemButton onClick={handleClickCategory}>
                <ListItemText primary="JSE_T006_1" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* Add more categories with subcategories as needed */}
        </List>
      </Drawer>
    </div>
  );
}

export default SideMenu;
