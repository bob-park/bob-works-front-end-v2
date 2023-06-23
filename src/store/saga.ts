import { call, all, put } from 'redux-saga/effects';

import userSagas from './user/saga';
import documentSagas from './document/saga';
import { ExceptionHandle } from './types';
import { userActions } from '@/store/user';

const { removeAuthentication } = userActions;

export default function* rootSaga() {
  yield all([call(userSagas), call(documentSagas)]);
}
