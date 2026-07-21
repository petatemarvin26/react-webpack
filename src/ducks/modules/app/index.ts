import {AppReducer as Reducer, HEALTH_CHECK, AppState, SET_APP} from './types';
import appSaga from './saga';

const initState: AppState = {
  data: {
    status: false
  },
  loading: false
};

const appReducer: Reducer = (state = initState, action) => {
  switch (action.type) {
    case HEALTH_CHECK: {
      return {...state};
    }

    case SET_APP: {
      const newData = Object.entries(state.data).map(([key, data]) => [
        key,
        action.payload[key] ? action.payload[key] : data
      ]);
      return {
        message: action.payload.message ?? state.message,
        loading: action.payload.loading ?? state.loading,
        data: Object.fromEntries(newData)
      };
    }

    default:
      return state;
  }
};

export * from './actions';
export * from './types';
export {appSaga, appReducer};
