const path = require('path');

const {merge} = require('webpack-merge');
const {DefinePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const ServiceWorkerPlugin = require('./common/ServiceWorkerPlugin');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {getEnv, resolver} = require('./common');

/**
 * TODO:
 * - clean all injected files
 */

/**
 *
 * @param {object} webpack_env
 * @returns {import('webpack').Configuration}
 */
module.exports = (webpack_env) => {
  const env = getEnv(webpack_env);
  const isdev = webpack_env.WEBPACK_SERVE;

  /**
   * @type {import('webpack').Configuration['entry']}
   */
  const entry = {
    index: resolver('src/index.tsx')
  };
  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new HtmlWebpackPlugin({
      publicPath: env.PUBLIC_URL,
      template: resolver('public/index.html')
    }),
    new DefinePlugin({'process.env': JSON.stringify(env)}),
    new ESLintPlugin({
      overrideConfigFile: resolver('config/.eslintrc.cjs'),
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ServiceWorkerPlugin()
  ];

  /**
   * @type {import('webpack').Configuration['resolve']}
   */
  const resolve = {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  };

  /**
   * @type {import('webpack').Configuration['optimization']}
   */
  const optimization = {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          filename: 'static/js/vendor.[contenthash:10].js',
          reuseExistingChunk: true,
          maxSize: 500000
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  };
  /**
   * @type {import('webpack').Configuration['output']}
   */

  /**
   * @type {import('webpack').Configuration}
   */
  const config = {
    mode: 'development',
    target: 'web',
    entry,
    plugins,
    resolve,
    optimization
  };

  if (!isdev) {
    config.mode = 'production';
    return merge(config, prodConfig(env));
  }
  return merge(config, devConfig(env));
};
