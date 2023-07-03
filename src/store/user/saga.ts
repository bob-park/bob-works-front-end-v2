import {
  call,
  all,
  takeLatest,
  fork,
  put,
  delay,
  take,
} from 'redux-saga/effects';

import {
  getCall,
  putCall,
  failureActionProceed,
  postCall,
} from '@/utils/common';
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
  // update user avatar
  requestUpdateUserAvatar,
  successUpdateUserAvatar,
  failureUpdateUserAvatar,
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

// update user avatar
function* callUpdateUserAvatar(
  action: ReturnType<typeof requestUpdateUserAvatar>,
) {
  const { formData, exceptionHandle, handleAfter } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<User> = yield call(
    postCall,
    `/api/user/avatar`,
    formData,
  );

  if (response.state === 'SUCCESS') {
    yield put(successUpdateUserAvatar());

    handleAfter && handleAfter();
  } else {
    yield failureActionProceed(
      response,
      failureUpdateUserAvatar,
      handleAuthError,
    );
  }
}

function* watchUpdateUserAvatar() {
  yield takeLatest(requestUpdateUserAvatar, callUpdateUserAvatar);
}

export default function* userSagas() {
  yield all([
    fork(watchLoggedIn),
    fork(watchGetUsableAlternativeVacation),
    fork(watchUpdateUserAvatar),
  ]);
}
