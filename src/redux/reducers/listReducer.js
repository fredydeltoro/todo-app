import { createSlice } from '@reduxjs/toolkit';
import {
  loadLists,
  createList,
  updateList,
  deleteList,
  createTodo,
  loadTodos,
  updateTodo,
  loadListComplete,
  deleteTodo,
} from '../actions/listActions';

// Reducers
const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: {
    [loadLists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loadLists.fulfilled]: (state, action) => {
      state.loading = false;
      state.lists = action.payload;
    },
    [loadLists.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createList.fulfilled]: (state, action) => {
      state.loading = false;
      state.lists.push({ ...action.payload, itemscount: 0 });
    },
    [createList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateList.fulfilled]: (state, action) => {
      const index = state.lists.findIndex(
        (list) => list.id === action.payload.id,
      );
      state.lists.splice(index, 1, {
        ...action.payload,
        itemscount: state.lists[index].itemscount,
      });
      state.loading = false;
    },
    [updateList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteList.fulfilled]: (state, action) => {
      let index = state.lists.findIndex((list) => list.id === action.payload);
      state.lists.splice(index, 1);
      state.loading = false;
    },
    [deleteList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loadTodos.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loadTodos.fulfilled]: (state, action) => {
      let currentList = state.lists.find(
        (list) => list.id === action.payload.listId,
      );
      currentList.todos = action.payload.data;
      state.loading = false;
    },
    [loadTodos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createTodo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createTodo.fulfilled]: (state, action) => {
      let currentList = state.lists.find(
        (list) => list.id === action.payload.listId,
      );
      currentList.todos.push(action.payload.data);
      state.loading = false;
    },
    [createTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateTodo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.loading = false;
      const currentList = state.lists.find(
        (list) => list.id === action.payload.listId,
      );

      const index = currentList.todos.findIndex(
        (todo) => todo.id === action.payload.data.id,
      );

      currentList.todos.splice(index, 1, action.payload.data);
    },
    [updateTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loadListComplete.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loadListComplete.fulfilled]: (state, action) => {
      state.loading = false;
      state.lists.push(action.payload);
    },
    [loadListComplete.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteTodo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.loading = false;
      const currentList = state.lists.find(
        (list) => list.id === action.payload.listId,
      );

      const index = currentList.todos.findIndex(
        (todo) => todo.id === action.payload.todoId,
      );

      currentList.todos.splice(index, 1);
    },
    [deleteTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setError } = todoSlice.actions;

export default todoSlice.reducer;
