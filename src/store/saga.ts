import { call, all } from 'redux-saga/effects';

import userSagas from './user/saga';
import documentSagas from './document/saga';

export default function* rootSaga() {
  yield all([call(userSagas), call(documentSagas)]);
}
