import { api } from './api';
import { ENDPOINTS as e } from './_endpoints';

export interface BanksResponse {
  data: {
    list: {
      id: number;
      code: string;
      name: string;
    }[];
  };
  message: string;
}

export interface AccountNameResponse {
  data: {
    name: string;
  };
  message: string;
}

export const bankApi = api.injectEndpoints({
  endpoints: (build) => ({
    bankList: build.query<BanksResponse, void>({
      query: () => e.bankList
    }),
    accountName: build.query<AccountNameResponse, { code: string; number: string }>({
      query: (params) => ({
        url: e.accountName({ code: params.code, number: params.number }),
        method: 'GET'
      })
    })
  })
});

export const { useBankListQuery, useAccountNameQuery } = bankApi;

export const {
  endpoints: { accountName }
} = bankApi;
