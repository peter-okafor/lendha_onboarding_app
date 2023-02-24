import { api } from './api';
import { LoanResponse } from './onboardingOfficer';
import { ENDPOINTS as e } from './_endpoints';

export interface ReferralChannelResponse {
  data: {
    id: string;
    name: string;
  }[];
  message: string;
}

export type LoanInterest = {
  id: number;
  purpose: string;
  interest: string;
  minimum_amount: number;
  maximum_amount: number;
  repayment_duration: 'daily' | 'weekly' | 'monthly' | string;
  moratorium: number;
};

export interface LoanInterestsResponse {
  data: LoanInterest[];
}

export const miscApi = api.injectEndpoints({
  endpoints: (build) => ({
    referralChannels: build.query<ReferralChannelResponse, void>({
      query: () => e.referralChannels
    }),
    loanInterests: build.query<LoanInterestsResponse, void>({
      query: () => e.loanInterests
    }),
    loanSearch: build.query<LoanResponse, { search: string }>({
      query: (params) => ({
        url: e.loanSearch({ search: params.search }),
        method: 'GET'
      })
    })
  })
});

export const { useReferralChannelsQuery, useLoanInterestsQuery, useLoanSearchQuery } = miscApi;

export const {
  endpoints: { loanInterests, loanSearch }
} = miscApi;
