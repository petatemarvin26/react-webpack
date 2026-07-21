import {put, delay, call} from 'redux-saga/effects';
import {push} from 'redux-first-history';

import {setApp} from '@/ducks/modules';
import {Response} from '@/api/types';
import {xample} from '@/api';

function* healthCheckWorker() {
  yield put(setApp({loading: true}));
  try {
    yield delay(3000);
    yield put(setApp({status: true}));

    const response: Response = yield call(xample.get, '/todos/1');
    response;

    yield put(push('/dashboard'));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setApp({loading: false}));
  }
}

export default healthCheckWorker;
