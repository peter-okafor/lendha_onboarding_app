import { api } from './api';
import { Officer } from './auth';
import { ENDPOINTS as e } from './_endpoints';

export interface LoanResponse {
  data: any[];
  message: string;
}

export interface UserResponse {
  data: any[];
  message: string;
}

export const onboardingOfficerApi = api.injectEndpoints({
  endpoints: (build) => ({
    users: build.query<UserResponse, void>({
      query: () => e.users
    }),
    loans: build.query<LoanResponse, void>({
      query: () => e.loans
    }),
    profile: build.query<Officer, void>({
      query: () => e.profile
    })
  })
});

export const { useLoansQuery, useUsersQuery, useProfileQuery } = onboardingOfficerApi;

export const {
  endpoints: { profile }
} = onboardingOfficerApi;
