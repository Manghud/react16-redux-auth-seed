import generateReducer from './generateReducer';
import {
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_ERROR,
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS
} from '../actions/types/auth';

const initialState = {
  loading: false,
  signupError: null,
  signupSuccess: null,
  loginError: null,
  user: null
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
  },
  [AUTH_LOGIN](state, action) {
    return { ...state, loading: true, loginError: null };
  },
  [AUTH_LOGIN_SUCCESS](state, action){
    return {
      ...state,
      loading: false,
      loginError: null,
      user: action.payload.user,
      authToken: action.payload.auth
    };
  },
  [AUTH_LOGIN_ERROR](state, action){
    return { ...state, loading: false, user: null, loginError: action.payload };
  }
});