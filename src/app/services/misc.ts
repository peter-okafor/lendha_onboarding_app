import { api } from './api';
import { ENDPOINTS as e } from './_endpoints';

export interface ReferralChannelResponse {
  data: {
    id: string;
    name: string;
  }[];
  message: string;
}

export const miscApi = api.injectEndpoints({
  endpoints: (build) => ({
    referralChannels: build.query<ReferralChannelResponse, void>({
      query: () => e.referralChannels
    })
  })
});

export const { useReferralChannelsQuery } = miscApi;
