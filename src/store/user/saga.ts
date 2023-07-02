import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { getCall, failureActionProceed } from '@/utils/common';
import { userActions } from '.';

const {
  // get user
  requestGetUser,
  successGetUser,
  removeAuthentication,
  // get alternative vacation
  requestGetUsableAlternativeVacation,
  successGetUsableAlternativeVacation,
  failureGetUsableAlternativeVacation,
} = userActions;

function* callGetUser(action: ReturnType<typeof requestGetUser>) {
  const { exceptionHandle } = action.payload;

  const response: ApiResponse<User> = yield call(getCall, '/api/user', null);

  if (response.state === 'SUCCESS') {
    yield put(successGetUser(response.data));
  } else {
    yield failureActionProceed(response, null, exceptionHandle);
  }

  // yield delay(2_000);
}

function* watchLoggedIn() {
  yield takeLatest(requestGetUser, callGetUser);
}

// get alternative vacation
function* callGetUsableAternativeVacation(
  action: ReturnType<typeof requestGetUsableAlternativeVacation>,
) {
  const { handleAuthException } = action.payload;

  const response: ApiResponse<AlternativeVacation[]> = yield getCall(
    '/api/user/alternative/vacation/usable',
    null,
  );

  if (response.state === 'SUCCESS') {
    yield put(successGetUsableAlternativeVacation(response.data || []));
  } else {
    yield failureActionProceed(
      response,
      failureGetUsableAlternativeVacation,
      handleAuthException,
    );
  }
}

function* watchGetUsableAlternativeVacation() {
  yield takeLatest(
    requestGetUsableAlternativeVacation,
    callGetUsableAternativeVacation,
  );
}

export default function* userSagas() {
  yield all([fork(watchLoggedIn), fork(watchGetUsableAlternativeVacation)]);
}
