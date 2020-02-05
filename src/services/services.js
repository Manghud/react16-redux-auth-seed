import axios from 'axios';
import config from '../config';

const DOMAIN_NAME = config.domainName;

export const authServiceURL = `http://localhost:5151${DOMAIN_NAME}`;

export const callAPI = (config) => {
  const requestConfig = { ...config };
  if (config.auth) {
    requestConfig.headers['Authorization'] = localStorage.getItem('authToken');
  }
  return axios().catch(error => ({ ...error.response }));
};