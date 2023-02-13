import { api } from './api';
import { ENDPOINTS as e } from './_endpoints';

export interface LoanResponse {
  data: any[];
  message: string;
}

export interface UserResponse {
  data: any[];
  message: string;
}

export const onboardingOfficer = api.injectEndpoints({
  endpoints: (build) => ({
    users: build.query<UserResponse, void>({
      query: () => e.onboardingUsers
    }),
    loans: build.query<LoanResponse, void>({
      query: () => e.onboardingLoans
    })
  })
});

export const { useLoansQuery, useUsersQuery } = onboardingOfficer;
