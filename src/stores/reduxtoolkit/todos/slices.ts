import * as t from "../../../ts/types";
import * as utils from "../../../utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setTodosApi, getFilteredDataApi } from "../../../api";

//  Immer is used here
const todosSlice = createSlice({
  name: "todos",
  initialState: t.initialTodos,
  reducers: {
    add(state, { payload }: PayloadAction<{ title: string }>) {
      const { title } = payload;
      state.countAll = state.countAll + 1;
      state.isUpdating = true;
      state.data = [
        { id: utils.uuid(), isCompleted: false, title: title },
        ...state.data,
      ];
      state.dataFilter = t.FILTER_ALL;
    },
    filter(state, { payload }: PayloadAction<{ filter: string }>) {
      const { filter } = payload;
      state.isUpdating = true;
      state.dataFilter = filter;
    },
    get(state, { payload }: PayloadAction<t.TodosT>) {
      setTodosApi(payload);
      return payload;
    },
    remove(state, { payload }: PayloadAction<t.TodoT>) {
      const { id } = payload;
      state.data = state.data.filter((_todo: t.TodoT) => _todo.id !== id);
      state.countAll = --state.countAll;
      state.countCompleted = state.data.filter(
        (_todo: t.TodoT) => _todo.isCompleted
      ).length;
      state.isUpdating = true;
    },
    removeAll() {
      setTodosApi(t.initialTodos);
      return t.initialTodos;
    },

    search(state, { payload }: PayloadAction<{ searchTerm: string }>) {
      const { searchTerm } = payload;
      state.filteredData = state.data.filter((_todo: t.TodoT) =>
        _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.dataFilter = t.FILTER_ALL;
    },
    showPayload(state) {
      state.isPayloadVisible = !state.isPayloadVisible;
    },
    showSearch(state) {
      state.isSearchVisible = !state.isSearchVisible;
      state.isUpdating = true;
    },
    toggle(state, { payload }: PayloadAction<t.TodoT>) {
      const { id } = payload;
      state.data = state.data.map((_todo: t.TodoT) =>
        _todo.id === id ? { ..._todo, isCompleted: !_todo.isCompleted } : _todo
      );
      state.countCompleted = state.data.filter(
        (todo) => todo.isCompleted
      ).length;
      state.isUpdating = true;
    },
    toggleAll(state, { payload }: PayloadAction<{ isAllCompleted: boolean }>) {
      const { isAllCompleted } = payload;
      state.data = state.data.map((_todo: t.TodoT) =>
        _todo.isCompleted === !isAllCompleted
          ? { ..._todo, isCompleted: isAllCompleted }
          : _todo
      );
      state.countCompleted = state.data.filter(
        (_todo: t.TodoT) => _todo.isCompleted
      ).length;
      state.isUpdating = true;
    },
    updateAll(state) {
      return getFilteredDataApi(state);
    },
  },
});

export const {
  add,
  filter,
  get,
  remove,
  removeAll,
  search,
  showPayload,
  showSearch,
  toggle,
  toggleAll,
  updateAll,
} = todosSlice.actions;

export default todosSlice.reducer;