import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import rootSaga from './saga';

// common
import { COMMON, commonReducer } from './common';

// user
import { USER, userReducer } from './user';

// document
import { DOCUMENT, documentReducer } from './document';

// notice
import { NOTICE, noticeReducer } from './notice';

const rootReducer = combineReducers({
  user: userReducer,
  document: documentReducer,
  common: commonReducer,
  notice: noticeReducer,
});

function rootStore() {
  // saga
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = rootStore();

export type RootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper<AppStore>(rootStore, {
  debug: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof rootStore>;
export type AppDispatch = typeof store.dispatch;
