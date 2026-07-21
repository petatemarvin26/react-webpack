import axios from 'axios';

import xample from './services';

//https://jsonplaceholder.typicode.com/todos
const xampleConfig = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true
});

export {xampleConfig};
export default xample;
