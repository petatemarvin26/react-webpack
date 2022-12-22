const {SVG_REGEX, FILE_REGEX, HOST, PORT} = require('./constants');

const isSvg = (file) => SVG_REGEX.test(file);
const isImage = (file) => FILE_REGEX.test(file);

const isDevelopment = (env) => env === 'dev';

const assetOutputPath = (url, resource) => {
  if (isSvg(resource)) {
    return `static/media/svg/${url}`;
  }
  if (isImage(resource)) {
    return `static/media/images/${url}`;
  }
  return `static/media/others/${url}`;
};

const getVersion = () => {
  return process.env.npm_package_version;
};
const getPublicUrl = (local_env) => {
  return local_env.parsed['PUBLIC_URL'] || `http://${HOST}:${PORT}`;
};
const getNodeEnv = (local_env) => {
  return local_env.parsed['NODE_ENV'] || process.env.NODE_ENV;
};

module.exports = {
  isSvg,
  isImage,
  isDevelopment,
  assetOutputPath,
  getVersion,
  getNodeEnv,
  getPublicUrl,
};
