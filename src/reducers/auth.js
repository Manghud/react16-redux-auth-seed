import generateReducer from './generateReducer';
import {
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_ERROR
} from '../actions/types/auth';

const initialState = {
  loading: false,
  signupError: null,
  signupSuccess: null
};

export default generateReducer(initialState, {
  [AUTH_SIGNUP](state, action) {
    return { ...state, loading: true, signupError: null };
  },
  [AUTH_SIGNUP_SUCCESS](state, action){
    return { ...state, loading: false, signupSuccess: true, signupError: null };
  },
  [AUTH_SIGNUP_ERROR](state, action){
    return { ...state, loading: false, signupSuccess: null, signupError: action.payload };
  }
});