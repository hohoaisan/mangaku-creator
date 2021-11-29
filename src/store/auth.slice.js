import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as profileAPI from 'apis/profile';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null
  // user : {
  //   id: '',
  //   name: '',
  //   email: '',
  //   role: '', // user | author | moderator | admin
  //   permisisons: []
  //   emailVerified: false
  // }
};

export const initProfile = createAsyncThunk('auth/getProfile', async () => profileAPI.getProfile());

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state) => {
      state.isLoading = false;
    },
    loginPending: (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    logout: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      });
  }
});

export const { init, loginPending, loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
