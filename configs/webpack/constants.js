const path = require('path');

const HOST = 'localhost';
const PORT = 3000;

const ROOT_DIR = path.resolve(__dirname, '../..');

const ICON_REGEX = /\.(ico)$/i;
const IMG_REGEX = /\.(png|jpg|jpeg)$/i;
const GIF_REGEX = /\.(gif)$/i;
const SVG_REGEX = /\.(svg)$/i;
const FILE_REGEX = [ICON_REGEX, IMG_REGEX, GIF_REGEX, SVG_REGEX];
const STYLE_REGEX = /\.(css|scss)$/i;
const SOURCE_REGEX = /\.(ts|tsx)$/i;

const MAX_SIZE = 326000;

module.exports = {
  HOST,
  PORT,
  ROOT_DIR,
  FILE_REGEX,
  ICON_REGEX,
  IMG_REGEX,
  GIF_REGEX,
  SVG_REGEX,
  STYLE_REGEX,
  SOURCE_REGEX,
  MAX_SIZE
};
