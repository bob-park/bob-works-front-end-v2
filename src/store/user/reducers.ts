import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetUser: (
    state: UserState,
    action: PayloadAction<{ exceptionHandle?: () => void }>,
  ) => {
    state.isLoading = true;
    state.isLoggedIn = false;
  },
  successGetUser: (
    state: UserState,
    action: PayloadAction<User | undefined>,
  ) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.user = action.payload;
  },
  // remove authentication
  removeAuthentication: (state: UserState) => {
    state.user = undefined;
    state.isLoading = false;
    state.isLoggedIn = false;
  },
};

export default reducers;
