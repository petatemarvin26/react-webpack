const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {STYLE_REGEX, SOURCE_REGEX, ROOT_DIR} = require('./constants');

module.exports = () => {
  const output = {
    filename: 'static/js/[contenthash:10].bundle.js',
    path: `${ROOT_DIR}/build`,
    clean: true
  };
  const devServer = {
    open: true,
    compress: true,
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
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
    })
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
