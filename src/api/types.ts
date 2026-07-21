import {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import {Store} from 'redux';

export type Response = {
  result?: any;
  message?: string;
  path?: string;
};

export type RequestResolve = {
  (
    store: Store
  ): (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
};
export type ResponseResolve = {
  (store: Store): (response: AxiosResponse) => Promise<AxiosResponse>;
};
export type Reject = {
  (store: Store): (config: AxiosError<Response>) => Promise<string>;
};

export type PlainRequest = {
  (url: string, config?: AxiosRequestConfig): AxiosPromise<Response>;
};
export type BodyRequest = {
  (url: string, body: any, config?: AxiosRequestConfig): AxiosPromise<Response>;
};
export type DeleteRequest = {
  (
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<Response>;
};
