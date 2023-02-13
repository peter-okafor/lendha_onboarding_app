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
      query: () => e.users
    }),
    loans: build.query<LoanResponse, void>({
      query: () => e.loans
    }),
    profile: build.query<LoanResponse, void>({
      query: () => e.profile
    })
  })
});

export const { useLoansQuery, useUsersQuery, useProfileQuery } = onboardingOfficer;
