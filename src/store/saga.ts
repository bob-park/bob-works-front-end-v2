import { call, all } from 'redux-saga/effects';

import commonSagas from './common/saga';
import userSagas from './user/saga';
import documentSagas from './document/saga';

export default function* rootSaga() {
  yield all([call(commonSagas), call(userSagas), call(documentSagas)]);
}
