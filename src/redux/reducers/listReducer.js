import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '/src/lib/apiClient';

// Selectors
export const selectLists = (state) => state.todos.lists;
export const selectTodoList = (listId) => (state) => {
  const lists = selectLists(state);

  return lists.find((list) => list.id === listId);
};

// Reducers
const initialState = {
  lists: [],
  loading: false,
  error: null,
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
      state.lists.push(action.payload);
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
      state.lists.splice(index, 1, action.payload);
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
