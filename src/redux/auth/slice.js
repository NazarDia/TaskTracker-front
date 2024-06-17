import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  refreshUser,
  changeTheme,
  updateProfile,
  sendFeedback,
} from './operations';

const handlePending = state => {
  state.error = null;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
};

const initialState = {
  user: { name: null, email: null, theme: 'Light', avatarURL: null },
  token: localStorage.getItem('token') || null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
          theme: 'Light',
          avatarURL: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })

      .addCase(changeTheme.pending, state => {
        state.isLoading = true;
      })
      .addCase(changeTheme.fulfilled, (state, { payload }) => {
        state.user.theme = payload.theme;
        state.isLoading = false;
      })
      .addCase(changeTheme.rejected, state => {
        state.isLoading = false;
      })
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.user = payload; // Оновлено збереження даних користувача
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, state => {
        state.isLoading = false;
      })
      .addCase(sendFeedback.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendFeedback.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(sendFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});
export const authReducer = authSlice.reducer;
export const { resetAuthError } = authSlice.actions;
