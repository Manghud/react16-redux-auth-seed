import {
  AUTH_SIGNUP,
  AUTH_LOGIN
} from './types/auth';

export const signupUser = userData => {
  return {
    type: AUTH_SIGNUP,
    payload: userData
  };
};

export const loginUser = userData => {
  return {
    type: AUTH_LOGIN,
    payload: userData
  };
};