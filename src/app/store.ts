import authReducer from '@/features/auth/authSlice';
import loanReducer from '@/features/onfield-credit-officer/features/loans/loanSlice';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    app: appReducer,
    loan: loanReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
