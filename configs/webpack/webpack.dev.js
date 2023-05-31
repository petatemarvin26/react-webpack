const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const {STYLE_REGEX, PORT} = require('./constants');
const {resolver} = require('./utils');

module.exports = (process_env) => {
  const {ENV} = process_env;
  const output = {
    filename: 'static/js/[contenthash:10].bundle.js',
    path: resolver('build'),
    publicPath: 'auto',
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:10]'
              }
            }
          }
        ],
        exclude: '/node_modules/'
      }
    ]
  };
  const plugins = [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolver('public/index.html')
    }),
    new InterpolateHtmlPlugin({PUBLIC_URL: '', ENV})
    // new BundleAnalyzerPlugin()
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
