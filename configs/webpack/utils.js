const fs = require('fs');
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
  GIF_REGEX,
  PUBLIC_URL
} = require('./constants');

const resolver = (path = '') => {
  return ROOT_DIR + `/${path}`;
};

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

const getPublicUrl = (variables) => {
  const public_var = variables['PUBLIC_URL'];
  return !!public_var ? variables['PUBLIC_URL'] : PUBLIC_URL;
};

const getNodeEnv = (env, variables) => {
  const env_var = variables['ENV'];
  return !!env_var ? variables['ENV'] : env ? 'development' : 'production';
};

const getEnv = (env, variant) => {
  const filename = variant ? `.env.${variant}` : '.env';
  const is_exist = fs.existsSync(filename);
  const VARIABLES = is_exist
    ? dotenv.config({path: resolver(filename)}).parsed
    : {};

  let ENV = {
    ...VARIABLES,
    VERSION: getVersion(),
    PUBLIC_URL: getPublicUrl(env, VARIABLES),
    ENV: getNodeEnv(env, VARIABLES)
  };
  return ENV;
};

module.exports = {
  isSvg,
  isImage,
  assetOutputPath,
  assetFilter,
  copyMetaFiles,
  getVersion,
  getNodeEnv,
  getPublicUrl,
  getEnv,
  resolver
};
