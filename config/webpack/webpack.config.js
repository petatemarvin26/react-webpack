const {merge} = require('webpack-merge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {getEnv} = require('./utils');

/**
 * @type {import('webpack').Configuration['entry']}
 */
const entry = {
  index: './index.tsx'
};

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
  resolve,
  optimization
};

module.exports = (webpack_env) => {
  const env = getEnv(webpack_env);

  if (!webpack_env.WEBPACK_SERVE) {
    config.mode = 'production';
    return merge(config, prodConfig(env));
  }
  return merge(config, devConfig(env));
};
