import {combineReducers, Reducer} from '@reduxjs/toolkit';

import {appReducer as app} from './app';

const reducer = (router: Reducer) => {
  return combineReducers({
    router,
    app
  });
};

export * from './app';
export {reducer};
