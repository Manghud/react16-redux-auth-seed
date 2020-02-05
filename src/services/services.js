import axios from 'axios';
import config from '../config';

const DOMAIN_NAME = config.domainName;

export const authServiceURL = `http://localhost:5151${DOMAIN_NAME}`;

export const callAPI = (config) => {
  const requestConfig = { ...config };
  if (requestConfig.auth) {
    delete requestConfig.auth;
    if (!requestConfig.headers) {
      requestConfig.headers = {};
    }
    requestConfig.headers['Authorization'] = localStorage.getItem('authToken');
  }
  return axios(requestConfig).catch(error => ({ ...error.response }));
};