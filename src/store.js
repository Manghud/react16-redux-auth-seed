import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './reducers';
import rootSaga from './sagas';
import globalConfig from './config';

export const routerHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = globalConfig.displayReduxTools ?
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) :
  compose;

const middleware = [routerMiddleware(routerHistory), sagaMiddleware];

const persistedSessionToken = localStorage.getItem('authToken');
const persistedSessionUser = localStorage.getItem('user');

export const store = createStore(
  createRootReducer(routerHistory),
  {
    auth: {
      authToken: persistedSessionToken,
      user: JSON.parse(persistedSessionUser)
    }
  },
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(()=> {
  const state = store.getState();
  const authToken = state.auth && state.auth.authToken;
  const user = state.auth && state.auth.user ? JSON.stringify(state.auth.user) : null;
  localStorage.setItem('authToken', authToken || null);
  localStorage.setItem('user', user);
});

sagaMiddleware.run(rootSaga);