import { call, put } from 'redux-saga/effects';

export function* apiCallSaga(action, service, types){
  const response = yield call(service, action.payload);
  if(response.status >= 200 && response.status < 300) {
    for (const action of types.success) {
      yield put({ type: action, payload: response.data });
    }
  } else {
    for (const action of types.error) {
      yield put({ type: action, payload: response.status });
    }
  };
}