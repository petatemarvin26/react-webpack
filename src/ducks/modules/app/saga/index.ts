import {takeLatest} from 'redux-saga/effects';

import {HEALTH_CHECK} from '../types';

import healthCheckWorker from './health-check';

function* app() {
  yield takeLatest(HEALTH_CHECK, healthCheckWorker);
}

export default app;
