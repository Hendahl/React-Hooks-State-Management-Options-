import * as actions from "../../stores/redux/todos/actions";
import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DataComponent from "../../components/data";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useEffect } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const TodosContainer: FC = () => {
  const typedUseSelector: TypedUseSelectorHook<t.TodosI> = useSelector;
  const storeTodos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);

  useEffect(() => {
    if (storeTodos.isUpdating) {
      dispatch(actions.updateAll());
    }
  }, [storeTodos, dispatch]);

  const handleAdd = (title: string) => {
    dispatch(actions.add(title));
  };

  const handleShowSearch: t.ShowSearch = () => {
    dispatch({ type: t.SHOW_SEARCH });
  };

  const handleSearch: t.Search = (searchTerm) => {
    dispatch(actions.search(searchTerm));
  };

  const handleRemove: t.Remove = (todo) => {
    dispatch(actions.remove(todo));
  };

  const handleToggle: t.Toggle = (todo) => {
    dispatch(actions.toggle(todo));
  };

  const handleRemoveAll: t.RemoveAll = () => {
    dispatch(actions.removeAll());
  };

  const handleFilter: t.Filter = (visibilityFilter) => {
    dispatch(actions.filter(visibilityFilter));
  };

  const handleToggleAll: t.ToggleAll = (isAllCompleted) => {
    dispatch(actions.toggleAll(isAllCompleted));
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux
        </Box>
      </Typography>
      <ProgressComponent isUpdating={storeTodos.isUpdating} />
      <List>
        {storeTodos.isSearching ? (
          <SearchComponent
            showSearch={handleShowSearch}
            search={handleSearch}
            visibleTodosLength={storeTodos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent add={handleAdd} />
            <FilterComponent
              removeAll={handleRemoveAll}
              filter={handleFilter}
              showSearch={handleShowSearch}
              toggleAll={handleToggleAll}
              todos={storeTodos}
            />
          </>
        )}
        {storeTodos.visibleTodos.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={handleRemove}
            toggle={handleToggle}
            todo={_todo}
          />
        ))}
        <DataComponent todos={storeTodos} />
      </List>
    </Container>
  );
};

export default TodosContainer;
