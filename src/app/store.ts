import authReducer from '@/features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    app: appReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
