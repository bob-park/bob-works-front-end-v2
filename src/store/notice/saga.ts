import { call, all, takeLatest, fork, put } from 'redux-saga/effects';

import {
  getCall,
  putCall,
  failureActionProceed,
  postCall,
} from '@/utils/common';

import { Pageable } from '@/store/types';

import { noticeActions } from '.';
import { Notice } from './types';

const {
  //search
  requestSearchNotice,
  successSearchNotice,
  failureSearchNotice,
} = noticeActions;

// search
function* callSearchNotice(action: ReturnType<typeof requestSearchNotice>) {
  const { params, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<Pageable<Notice>> = yield call(
    getCall,
    '/api/notice/search',
    params,
  );

  if (response.state === 'SUCCESS') {
    yield put(
      successSearchNotice(
        response.data || {
          content: [],
          total: 0,
          pageable: { size: 10, page: 0 },
        },
      ),
    );
  } else {
    yield failureActionProceed(response, null, handleAuthError);
  }
}

function* watchRequestSearchNotice() {
  yield takeLatest(requestSearchNotice, callSearchNotice);
}

export default function* noticeSagas() {
  yield all([fork(watchRequestSearchNotice)]);
}
