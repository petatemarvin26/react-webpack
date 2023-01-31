const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {SOURCE_REGEX, STYLE_REGEX, MAX_SIZE} = require('./constants');
const { assetFilter } = require('./utils');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: SOURCE_REGEX,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: STYLE_REGEX,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: '/node_modules/'
      }
    ]
  },
  performance: {
    maxEntrypointSize: MAX_SIZE,
    maxAssetSize: MAX_SIZE,
    assetFilter
  }
};
