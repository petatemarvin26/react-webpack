const path = require('path');

const HOST = 'localhost';
const PORT = 3000;

const ROOT_DIR = path.resolve(__dirname, '..'); //because the webpack configurations are in ./webpack

const FILE_REGEX = /\.(png|jpg|jpeg|gif|ico|svg)$/i;
const SVG_REGEX = /\.(svg)$/i;
const STYLE_REGEX = /\.(css|scss)$/i;
const SOURCE_REGEX = /\.(ts|tsx)$/i;
const JS_REGEX = /\.(js|jsx|ts|tsx)$/i;

const MAX_SIZE = 326000;

module.exports = {
  HOST,
  PORT,
  ROOT_DIR,
  FILE_REGEX,
  SVG_REGEX,
  STYLE_REGEX,
  SOURCE_REGEX,
  JS_REGEX,
  MAX_SIZE,
};
