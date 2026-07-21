import {HistoryRouter as Router} from 'redux-first-history/rr6';
import {Route, Routes} from 'react-router-dom';

import {Dashboard, Landing} from '@/pages';
import {connector} from '@/hoc';
import {Props} from './types';

const Navigator: React.FC<Props> = ({history}) => {
  return (
    <Router history={history}>
      <Routes>
        <Route index element={<Landing />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default connector(Navigator);
