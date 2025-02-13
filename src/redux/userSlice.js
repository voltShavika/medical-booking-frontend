import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.data;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logoutUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
