import apiClient from '/src/lib/apiClient';

// Actions
export const ADD_TODO = 'lists/addTodo';
export const TOGGLE_TODO = 'list/toggleTodo';
export const ADD_LIST = 'lists/addList';
export const SET_LISTS = 'lists/setLists';
export const SET_ERROR = 'lists/setError';

// Action Creators
export const addTodo = (listId, title) => ({
  type: ADD_TODO,
  payload: { listId, title },
});

export const toggleTodo = (listId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { listId, todoId },
});

export const addList = (title) => ({
  type: ADD_LIST,
  payload: { title },
});

export const setLists = (lists) => ({
  type: SET_LISTS,
  payload: lists,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const loadLists = () => async (dispatch) => {
  try {
    const res = await apiClient.get('/api/todos');
    dispatch(setLists(res.data));
  } catch (error) {
    dispatch(setError(res.data));
  }
};
