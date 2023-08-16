const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const VERSION = process.env.npm_package_version;
const PUBLIC_URL = process.env.PUBLIC_URL;

const ROOT_DIR = path.resolve(__dirname, '../..');

const JS_FILE = /\.(js|jsx)$/;
const TS_FILE = /\.(ts|tsx)$/;
const STYLE_FILE = /\.(css|scss)$/i;
const SRC_FILE = [JS_FILE, TS_FILE];

const IMG_FILE = /\.(jpg|png|gif|webp)$/;
const SVG_FILE = /\.(svg)$/;
const ASSET_FILE = [IMG_FILE, SVG_FILE];

module.exports = {
  ROOT_DIR,
  VERSION,
  PORT,
  HOST,
  PUBLIC_URL,
  JS_FILE,
  TS_FILE,
  STYLE_FILE,
  SRC_FILE,
  IMG_FILE,
  SVG_FILE,
  ASSET_FILE
};
