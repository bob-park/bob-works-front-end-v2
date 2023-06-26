import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { getCall, postCall, deleteCall } from '@/utils/common';

import { userActions } from '@/store/user';
import { documentActions } from '.';
import {
  DocumentApproval,
  Documents,
  DocumentsType,
  VacationDocumentDetail,
} from './types';
import { Pageable } from '../types';

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
  // get vacation document
  requestGetVacationDocument,
  successGetVacationDocument,
  failureGetVacationDocument,
  // cancel document
  requestCancelDocument,
  successCancelDocument,
  failureCancelDocument,
  // get approval documents
  requestApprovalDocuments,
  successApprovalDocuments,
  failureApprovalDocuments,
  // get approval document
  requestApprovalDocument,
  successApprovalDocument,
  failureApprovalDocument,
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
  const { body, afterHandle, handleException } = action.payload;
  const { handleAuthError } = handleException;

  const response: ApiResponse<Documents> = yield postCall(
    '/api/document/vacation',
    body,
  );

  if (response.state === 'SUCCESS') {
    yield put(successAddVacationDocumnet(response.data));

    afterHandle && afterHandle();
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

  const response: ApiResponse<Pageable<Documents>> = yield getCall(
    '/api/document/search',
    params,
  );

  if (response.state === 'SUCCESS') {
    yield put(successSearchDocument(response.data));
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

// get vacation document
function* callGetVacationDocument(
  action: ReturnType<typeof requestGetVacationDocument>,
) {
  const { id, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<VacationDocumentDetail> = yield call(
    getCall,
    `/api/document/vacation/${id}`,
    null,
  );

  if (response.state === 'SUCCESS') {
    if (!response.data) {
      yield put(failureGetVacationDocument());
      throw new Error('No exist data');
    }

    yield put(successGetVacationDocument(response.data));
  } else {
    yield put(failureGetVacationDocument());

    if (response.status === 401) {
      yield put(removeAuthentication());

      handleAuthError && handleAuthError();
    }
  }
}

function* watchRequestGetVacationDocument() {
  yield takeLatest(requestGetVacationDocument, callGetVacationDocument);
}

// cancel document
function* callCancelDocument(action: ReturnType<typeof requestCancelDocument>) {
  const { id, afterHandle, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<Documents> = yield call(
    deleteCall,
    `/api/document/${id}/cancel`,
  );

  if (response.state === 'SUCCESS') {
    yield put(successCancelDocument());

    afterHandle && afterHandle();
  } else {
    yield put(failureCancelDocument());

    if (response.status === 401) {
      yield put(removeAuthentication());

      handleAuthError && handleAuthError();
    }
  }
}

function* watchCancelDocument() {
  yield takeLatest(requestCancelDocument, callCancelDocument);
}

//  get approval documents
function* callgetApprovalDocuments(
  action: ReturnType<typeof requestApprovalDocuments>,
) {
  const { params, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<Pageable<DocumentApproval>> = yield call(
    getCall,
    `/api/document/approval/search`,
    params,
  );

  if (response.state === 'SUCCESS') {
    yield put(successApprovalDocuments(response.data));
  } else {
    yield put(failureApprovalDocuments());

    if (response.status === 401) {
      yield put(removeAuthentication());

      handleAuthError && handleAuthError();
    }
  }
}

function* watchGetApprovalDocuments() {
  yield takeLatest(requestApprovalDocuments, callgetApprovalDocuments);
}

//  get approval document
function* callgetApprovalDocument(
  action: ReturnType<typeof requestApprovalDocument>,
) {
  const { approvalId, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<DocumentApproval> = yield call(
    getCall,
    `/api/document/approval/${approvalId}`,
    null,
  );

  if (response.state === 'SUCCESS') {
    yield put(successApprovalDocument(response.data));
  } else {
    yield put(failureApprovalDocument());

    if (response.status === 401) {
      yield put(removeAuthentication());

      handleAuthError && handleAuthError();
    }
  }
}

function* watchGetApprovalDocument() {
  yield takeLatest(requestApprovalDocument, callgetApprovalDocument);
}

export default function* documentSagas() {
  yield all([
    fork(watchRequestGetDocumentType),
    fork(watchAddVacationDocument),
    fork(watchRequestSearchDocument),
    fork(watchRequestGetVacationDocument),
    fork(watchCancelDocument),
    fork(watchGetApprovalDocuments),
    fork(watchGetApprovalDocument),
  ]);
}
