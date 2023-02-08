export interface LoginRequest {
  email: string;
  password: string;
}
import { api } from './api';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
}
export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    user: User & {
      id: string;
      next_activation_stage: string;
    };
    access_token: string;
  };
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

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation, useSignupMutation } = authApi;

export const {
  endpoints: { login }
} = authApi;
