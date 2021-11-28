import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'apis/auth';
import * as profileAPI from 'apis/profile';

const initialState = {
  isLoading: true, // idle | loading
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

export const login = createAsyncThunk('auth/login', async (credentials) => authAPI.login(credentials));
export const logout = createAsyncThunk('auth/logout', async ({ refreshToken }) => authAPI.logout({ refreshToken }));
export const initProfile = createAsyncThunk('auth/getProfile', async () => profileAPI.getProfile());

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state) => {
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload?.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
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

export const { init } = authSlice.actions;

export default authSlice.reducer;
