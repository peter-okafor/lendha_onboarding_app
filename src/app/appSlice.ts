import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isSearchNavOpen: boolean;
  isNavbarOpen: boolean;
  isWebsiteNavbarOpen: boolean;
  isNotificationOpen: boolean;
}

const initialState: AppState = {
  isSearchNavOpen: false,
  isNavbarOpen: false,
  isWebsiteNavbarOpen: false,
  isNotificationOpen: false
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleSearchNav: (state) => {
      state.isSearchNavOpen = !state.isSearchNavOpen;
    },
    toggleNavbarOpen: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    toggleWebsiteNavbarOpen: (state) => {
      state.isWebsiteNavbarOpen = !state.isWebsiteNavbarOpen;
    },
    toggleNotification: (state) => {
      state.isNotificationOpen = !state.isNotificationOpen;
    },
    setNotificationOpen: (state, { payload }) => {
      state.isNotificationOpen = payload;
    }
  }
});

export const {
  setNotificationOpen,
  toggleSearchNav,
  toggleNavbarOpen,
  toggleWebsiteNavbarOpen,
  toggleNotification
} = appSlice.actions;

export default appSlice.reducer;
