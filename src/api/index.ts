import {Store} from 'redux';

import xample, {xampleConfig} from './xample.com';
import {request, response} from './interceptor';

const apiConfig = (store: Store) => {
  xampleConfig.interceptors.request.use(
    request.resolve(store),
    request.reject(store)
  );
  xampleConfig.interceptors.response.use(
    response.resolve(store),
    response.reject(store)
  );
};

export {apiConfig, xample};
