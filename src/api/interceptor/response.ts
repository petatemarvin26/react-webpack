import {Reject, ResponseResolve} from '@/api/types';
import {NETWORK} from '@/common';

const resolve: ResponseResolve = () => (config) => {
  const {data} = config;
  return data;
};

const reject: Reject = () => (config) => {
  const {response} = config;
  if (!response) return Promise.reject('Something went wrong!');

  const {data, status} = response;

  if (status === NETWORK.NO_RESPONSE) {
    return Promise.reject('Something went wrong!');
  }
  if (status === NETWORK.INTERNAL_ERROR) {
    return Promise.reject('Something went wrong!');
  }
  if (status === NETWORK.NOT_FOUND) {
    return Promise.reject('Something went wrong!');
  }
  if (status === NETWORK.UNAUTHORIZED) {
    // dispatch(signOut());
    return Promise.reject('Something went wrong!');
  }
  return Promise.reject(data?.message);
};

const response = {resolve, reject};

export default response;
