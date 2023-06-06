const dotenv = require('dotenv');
const {
  SVG_REGEX,
  IMG_REGEX,
  HOST,
  PORT,
  SOURCE_REGEX,
  STYLE_REGEX,
  ROOT_DIR,
  ICON_REGEX,
  GIF_REGEX
} = require('./constants');

const assetFilter = (assetFilename) => {
  return (
    SOURCE_REGEX.test(assetFilename) ||
    STYLE_REGEX.test(assetFilename) ||
    SVG_REGEX.test(assetFilename)
  );
};

const isSvg = (file) => SVG_REGEX.test(file);
const isImage = (file) => IMG_REGEX.test(file);
const isIcon = (file) => ICON_REGEX.test(file);
const isGif = (file) => GIF_REGEX.test(file);

const isDevelopment = (env) => env === 'dev';

const assetOutputPath = (url, resource) => {
  if (isSvg(resource)) {
    return `static/media/svg/${url}`;
  }
  if (isImage(resource)) {
    return `static/media/image/${url}`;
  }
  if (isIcon(resource)) {
    return `static/media/ico/${url}`;
  }
  if (isGif(resource)) {
    return `static/media/gif/${url}`;
  }
  return `static/media/others/${url}`;
};
const copyMetaFiles = (filepath) => !filepath.endsWith('.html');

const getVersion = () => {
  return process.env.npm_package_version;
};

const getPublicUrl = (local_env) => {
  return local_env ? local_env['PUBLIC_URL'] : `http://${HOST}:${PORT}`;
};

const getNodeEnv = (local_env) => {
  return local_env ? local_env['ENV'] : 'development';
};

const getEnv = (env, variant) => {
  const config = {path: `${ROOT_DIR}/.env.${variant}`};

  if (env === 'dev' && variant === 'dev') config.path = `${ROOT_DIR}/.env`;

  const ENV_CONFIG = dotenv.config(config);
  let ENV = {parsed: {}};

  if (ENV_CONFIG.error) {
    ENV.parsed['VERSION'] = getVersion();
    ENV.parsed['PUBLIC_URL'] = getPublicUrl(ENV_CONFIG.parsed);
    ENV.parsed['ENV'] = getNodeEnv(ENV_CONFIG.parsed);
  } else {
    ENV = ENV_CONFIG;
  }

  return ENV;
};

const resolver = (path = '') => {
  return ROOT_DIR + `/${path}`;
};

module.exports = {
  isSvg,
  isImage,
  isDevelopment,
  assetOutputPath,
  assetFilter,
  assetFilter,
  copyMetaFiles,
  getVersion,
  getNodeEnv,
  getPublicUrl,
  getEnv,
  resolver
};
