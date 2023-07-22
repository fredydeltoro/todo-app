import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '/src/lib/apiClient';

// Selectors
export const selectLists = (state) => state.todos.lists;
export const selectTodoList = (listId) => (state) => {
  const lists = selectLists(state);

  return lists.find((list) => list.id === listId);
};

export const loadLists = createAsyncThunk(
  'todos/loadLists',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get('/api/todos');
      return res.data;
    } catch (error) {
      return rejectWithValue({ error: error.res.data });
    }
  },
);

export const createList = createAsyncThunk(
  'todos/createList',
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiClient.post('/api/todos', data);

      return { ...res.data, todos: [] };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateList = createAsyncThunk(
  'todos/updateList',
  async ({ listId, data }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/api/todos/${listId}`, data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteList = createAsyncThunk(
  'todos/deleteList',
  async (listId, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/api/todos/${listId}`);

      return listId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async ({ listId, data }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(`/api/todos/${listId}/items`, data);

      return { listId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async (listId, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/api/todos/${listId}/items`);

      return { listId, data: res.data };
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  },
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ listId, todoId, props }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(
        `/api/todos/${listId}/items/${todoId}`,
        props,
      );

      return { listId, data: res.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadListComplete = createAsyncThunk(
  'todos/loadListComplete',
  async (listId, { rejectWithValue }) => {
    try {
      const resList = await apiClient.get(`/api/todos/${listId}`);
      const resTodos = await apiClient.get(`/api/todos/${listId}/items`);
      const list = resList.data;
      list.todos = resTodos.data;

      return list;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async ({ listId, todoId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(
        `/api/todos/${listId}/items/${todoId}`,
      );

      return { listId, todoId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
