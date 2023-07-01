const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const {STYLE_REGEX, PORT, FILE_REGEX} = require('./constants');
const {resolver, assetOutputPath} = require('./utils');

module.exports = (process_env) => {
  const {ENV} = process_env;
  const output = {
    filename: 'static/js/[contenthash:10].bundle.js',
    path: resolver('build'),
    clean: true
  };
  const devServer = {
    open: true,
    compress: true,
    historyApiFallback: true,
    port: PORT,
    hot: false,
    allowedHosts: ['all']
  };
  const module = {
    rules: [
      {
        test: STYLE_REGEX,
        use: ['style-loader', 'css-loader'],
        exclude: '/node_modules/'
      },
      {
        test: FILE_REGEX,
        type: 'asset/resource'
      }
    ]
  };
  const plugins = [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolver('public/index.html')
    }),
    new InterpolateHtmlPlugin({PUBLIC_URL: '', ENV})
  ];

  return {
    mode: 'development',
    devtool: 'eval-source-map',
    stats: 'errors-warnings',
    output,
    devServer,
    module,
    plugins
  };
};
