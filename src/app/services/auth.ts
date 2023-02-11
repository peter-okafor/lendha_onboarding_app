import { api } from './api';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
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
export interface LogoutResponse {
  message: string;
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
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    Logout: build.query<LogoutResponse, void>({
      query: (credentials) => ({
        url: 'auth/logout',
        method: 'GET',
        body: credentials
      })
    }),
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials
      })
    }),
    passwordReset: build.mutation<PasswordResetResponse, PasswordResetRequest>({
      query: (credentials) => ({
        url: 'password/create',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation, useSignupMutation, usePasswordResetMutation } = authApi;

export const {
  endpoints: { login }
} = authApi;
