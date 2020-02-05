import { takeEvery } from 'redux-saga/effects';
import {
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_ERROR,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR
} from '../actions/types/auth';

import { apiCallSaga } from './util';
import { signup, login } from '../services/auth';

function* signupSaga(action){
  yield apiCallSaga(action, signup, { success: [AUTH_SIGNUP_SUCCESS], error: [AUTH_SIGNUP_ERROR] });
}

function* loginSaga(action){
  yield apiCallSaga(action, login, { success: [AUTH_LOGIN_SUCCESS], error: [AUTH_LOGIN_ERROR] });
}

function* authSagas() {
  yield takeEvery(AUTH_SIGNUP, signupSaga);
  yield takeEvery(AUTH_LOGIN, loginSaga);
}

export default authSagas();
