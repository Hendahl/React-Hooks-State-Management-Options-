import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, ReactElement } from "react";
import Switch from "@material-ui/core/Switch";
import { useStyles } from "../../theme";

interface TodoProps {
  onDeleteTodo: (todo: Todo) => void;
  onShowEdit: (todo: Todo) => void;
  onToggleTodo: (todo: Todo) => void;
  todo: Todo;
}

const TodoComponent: FC<TodoProps> = ({
  onDeleteTodo,
  onShowEdit,
  onToggleTodo,
  todo,
}): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <ListItem
        role={undefined}
        button
        divider={true}
        onClick={() => onShowEdit(todo)}
      >
        <ListItemIcon>
          <Switch
            checked={todo.completed}
            color="primary"
            onChange={() => onToggleTodo(todo)}
            value="completed"
            size="small"
          />
        </ListItemIcon>
        <ListItemText
          className={
            todo.completed
              ? classes.listItemTextCompleted
              : classes.listItemText
          }
          primary={todo.title}
          secondary={todo.id}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteTodo(todo)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => onShowEdit(todo)}
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default TodoComponent;
