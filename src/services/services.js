import axios from 'axios';
import config from '../config';

const DOMAIN_NAME = config.domainName;

export const authServiceURL = `http://localhost:5151${DOMAIN_NAME}`;

export const callAPI = config => axios({
  ...config
}).catch(error => {
  return { ...error.response };
});