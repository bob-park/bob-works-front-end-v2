import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { getCall, postCall } from '@/utils/common';

import { userActions } from '@/store/user';
import { documentActions } from '.';
import { DocumentsType } from './types';

const { removeAuthentication } = userActions;
const {
  // get document type
  requestGetDocumentType,
  successGetdocumentType,
  failureGetDocumentType,
} = documentActions;

// get document type
function* callGetDocumentType(
  action: ReturnType<typeof requestGetDocumentType>,
) {
  const { handleAuthError } = action.payload;

  const apiResponse: ApiResponse<DocumentsType[]> = yield getCall(
    '/api/document/type/search',
    null,
  );

  if (apiResponse.state === 'SUCCESS') {
    yield put(successGetdocumentType(apiResponse.data || []));
  } else {
    yield put(failureGetDocumentType());

    if (apiResponse.status === 401) {
      yield put(removeAuthentication());

      handleAuthError && handleAuthError();
    }
  }
}

function* watchRequestGetDocumentType() {
  yield takeLatest(requestGetDocumentType, callGetDocumentType);
}

export default function* documentSagas() {
  yield all([fork(watchRequestGetDocumentType)]);
}
