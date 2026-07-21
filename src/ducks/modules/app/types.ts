import {Action, Dispatch, Reducer, State} from '@/ducks/types';

export type App = {
  status: boolean;
};

export type AppType = 'HEALTH-CHECK' | 'SET-APP';

export type AppState = State<App>;

export type AppAction = Action<AppType>;

export type AppReducer = Reducer<AppState, AppAction>;

export type AppDispatch = Dispatch<AppType>;

export const HEALTH_CHECK: AppType = 'HEALTH-CHECK';
export const SET_APP: AppType = 'SET-APP';
