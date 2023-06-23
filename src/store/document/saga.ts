import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { getCall, postCall } from '@/utils/common';

import { userActions } from '@/store/user';
import { documentActions } from '.';
import { Documents, DocumentsType } from './types';

const { removeAuthentication } = userActions;
const {
  // get document type
  requestGetDocumentType,
  successGetdocumentType,
  failureGetDocumentType,
  // add vacation document
  requestAddVacationDocument,
  successAddVacationDocumnet,
  failureAddVacationDocument,
  // search document
  requestSearchDocument,
  successSearchDocument,
  failureSearchDocument,
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

// add vacation document
function* callAddVacationDocument(
  action: ReturnType<typeof requestAddVacationDocument>,
) {
  const { body, handleException } = action.payload;
  const { handleAuthError } = handleException;

  const response: ApiResponse<Documents> = yield postCall(
    '/api/document/vacation',
    body,
  );

  if (response.state === 'SUCCESS') {
    yield put(successAddVacationDocumnet(response.data));
  } else {
    yield put(failureAddVacationDocument());

    if (response.status === 401) {
      yield put(removeAuthentication());

      handleAuthError && handleAuthError();
    }
  }
}

function* watchAddVacationDocument() {
  yield takeLatest(requestAddVacationDocument, callAddVacationDocument);
}

// search document
function* callSearchDocument(action: ReturnType<typeof requestSearchDocument>) {
  const { params, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<Documents[]> = yield getCall(
    '/api/document/search',
    params,
  );

  if (response.state === 'SUCCESS') {
    yield put(successSearchDocument(response.data || []));
  } else {
    yield put(failureSearchDocument());

    if (response.status === 401) {
      yield put(removeAuthentication());

      handleAuthError && handleAuthError();
    }
  }
}

function* watchRequestSearchDocument() {
  yield takeLatest(requestSearchDocument, callSearchDocument);
}

export default function* documentSagas() {
  yield all([
    fork(watchRequestGetDocumentType),
    fork(watchAddVacationDocument),
    fork(watchRequestSearchDocument),
  ]);
}
