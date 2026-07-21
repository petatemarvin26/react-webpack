import {connect, ConnectedProps} from 'react-redux';
import {MapDispatch, MapState} from './types';

const mapState: MapState = (app) => app;

const mapDispatch: MapDispatch = (dispatch) => ({
  dispatch: (action) => dispatch(action)
});

export const connector = connect(mapState, mapDispatch);

export type DucksProps = ConnectedProps<typeof connector>;

export * from './types';
