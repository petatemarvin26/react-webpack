import {xampleConfig} from '.';

import {PlainRequest, BodyRequest, DeleteRequest} from '@/api/types';

const get: PlainRequest = async (url, config) => {
  return await xampleConfig.get(url, config);
};

const post: BodyRequest = async (url, body, config) => {
  return await xampleConfig.post(url, body, config);
};

const put: BodyRequest = async (url, body, config) => {
  return await xampleConfig.put(url, body, config);
};

const patch: BodyRequest = async (url, body, config) => {
  return await xampleConfig.patch(url, body, config);
};

const del: DeleteRequest = async (url, body = {}, config) => {
  return await xampleConfig.delete(url, {
    data: body,
    ...config
  });
};

const server = {
  get,
  post,
  put,
  patch,
  del
};

export default server;
