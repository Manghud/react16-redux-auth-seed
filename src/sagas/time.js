import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_CURRENT_UTC_TIME,
  FETCH_CURRENT_UTC_TIME_LOADING,
  FETCH_CURRENT_UTC_TIME_SUCCESS,
  FETCH_CURRENT_UTC_TIME_ERROR
} from '../actions/types';

import { getTimeFromTimezone } from '../services/timezone';

function* fetchUTCTime(action){
  try {
    yield put({ type: FETCH_CURRENT_UTC_TIME_LOADING });
    const response = yield call(getTimeFromTimezone, 'UTC');
    if(response.status === 200) {
      yield put({ type: FETCH_CURRENT_UTC_TIME_SUCCESS, payload: response.data });
    } else yield put({ type: FETCH_CURRENT_UTC_TIME_ERROR, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_CURRENT_UTC_TIME_ERROR, payload: error });
  };
}

function* watchTimeSagas() {
  yield takeEvery(FETCH_CURRENT_UTC_TIME, fetchUTCTime);
}

export default watchTimeSagas();
