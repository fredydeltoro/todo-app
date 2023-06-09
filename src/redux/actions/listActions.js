import apiClient from '/src/lib/apiClient';

// Actions
export const ADD_TODO = 'lists/addTodo';
export const TOGGLE_TODO = 'list/toggleTodo';
export const ADD_LIST = 'lists/addList';
export const SET_LISTS = 'lists/setLists';
export const SET_ERROR = 'lists/setError';
export const SET_LOADING = 'lists/setLoading';


// Action Creators
export const addTodo = (listId, title) => ({
  type: ADD_TODO,
  payload: { listId, title },
});

export const toggleTodo = (listId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { listId, todoId },
});

export const addList = (payload) => ({
  type: ADD_LIST,
  payload: payload,
});

export const setLists = (lists) => ({
  type: SET_LISTS,
  payload: lists,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const loadLists = () => async (dispatch) => {
  try {
    const res = await apiClient.get('/api/todos');
    dispatch(setLists(res.data));
  } catch (error) {
    dispatch(setError(error.res.data));
  }
};

export const createList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const res = await apiClient.post('/api/todos', data)
    console.log('a ver =====>', res)
    dispatch(addList(res.data))
  } catch (error) {
    console.log('a ver =====>', error)
    dispatch(setError(error.response.data))
  }
}