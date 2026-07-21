import {AppDispatch as Dispatch, HEALTH_CHECK, SET_APP} from './types';

export const setApp: Dispatch = (payload) => ({
  type: SET_APP,
  payload
});

export const healthCheck: Dispatch = () => ({
  type: HEALTH_CHECK
});
