import { api } from './api';

export interface LoansResponse {
  data: any[];
  message: string;
}

export const onboardingOfficer = api.injectEndpoints({
  endpoints: (build) => ({
    loans: build.query<LoansResponse, void>({
      query: () => 'loans'
    })
  })
});

export const { useLoginMutation, useSignupMutation, usePasswordResetMutation } = authApi;
