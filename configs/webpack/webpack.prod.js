const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {STYLE_REGEX, MAX_SIZE} = require('./constants');
const {assetFilter, resolver} = require('./utils');

module.exports = (process_env) => {
  const {PUBLIC_URL, ENV} = process_env;

  const output = {
    filename: 'static/js/[contenthash:10].bundle.js',
    publicPath: resolver(),
    path: resolver('build'),
    clean: true
  };
  const module = {
    rules: [
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
      template: resolver('public/index.html'),
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
