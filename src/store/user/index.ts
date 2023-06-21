import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';

const selectorAllState = createSelector(
  (state: UserState) => state.isLoading,
  (state: UserState) => state.user,
  (isLoading, user) => ({
    isLoading,
    user,
  }),
);

export const authentiationSelector = {
  all: (state: RootState) => selectorAllState(state[USER]),
};

export const USER = slice.name;
export const userReducer = slice.reducer;
export const userActions = slice.actions;
