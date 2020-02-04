import generateReducer from './generateReducer';
import {
  FETCH_CURRENT_UTC_TIME_LOADING,
  FETCH_CURRENT_UTC_TIME_SUCCESS
} from '../actions/types';

const initialState = { loading: false };

export default generateReducer(initialState, {
  [FETCH_CURRENT_UTC_TIME_LOADING](state, action) {
    return { ...state, loading: true };
  },
  [FETCH_CURRENT_UTC_TIME_SUCCESS](state, action){
    return { ...state, loading: false, UTCTime: action.payload.toTimestamp };
  }
});