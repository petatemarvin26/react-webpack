const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const {STYLE_REGEX, SOURCE_REGEX, ROOT_DIR, PORT} = require('./constants');

module.exports = (process_env) => {
  const {ENV} = process_env;
  const output = {
    filename: 'static/js/[contenthash:10].bundle.js',
    path: `${ROOT_DIR}/build`,
    clean: true
  };
  const devServer = {
    open: true,
    compress: true,
    historyApiFallback: true,
    port: PORT,
    allowedHosts: ['all']
  };
  const module = {
    rules: [
      {
        test: SOURCE_REGEX,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel']
            }
          },
          'source-map-loader',
          'ts-loader'
        ]
      },
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
      template: `${ROOT_DIR}/public/index.html`
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
