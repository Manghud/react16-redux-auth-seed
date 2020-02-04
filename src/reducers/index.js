import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import timeReducer from './time';

export default (history) => combineReducers({
  router: connectRouter(history),
  time: timeReducer
});