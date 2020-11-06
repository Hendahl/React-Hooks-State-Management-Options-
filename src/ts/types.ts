export const ACTIVE_TODOS = "ACTIVE_TODOS";
export const ALL_TODOS = "ALL_TODOS";
export const COMPLETED_TODOS = "COMPLETED_TODOS";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_TODOS = "DELETE_TODOS";
export const EDIT_TODO = "EDIT_TODO";
export const FILTER_TODOS = "FILTER_TODOS";
export const GET_TODOS = "GET_TODOS";
export const SAVE_TODO = "SAVE_TODO";
export const SEARCH_TODOS = "SEARCH_TODOS";
export const SHOW_EDIT = "SHOW_EDIT";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const TOGGLE_TODOS = "TOGGLE_TODOS";
export const UPDATE_TODOS = "UPDATE_TODOS";

export type ReduxAction =
  | { type: typeof ADD_TODO; title: string }
  | { type: typeof DELETE_TODO; id: number }
  | { type: typeof DELETE_TODOS }
  | { type: typeof EDIT_TODO; todo: Todo }
  | { type: typeof FILTER_TODOS; visibiltityFilter: string }
  | { type: typeof GET_TODOS }
  | { type: typeof SAVE_TODO }
  | { type: typeof SEARCH_TODOS; searchTerm: string }
  | { type: typeof SHOW_EDIT; todo: Todo }
  | { type: typeof SHOW_SEARCH }
  | { type: typeof TOGGLE_TODO; todo: Todo }
  | { type: typeof TOGGLE_TODOS; isAllCompleted: boolean }
  | { type: typeof UPDATE_TODOS };

export type AddTodo = (title: string) => void;
export type DeleteTodo = (todo: Todo) => void;
export type DeleteTodos = () => void;
export type Dispatch = (arg: ReduxAction) => void;
export type EditTodo = (todo: Todo) => void;
export type FilterTodos = (visibiltityFilter: string) => void;
export type GetTodos = () => void;
export type SaveTodo = () => void;
export type SearchTodos = (searchTerm: string) => void;
export type ShowEdit = (todo: Todo) => void;
export type ShowSearch = () => void;
export type ToggleTodo = (todo: Todo) => void;
export type ToggleTodos = (completed: boolean) => void;
export type UpdateTodos = () => void;

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
};

export type Todos = {
  countAll: number;
  countCompleted: number;
  isSearching: boolean;
  isUpdating: boolean;
  payload: Todo[];
  visibilityFilter: string;
  visible: Todo[];
  editing: Todo[];
};

export interface TodosI {
  todos: Todos;
}

export let initialTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  editing: [],
  isSearching: false,
  isUpdating: false,
  payload: [],
  visibilityFilter: ALL_TODOS,
  visible: [],
};

export const LSKEY = "react-hooks-todos-all";