import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '/src/lib/apiClient';
import handleCredentials from '/src/lib/handleCredentials';
import jwt_decode from 'jwt-decode';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const makeSignup = createAsyncThunk(
  'account/makeSingup',
  async (body, { rejectWithValue }) => {
    try {
      const res = await apiClient.post('/api/signup', body);
      const user = handleCredentials(res.data.token, apiClient);

      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const makeLogin = createAsyncThunk(
  'account/makeLogin',
  async (body, { rejectWithValue }) => {
    try {
      const res = await apiClient.post('/api/login', body);
      const user = handleCredentials(res.data.token, apiClient);

      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const checkLogin = createAsyncThunk('account/checkLogin', () => {
  const token = localStorage.getItem('token');

  if (token) {
    const user = jwt_decode(token);
    const date = new Date(0);
    date.setUTCSeconds(user.exp);
    const now = new Date();
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (date > now) {
      return user;
    } else {
      localStorage.removeItem('token');
      return null;
    }
  }
});

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    removeUser(state) {
      state.user = null;
    },
  },
  extraReducers: {
    [makeSignup.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },

    [makeSignup.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },

    [makeSignup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [makeLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },

    [makeLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },

    [makeLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [checkLogin.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { removeUser } = accountSlice.actions;

export default accountSlice.reducer;
