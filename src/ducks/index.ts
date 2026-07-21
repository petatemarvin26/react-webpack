import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {createReduxHistoryContext} from 'redux-first-history';
import {createBrowserHistory} from 'history';

import {reducer} from './modules';
import saga from './saga';

const {createReduxHistory, routerMiddleware, routerReducer} =
  createReduxHistoryContext({history: createBrowserHistory()});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducer(routerReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(routerMiddleware)
});

const history = createReduxHistory(store);

sagaMiddleware.run(saga);

export {history, store};
