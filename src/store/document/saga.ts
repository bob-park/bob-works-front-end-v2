import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { getCall, postCall } from '@/utils/common';
import { documentActions } from '.';

export default function* documentSagas() {
  yield all([]);
}
