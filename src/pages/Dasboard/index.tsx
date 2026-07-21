import {connector} from '@/hoc';

import styles from './styles.scss';
import {Props} from './types';

const Dashboard: React.FC<Props> = () => {
  return <div className={styles['dashboard']}>DASHBOARD</div>;
};
export default connector(Dashboard);
