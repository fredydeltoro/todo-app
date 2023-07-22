import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '/src/lib/apiClient';
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  REMOVE_LIST,
  SET_TODOS,
} from '../actions/listActions';

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
  async (listId) => {
    try {
      const res = await apiClient.delete(`/api/todos/${listId}`);

      return listId;
    } catch (error) {
      return error.response.data;
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
  },
});

export const { setError } = todoSlice.actions;

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      const lists = state.lists.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            todos: action.payload.todos,
          };
        }
        return list;
      });

      return {
        ...state,
        lists,
      };
    case ADD_TODO:
      const updatedLists = state.lists.map((list) =>
        list.id === action.payload.listId
          ? {
              ...list,
              todos: [...list.todos, action.payload.todo],
            }
          : list,
      );
      return {
        ...state,
        lists: updatedLists,
        error: null,
        loading: false,
      };

    case REMOVE_TODO:
      let { listId, todoId } = action.payload;
      const newLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            todos: list.todos.filter((t) => todoId !== t.id),
          };
        }

        return list;
      });

      return {
        ...state,
        lists: newLists,
        error: null,
        loading: false,
      };

    case REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter((l) => l.id !== action.payload.listId),
        error: null,
        loading: false,
      };

    case UPDATE_TODO:
      const { upTodo } = action.payload;
      const updatedListsWithToggle = state.lists.map((list) =>
        list.id === action.payload.listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === upTodo.id ? upTodo : todo,
              ),
            }
          : list,
      );
      return {
        ...state,
        lists: updatedListsWithToggle,
      };

    default:
      return state;
  }
};

export default todoSlice.reducer;
