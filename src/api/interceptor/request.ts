import {Reject, RequestResolve} from '@/api/types';
import {Storage} from '@/common';

const resolve: RequestResolve = () => (config) => {
  const token = Storage.get('ACCESS_TOKEN');
  if (token) {
    Object.assign(config.headers, {
      Authorization: `Bearer ${token}`,
      'Time-Zone': new Date().getTimezoneOffset()
    });
  }
  return config;
};

const reject: Reject = () => (config) => {
  return Promise.reject(config);
};

const request = {resolve, reject};

export default request;
