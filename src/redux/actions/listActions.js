import apiClient from '/src/lib/apiClient';

// Actions
export const ADD_TODO = 'lists/addTodo';
export const TOGGLE_TODO = 'list/toggleTodo';
export const ADD_LIST = 'lists/addList';
export const SET_LISTS = 'lists/setLists';
export const SET_ERROR = 'lists/setError';
export const SET_LOADING = 'lists/setLoading';
export const SET_TODOS = 'list/setTodos';

// Selectors
export const selectLists = (state) => state.todos.lists;
export const selectTodoList = (listId) => (state) => {
  const lists = selectLists(state);

  return lists.find((list) => list.id === listId);
};

// Action Creators
export const setTodos = (listId, todos) => ({
  type: SET_TODOS,
  payload: { listId, todos },
});

export const addTodo = (listId, todo) => ({
  type: ADD_TODO,
  payload: { listId, todo },
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
    return res.data;
  } catch (error) {
    dispatch(setError(error.res.data));
    return { error: error.res.data };
  }
};

export const loadListComplete = (listId) => async (dispatch) => {
  try {
    const resList = await apiClient.get(`/api/todos/${listId}`)
    const resTodos = await apiClient.get(`/api/todos/${listId}/items`)
    const list = resList.data
    list.todos = resTodos.data

    dispatch(addList(list));
  } catch (error) {
    dispatch(setError(error.res.data));
  }
}

export const loadTodos = (listId) => async (dispatch) => {
  try {
    const res = await apiClient.get(`/api/todos/${listId}/items`)
    dispatch(setTodos(listId, res.data))
  } catch (error) {
    dispatch(setError(error.res.data))
  }

};

export const createList = (data) => async (dispatch) => {
  function onSuccess(success) {
    dispatch(addList(success));

    return success;
  }

  function onError(err) {
    dispatch(setError(err));
    return err;
  }

  try {
    dispatch(setLoading());
    const res = await apiClient.post('/api/todos', data);

    return onSuccess({ ...res.data, todos: [] });
  } catch (error) {
    return onError(error.response.data);
  }
};

export const createTodo = (listId, data) => async (dispatch) => {
  function onSuccess(success) {
    dispatch(addTodo(listId, success))

    return success
  }

  function onError(err) {
    dispatch(setError(err))

    return { error: err }
  }

  try {
    dispatch(setLoading());
    const res = await apiClient.post(`/api/todos/${listId}/items`, data)

    return onSuccess(res.data)
  } catch (err) {
    return onError(err.response.data)
  }
}
