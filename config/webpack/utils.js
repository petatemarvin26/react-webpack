const {config} = require('dotenv');
const {
  ROOT_DIR,
  SVG_FILE,
  IMG_FILE,
  PUBLIC_URL,
  VERSION,
  PORT,
  HOST
} = require('./constants');

/**
 * @param {string} path
 * @returns {string}
 */
const resolver = (path) => {
  return `${ROOT_DIR}/${path}`;
};

/**
 * @param {string} file
 * @param {RegExp} regex
 */
const is = (file, regex) => regex.test(file);

/**
 * @param {string} url
 * @param {string} resource
 * @returns
 */
const assetOutputPath = (url, resource) => {
  if (is(resource, SVG_FILE)) {
    return `static/media/svg/${url}`;
  }
  if (is(resource, IMG_FILE)) {
    return `static/media/image/${url}`;
  }
  return `static/media/others/${url}`;
};

/**
 * @param {string} resourcePath
 * @returns
 */
const copyFilter = (resourcePath) => {
  if (resourcePath.includes('.html')) {
    return false;
  }
  return true;
};

const getEnv = (wp_env) => {
  const {variant} = wp_env;
  const env_file = variant ? `.env.${variant}` : '.env';

  const env = config({path: resolver(env_file)});

  let vars = {PUBLIC_URL, VERSION, PORT, HOST};
  if (!env.error) {
    vars = {...vars, ...env.parsed};
  }
  return vars;
};

module.exports = {
  resolver,
  assetOutputPath,
  copyFilter,
  getEnv
};
