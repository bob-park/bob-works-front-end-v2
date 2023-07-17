import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle, Pageable, PaginationParams } from '@/store/types';
import { Notice, NoticeState } from './types';

const reducers = {
  // search
  requestSearchNotice: (
    state: NoticeState,
    action: PayloadAction<{
      params: PaginationParams;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    const { params } = action.payload;

    state.isLoading = true;
    state.searchParams = params;
  },
  successSearchNotice: (
    state: NoticeState,
    action: PayloadAction<Pageable<Notice>>,
  ) => {
    state.isLoading = false;
    state.contents = action.payload;
  },
  failureSearchNotice: (state: NoticeState) => {
    state.isLoading = false;
  },
  // count of unread
  requestCountOfUnread: (
    state: NoticeState,
    action: PayloadAction<{
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successCountOfUnread: (
    state: NoticeState,
    action: PayloadAction<{ count: number }>,
  ) => {
    const { count } = action.payload;

    state.isLoading = false;
    state.countOfUnread = count;
  },
  failureCountOfUnread: (state: NoticeState) => {
    state.isLoading = false;
  },
};

export default reducers;
