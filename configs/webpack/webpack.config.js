const webpack = require('webpack');
const {merge} = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {copyMetaFiles, resolver, getEnv} = require('./utils');
const {STYLE_REGEX, SVG_REGEX, SOURCE_REGEX} = require('./constants');

module.exports = (webpack_env) => {
  const {WEBPACK_SERVE, variant} = webpack_env;

  const is_development = !!WEBPACK_SERVE;
  const process_env = getEnv(is_development, variant);

  const entry = resolver('src/index.tsx');

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process_env)
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolver('public'),
          to: resolver('build'),
          filter: copyMetaFiles
        }
      ]
    }),
    new ESLintWebpackPlugin({
      resolvePluginsRelativeTo: resolver('src'),
      context: resolver('src'),
      overrideConfigFile: resolver('configs/.eslintrc.js'),
      extensions: ['ts', 'tsx', 'js', 'jsx']
    })
  ];
  const module = {
    rules: [
      {
        test: SOURCE_REGEX,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  };
  const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()]
  };
  const optimization = {
    mergeDuplicateChunks: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimize: is_development ? true : false,
    minimizer: [
      new CssMinimizerPlugin({parallel: 2, include: STYLE_REGEX}),
      new TerserPlugin({
        parallel: 2,
        include: SOURCE_REGEX,
        terserOptions: {
          mangle: true,
          output: {beautify: false}
        }
      })
    ]
  };

  let config = {
    target: 'web',
    entry,
    module,
    plugins,
    resolve,
    optimization
  };

  if (is_development) {
    return merge(config, devConfig(process_env));
  }
  return merge(config, prodConfig(process_env));
};
