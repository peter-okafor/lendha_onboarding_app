import { login, logout, Officer } from '@/app/services/auth';
import { profile } from '@/app/services/onboardingOfficer';
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  officer: null,
  token: '',
  isAuthenticated: false
} as { officer: Officer | null; token: string; isAuthenticated: boolean };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
      const token = payload.access_token;
      Cookies.set('token', token, {
        sameSite: 'strict'
        // expires: new Date(new Date(payload.expires_at).getTime())
      });

      state.token = token;
    });

    builder.addMatcher(profile.matchFulfilled, (state, { payload }) => {
      state.officer = payload;
    });

    builder.addMatcher(logout.matchFulfilled, (state) => {
      Cookies.remove('token');

      state.token = '';
    });
  }
});

export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
