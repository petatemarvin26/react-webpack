const dotenv = require('dotenv');
const vars = dotenv.config({path: '.env'}).parsed;

const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const VERSION = process.env.npm_package_version;
const PUBLIC_URL = vars.PUBLIC_URL || `http://${HOST}:${PORT}`;

const ROOT_DIR = path.resolve(__dirname, '../../..');

const CSS = /\.(css)$/;
const SCSS = /\.(scss)$/;
const STYLE = [CSS, SCSS];

const JS = /\.(js|jsx)$/;
const TS = /\.(ts|tsx)$/;
const SRC = [JS, TS];

const JPG = /\.(jpg|jpeg)$/;
const PNG = /\.(png)$/;
const GIF = /\.(gif)$/;
const WEBP = /\.(webp)$/;
const IMG_REG = /\.(jpg|jpeg|png|gif|webp)$/;
const IMG = [JPG, PNG, GIF, WEBP];

const SVG = /\.(svg)$/;
const ASSET = [...IMG, SVG];

module.exports = {
  ROOT_DIR,
  VERSION,
  PORT,
  HOST,
  PUBLIC_URL,
  JS,
  TS,
  STYLE,
  SRC,
  JPG,
  PNG,
  GIF,
  WEBP,
  IMG,
  IMG_REG,
  SVG,
  ASSET
};
