import { api } from './api';
import { ENDPOINTS as e } from './_endpoints';

export interface BanksResponse {
  data: {
    name: string;
  };
  message: string;
}

export const bankApi = api.injectEndpoints({
  endpoints: (build) => ({
    accountName: build.query<BanksResponse, void>({
      query: () => e.accountName
    })
  })
});

export const { useAccountNameQuery } = bankApi;
