import { api } from './api';
import { ENDPOINTS as e } from './_endpoints';

export interface BanksResponse {
  data: {
    list: [
      {
        id: number;
        code: string;
        name: string;
      }[]
    ];
  };
  message: string;
}

export const bank = api.injectEndpoints({
  endpoints: (build) => ({
    bankList: build.query<BanksResponse, void>({
      query: () => e.bankList
    })
  })
});

export const { useBankListQuery } = bank;
