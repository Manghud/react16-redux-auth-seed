import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './reducers';
import rootSaga from './sagas';
import globalConfig from './config';

export const routerHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = globalConfig.displayReduxTools ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)
  : compose;

const middleware = [routerMiddleware(routerHistory), sagaMiddleware];


export const store = createStore(
  createRootReducer(routerHistory),
  {},
  composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);