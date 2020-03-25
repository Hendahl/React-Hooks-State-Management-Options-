import * as actions from "../../constants/actions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { Context } from "../../context/store";
import { useStyles } from "../../theme/styles";

interface TodoProps {
  todo: Todo;
}

const Todo: FC<TodoProps> = ({ todo }) => {
  const { dispatch } = useContext(Context);
  const classes = useStyles();

  const handleDelete = () => {
    dispatch({ type: actions.DELETE_TODO, id: todo.id });
  };
  const handleEdit = () => {
    dispatch({ type: actions.EDIT_TODO, id: todo.id });
  };

  return (
    <ListItem role={undefined} button className={classes.listItem}>
      <ListItemIcon>
        <Switch
          checked={todo.completed}
          color="primary"
          onChange={() => handleEdit()}
          value="completed"
        />
      </ListItemIcon>
      <ListItemText
        className={todo.completed ? classes.titleCompleted : classes.title}
        primary={todo.title}
        secondary={todo.id}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Delete Todo" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
