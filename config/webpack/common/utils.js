const {
  ROOT_DIR,
  SVG,
  IMG_REG,
  VERSION,
  PUBLIC_URL,
  HOST,
  PORT
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
  if (is(resource, SVG)) {
    return `static/media/svg/${url}`;
  }
  if (is(resource, IMG_REG)) {
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

const getEnv = () => {
  return {...process.env, VERSION, PUBLIC_URL, HOST, PORT};
};

module.exports = {
  resolver,
  assetOutputPath,
  copyFilter,
  getEnv
};
