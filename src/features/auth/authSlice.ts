import { User } from '@/app/services/@types/user';
import { authApi } from '@/app/services/auth';
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

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
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (_state, action) => {
        console.log('pending', action);
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);

        state.user = action.payload.data.user;
        state.token = action.payload.data.auth_token;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (_state, action) => {
        console.log('rejected', action);
      });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
