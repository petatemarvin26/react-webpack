import {Dispatch as ReduxDispatch, Action} from '@reduxjs/toolkit';

import {AppState} from '@/ducks/modules';

export type RouterState = {
  location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: any;
  };
  action: Action;
  previousLocations: {
    location: Location;
    action: Action;
  }[];
  basename: string;
};

export type MapProps = {
  router: RouterState;
  app: AppState;
};

export type MapState = {
  (state: MapProps): MapProps;
};

export type MapDispatch = {
  (dispatch: ReduxDispatch<Action>): {
    dispatch: (action: Action) => Action;
  };
};
