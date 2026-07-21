import {all} from 'redux-saga/effects';

import {appSaga} from './modules';

function* saga() {
  yield all([appSaga()]);
}

export default saga;
