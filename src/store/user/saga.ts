import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { getCall } from '@/utils/common';
import { userActions } from '.';

const { requestGetUser, successGetUser, removeAuthentication } = userActions;

function* callGetUser(action: ReturnType<typeof requestGetUser>) {
  const { exceptionHandle } = action.payload;

  const response: ApiResponse<User> = yield call(getCall, '/api/user', null);

  if (response.state === 'SUCCESS') {
    yield put(successGetUser(response.data));
  } else {
    yield put(removeAuthentication());

    if (response.status === 401) {
      exceptionHandle && exceptionHandle();
    }
  }

  // yield delay(2_000);
}

function* watchLoggedIn() {
  yield takeLatest(requestGetUser, callGetUser);
}

export default function* authencationSagas() {
  yield all([fork(watchLoggedIn)]);
}
