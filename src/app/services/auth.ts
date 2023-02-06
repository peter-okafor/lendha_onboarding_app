import { LoginRequest, UserResponse } from './@types/user';
import { api } from './api';

export interface Post {
  id: number;
  name: string;
  fetched_at: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation } = authApi;

export const {
  endpoints: { login }
} = authApi;
