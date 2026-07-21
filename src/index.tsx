import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {store, history} from '@/ducks';
import {apiConfig} from './api';
import Navigator from './navigator';

const body = document.getElementById('root') as HTMLDivElement;
const container = ReactDOM.createRoot(body);

apiConfig(store);

container.render(
  <Provider store={store}>
    <Navigator history={history} />
  </Provider>
);
