import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStyles } from "../theme";
import { withRouter } from "react-router-dom";
import ViewListIcon from "@material-ui/icons/ViewList";
import Divider from "@material-ui/core/Divider";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC } from "react";

const MenuComponent: FC = () => {
  const classes = useStyles();
  const currentPath = useLocation().pathname;

  return (
    <>
      <List>
        <ListItem
          color="primary"
          component={Link}
          className={classes.listItem}
          selected={currentPath === "/" ? true : false}
          to="/"
        >
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          className={classes.listItem}
          selected={currentPath === "/basic" ? true : false}
          to="/basic"
        >
          <ListItemIcon>
            <ViewListIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Basic" />
        </ListItem>
        <ListItem
          component={Link}
          className={classes.listItem}
          selected={currentPath === "/context" ? true : false}
          to="/context"
        >
          <ListItemIcon>
            <ViewListIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Context" />
        </ListItem>
        <ListItem
          component={Link}
          className={classes.listItem}
          selected={currentPath === "/redux" ? true : false}
          to="/redux"
        >
          <ListItemIcon>
            <ViewListIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Redux" />
        </ListItem>
        <ListItem
          component={Link}
          className={classes.listItem}
          selected={currentPath === "/reduxtoolkit" ? true : false}
          to="/reduxtoolkit"
        >
          <ListItemIcon>
            <ViewListIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Redux Toolkit" />
        </ListItem>
        <ListItem
          component={Link}
          className={classes.listItem}
          selected={currentPath === "/mobx" ? true : false}
          to="/mobx"
        >
          <ListItemIcon>
            <ViewListIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="MobX" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          className={classes.listItem}
          button
          component="a"
          href="https://github.com/Hendahl/react-ts-hooks-state-management-alternatives.git"
        >
          <ListItemIcon>
            <GitHubIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
        </ListItem>
      </List>
    </>
  );
};
export default withRouter(MenuComponent);