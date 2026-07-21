import {useEffect, useState} from 'react';

import {healthCheck} from '@/ducks/modules';
import {connector} from '@/hoc';

import styles from './styles.scss';
import {Props} from './types';

const Landing: React.FC<Props> = ({app, dispatch}) => {
  const [ready, setReady] = useState(false);

  const handleAppstatus = () => {
    setReady(app.data.status);
  };
  useEffect(handleAppstatus, [app.data.status]);

  const handleInit = () => {
    dispatch(healthCheck());
  };
  useEffect(handleInit, []);

  if (!ready)
    return (
      <div className={styles['landing']}>
        PREPARING
        <span className={styles['ellipsis']}></span>
      </div>
    );

  return <div className={styles['landing']}>REDIRECTING</div>;
};
export default connector(Landing);
