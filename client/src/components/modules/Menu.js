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

const SideMenu = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCategory, setOpenCategory] = useState({});

  const populationCategories = [
    ["Population", "JSE_T006_0"],
    ["Number of Children", "JSE_T006_1"],
  ];

  const toggleCategory = (category) => {
    setOpenCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const toggleMenu = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleClickCategory = (categoryName, category) => {
    props.onPropChange(categoryName, category);
  };

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
              {populationCategories.map(([categoryName, category], idx) => {
                return (
                  <ListItemButton
                    onClick={() => handleClickCategory(categoryName, category)}
                    key={idx}
                  >
                    <ListItemText primary={categoryName} secondary={category} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
          {/* Add more categories with subcategories as needed */}
        </List>
      </Drawer>
    </div>
  );
};

export default SideMenu;
