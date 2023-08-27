const {merge} = require('webpack-merge');
const {DefinePlugin} = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {getEnv, resolver} = require('./utils');

/**
 *
 * @param {object} webpack_env
 * @returns {import('webpack').Configuration}
 */
module.exports = (webpack_env) => {
  const env = getEnv(webpack_env);

  /**
   * @type {import('webpack').Configuration['entry']}
   */
  const entry = {
    index: './index.tsx'
  };
  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new DefinePlugin({'process.env': JSON.stringify(env)}),
    new ESLintPlugin({
      overrideConfigFile: resolver('config/.eslintrc'),
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    })
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
        }
      }
    }
  };

  /**
   * @type {import('webpack').Configuration}
   */
  const config = {
    mode: 'development',
    entry,
    plugins,
    resolve,
    optimization
  };

  if (!webpack_env.WEBPACK_SERVE) {
    config.mode = 'production';
    return merge(config, prodConfig(env));
  }
  return merge(config, devConfig(env));
};
