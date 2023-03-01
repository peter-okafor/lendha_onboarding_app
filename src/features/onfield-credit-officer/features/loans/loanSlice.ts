import { LoanInterest, loanInterests } from '@/app/services/misc';
import { ApplyLoanRequest } from '@/app/services/onboardingOfficer';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loanInterests: [],
  loanRequest: {}
} as { loanInterests: LoanInterest[] | []; loanRequest: ApplyLoanRequest };

const slice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoanRequest: (state, { payload }) => {
      state.loanRequest = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(loanInterests.matchFulfilled, (state, { payload }) => {
      state.loanInterests = payload.data;
    });
  }
});

export const { setLoanRequest } = slice.actions;

export default slice.reducer;
