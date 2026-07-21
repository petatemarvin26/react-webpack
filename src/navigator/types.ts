import {DucksProps} from '@/hoc/connector';
import {BrowserHistory} from 'history';

export type Props = {
  history: BrowserHistory;
} & DucksProps;
