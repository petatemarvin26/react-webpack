import {Peek, Push, Pop} from './types';

export default class Storage {
  public static get: Peek = (key) => {
    let data = localStorage.getItem(key) || '';
    if (/^[\s]*[\{\[]/.test(data)) {
      data = JSON.parse(data);
    }
    return data;
  };
  public static set: Push = (key, val) => {
    let data = val;
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  };
  public static remove: Pop = (key: string) => {
    localStorage.removeItem(key);
  };
}
