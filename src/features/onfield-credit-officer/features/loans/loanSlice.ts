import { LoanInterest, loanInterests } from '@/app/services/misc';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loanInterests: []
} as { loanInterests: LoanInterest[] | [] };

const slice = createSlice({
  name: 'loan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(loanInterests.matchFulfilled, (state, { payload }) => {
      state.loanInterests = payload.data;
    });
  }
});

export default slice.reducer;
