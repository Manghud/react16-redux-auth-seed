import { all } from 'redux-saga/effects';
import authSagas from './auth';

export default function* root() {
  yield all([
    authSagas
  ]);
}