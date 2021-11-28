import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'apis/auth';
import * as profileAPI from 'apis/profile';

const initialState = {
  status: 'idle', // idle | loading
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
export const getProfile = createAsyncThunk('auth/getProfile', async () => profileAPI.getProfile());

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLoggedIn = true;
        state.user = action.payload?.user;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'idle';
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'idle';
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(getProfile.pending, (state, action) => {
        console.log('geting profile... ');
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLoggedIn = true;
        state.user = action.payload;
      });
  }
});

export default counterSlice.reducer;
