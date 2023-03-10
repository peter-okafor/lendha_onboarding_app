import { api } from './api';
import { ENDPOINTS as e } from './_endpoints';

export interface Officer {
  data: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    date_of_birth: string;
    state_of_residence: string;
    gender: string;
    address: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  permissions: string;
  access_token: string;
  token_type: string;
  expires_at: string;
  step: string;
}

export interface SignupRequest {
  name: string;
  business_name: string;
  email: string;
  date_of_birth: string;
  referral_channel: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
}

export interface SignupResponse {
  message: string;
  data: {
    step: number;
  };
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: e.login,
        method: 'POST',
        body: credentials
      })
    }),
    logout: build.query({
      query: () => e.logout
    }),
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: e.signup,
        method: 'POST',
        body: credentials
      })
    }),
    passwordReset: build.mutation<PasswordResetResponse, PasswordResetRequest>({
      query: (credentials) => ({
        url: e.passwordReset,
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation, useSignupMutation, usePasswordResetMutation, useLogoutQuery } =
  authApi;

export const {
  endpoints: { login, logout }
} = authApi;
