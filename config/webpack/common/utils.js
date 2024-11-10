const dotenv = require('dotenv');
const {ROOT_DIR, SVG_FILE, IMG_FILE, VERSION} = require('./constants');

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

const getEnv = () => {
  const vars = dotenv.config({path: resolver('.env')});
  return {VERSION, ...vars.parsed, ...process.env};
};

module.exports = {
  resolver,
  assetOutputPath,
  copyFilter,
  getEnv
};
