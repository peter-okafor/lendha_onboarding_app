import { createUser } from '@/app/services/onboardingOfficer';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: ''
};

const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(createUser.matchFulfilled, (state, { payload }) => {
      state.userId = payload.data.user.id.toString();
    });
  }
});

export default slice.reducer;
