import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse, IconButton, Drawer } from "@mui/material";
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

  return (
    <div>
      <IconButton onClick={toggleMenu}>
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={toggleMenu}>
        <List>
          <ListItem button onClick={() => toggleCategory("Category 1")}>
            <ListItemText primary="Category 1" />
            {openCategory["Category 1"] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCategory["Category 1"]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemText primary="Subcategory 1.1" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Subcategory 1.2" />
              </ListItem>
            </List>
          </Collapse>
          {/* Add more categories with subcategories as needed */}
        </List>
      </Drawer>
    </div>
  );
}

export default SideMenu;
