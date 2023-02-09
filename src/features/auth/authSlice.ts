import { authApi, User } from '@/app/services/auth';
import { RootState } from '@/app/store';
import { encryptToken } from '@/utils/helpers/token.helpers';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  token: '',
  isAuthenticated: false
} as { user: User | null; token: string; isAuthenticated: boolean };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const token = encryptToken(payload.access_token);
      Cookies.set('token', token, {
        sameSite: 'strict'
        // expires: new Date(new Date(payload.expires_at).getTime())
      });

      state.token = token;
    });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
