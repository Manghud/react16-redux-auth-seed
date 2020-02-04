import { all } from 'redux-saga/effects';
import timeSagas from './time';

export default function* root() {
  yield all([
    timeSagas
  ]);
}