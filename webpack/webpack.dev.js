const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {STYLE_REGEX, SOURCE_REGEX} = require('./constants');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: 'errors-warnings',
  devServer: {
    open: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true
  },
  module: {
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
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
    // new BundleAnalyzerPlugin()
  ],
  performance: false
};
