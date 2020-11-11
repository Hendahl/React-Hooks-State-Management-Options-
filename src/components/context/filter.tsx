import * as t from "../../ts/types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import { Context } from "../../context/store";
import { useStyles } from "../../theme";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

const FilterComponent: FC = (): ReactElement => {
  const classes = useStyles();
  const { todos, dispatch } = useContext(Context);
  const [stateIsAllCompleted, setStateIsAllCompleted] = useState<boolean>(
    false
  );
  const [stateFilter, setStateFilter] = useState<string>(t.FILTER_ALL);

  useEffect(() => {
    if (todos.data[0]) {
      setStateIsAllCompleted(!todos.data[0].completed);
    }
  }, [todos]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setStateFilter(e.target.value as string);
    dispatch({
      type: t.TODOS_FILTER,
      visibiltityFilter: e.target.value as string,
    });
  };

  const handleDeleteTodos = () => {
    dispatch({ type: t.TODOS_DELETE });
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch({
      type: t.TODOS_FILTER,
      visibiltityFilter: e.currentTarget.id,
    });
  };

  const handleToggleTodos = (): void => {
    if (todos.data[0]) {
      setStateIsAllCompleted(!stateIsAllCompleted);
    }
    dispatch({
      type: t.TODOS_TOGGLE,
      isAllCompleted: stateIsAllCompleted,
    });
  };

  return (
    <ListItem>
      {todos.countAll !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={stateIsAllCompleted ? "primary" : "inherit"}
              disabled={todos.countAll === 0}
              edge="end"
              onClick={handleToggleTodos}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </ListItemIcon>
          <Hidden smDown>
            <ButtonGroup
              aria-label="text primary button group"
              color="primary"
              variant="text"
              className={classes.buttonGroup}
            >
              <Button
                disabled={
                  todos.visibilityFilter === t.FILTER_ALL ||
                  todos.countAll === 0
                }
                id={t.FILTER_ALL}
                onClick={handleFilterTodos}
              >
                ALL ({todos.countAll})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === t.FILTER_ACTIVE ||
                  todos.countAll === 0
                }
                id={t.FILTER_ACTIVE}
                onClick={handleFilterTodos}
              >
                ACTIVE ({todos.countAll - todos.countCompleted})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === t.FILTER_COMPLETED ||
                  todos.countAll === 0
                }
                id={t.FILTER_COMPLETED}
                onClick={handleFilterTodos}
              >
                COMPLETEDED ({todos.countCompleted})
              </Button>
            </ButtonGroup>
          </Hidden>
          <Hidden mdUp>
            <FormControl variant="outlined" fullWidth>
              <Select
                id="filter-select"
                value={stateFilter}
                onChange={handleChange}
              >
                <MenuItem value={t.FILTER_ALL}>ALL ({todos.countAll})</MenuItem>
                <MenuItem value={t.FILTER_ACTIVE}>
                  ACTIVE ({todos.countAll - todos.countCompleted})
                </MenuItem>
                <MenuItem value={t.FILTER_COMPLETED}>
                  COMPLETED ({todos.countCompleted})
                </MenuItem>
              </Select>
            </FormControl>
          </Hidden>
          <IconButton
            color="primary"
            edge="end"
            aria-label="Delete all"
            onClick={handleDeleteTodos}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={todos.isSearching}
            edge="end"
            aria-label="Search"
            onClick={() => dispatch({ type: t.SHOW_SEARCH })}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterComponent;
