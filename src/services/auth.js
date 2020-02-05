import { authServiceURL, callAPI } from './services';

const authService = `${authServiceURL}/v1/auth`;

export const signup = userData => callAPI({
  method: 'POST',
  url: `${authService}/signup`,
  data: userData
});

export const login = loginData => callAPI({
  method: 'POST',
  url: `${authService}/login`,
  data: loginData
});