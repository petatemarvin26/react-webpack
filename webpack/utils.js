const dotenv = require('dotenv');
const {SVG_REGEX, FILE_REGEX, HOST, PORT} = require('./constants');

module.exports = {};

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
const copyMetaFiles = (filepath) => !filepath.endsWith('.html');

const getVersion = () => {
  return process.env.npm_package_version;
};
const getPublicUrl = (local_env) => {
  return local_env.parsed['PUBLIC_URL'] || `http://${HOST}:${PORT}`;
};
const getNodeEnv = (local_env) => {
  return local_env.parsed['ENV'] || 'development';
};
const getEnv = (env, variant) => {
  const config = {path: `./.env.${variant}`};

  if (env === 'dev' && variant === 'dev') config.path = './.env';

  const ENV = dotenv.config(config);

  ENV.parsed['VERSION'] = getVersion();
  ENV.parsed['PUBLIC_URL'] = getPublicUrl(ENV);
  ENV.parsed['ENV'] = getNodeEnv(ENV);

  return ENV;
};

module.exports = {
  isSvg,
  isImage,
  isDevelopment,
  assetOutputPath,
  copyMetaFiles,
  getVersion,
  getNodeEnv,
  getPublicUrl,
  getEnv
};
