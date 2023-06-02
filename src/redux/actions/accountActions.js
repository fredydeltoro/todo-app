import apiClient from '/src/lib/apiClient';

// Actions
export const SET_USER = 'account/setUser';
export const REMOVE_USER = 'account/removeUser';
export const SET_LOADING = 'account/loading';
export const SET_ERROR = 'account/setError';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const loading = () => ({
  type: SET_LOADING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const makeLogin = (body) => async (dispatch) => {
  dispatch(loading);
  try {
    const res = await apiClient.post('/api/login', body);
    console.log('a ver ====>', res);
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};
