import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';

const selectorAllState = createSelector(
  (state: DocumentsState) => state.isLoading,
  (isLoading) => ({
    isLoading,
  }),
);

export const documentSelector = {
  all: (state: RootState) => selectorAllState(state[DOCUMENT]),
};

export const DOCUMENT = slice.name;
export const documentReducer = slice.reducer;
export const documentActions = slice.actions;
