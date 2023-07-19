const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {
  STYLE_REGEX,
  PORT,
  SVG_REGEX,
  GIF_REGEX,
  IMG_REGEX,
  ICON_REGEX
} = require('./constants');
const {resolver} = require('./utils');

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
module.exports = (process_env) => {
  const {ENV} = process_env;
  const output = {
    filename: 'static/js/[name].[contenthash:5].bundle.js',
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
      },
      {
        test: SVG_REGEX,
        use: ['@svgr/webpack', 'file-loader']
      },
      {
        test: [ICON_REGEX, IMG_REGEX, GIF_REGEX],
        type: 'asset/resource',
        generator: {
          filename: '[name]-[hash:10].[ext]'
        }
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
