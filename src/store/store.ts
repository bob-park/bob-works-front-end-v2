import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootSaga from './saga';

// user
import { USER, userReducer } from './user';

// document
import { DOCUMENT, documentReducer } from './document';

const rootReducer = combineReducers({
  [USER]: userReducer,
  [DOCUMENT]: documentReducer,
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

const store = rootStore();

export type RootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper<AppStore>(rootStore, {
  debug: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof rootStore>;
export type AppDispatch = typeof store.dispatch;
