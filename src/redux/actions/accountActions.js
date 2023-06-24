import apiClient from '/src/lib/apiClient';
import jwt_decode from 'jwt-decode';

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
  dispatch(loading());
  try {
    const res = await apiClient.post('/api/login', body);
    const token = res.data.token;
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    localStorage.setItem('token', token);
    dispatch(setUser(jwt_decode(token)));
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

export const checkLogin = () => (dispatch) => {
  const token = localStorage.getItem('token');

  if (token) {
    const user = jwt_decode(token);
    const date = new Date(0);
    date.setUTCSeconds(user.exp);
    const now = new Date();
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (date > now) {
      dispatch(setUser(user));
    } else {
      localStorage.removeItem('token');
      dispatch(setUser(null));
    }
  }
};
