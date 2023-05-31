const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {SOURCE_REGEX, STYLE_REGEX, MAX_SIZE} = require('./constants');
const {assetFilter, namespace} = require('./utils');

module.exports = (process_env) => {
  const {PUBLIC_URL, ENV} = process_env;

  const output = {
    filename: 'static/js/[contenthash:10].bundle.js',
    publicPath: namespace(),
    path: namespace('build'),
    clean: true
  };
  const module = {
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
  };
  const plugins = [
    new InterpolateHtmlPlugin({PUBLIC_URL, ENV}),
    new HtmlWebpackPlugin({
      template: namespace('public/index.html'),
      publicPath: PUBLIC_URL
    })
  ];
  const performance = {
    maxEntrypointSize: MAX_SIZE,
    maxAssetSize: MAX_SIZE,
    assetFilter
  };

  return {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-warnings',
    output,
    module,
    plugins,
    performance
  };
};
