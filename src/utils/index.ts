import * as filter from "../constants/filter";

const LSKEY = "react-hooks-todos-context";

export const uuid = () => {
  return Date.now() + Math.floor(Math.random() * 50);
};

export const defaultTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  editing: [],
  payload: [],
  isSearching: false,
  isUpdating: false,
  visibilityFilter: filter.ALL_TODOS,
  visible: [],
};

export const getStoredTodos = () => {
  const store = localStorage.getItem(LSKEY);
  return (store && JSON.parse(store)) || defaultTodos;
};

export const setStoredTodos = (payload: Todos) => {
  return localStorage.setItem(LSKEY, JSON.stringify(payload));
};
