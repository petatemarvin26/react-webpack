const webpack = require('webpack');
const {merge} = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const {default: TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {isDevelopment, copyMetaFiles, resolver, getEnv} = require('./utils');
const {STYLE_REGEX, SVG_REGEX, SOURCE_REGEX} = require('./constants');

module.exports = (webpack_env) => {
  const {env, variant} = webpack_env;

  const process_env = getEnv(env, variant).parsed;

  const entry = resolver('src/index.tsx');

  const module = {
    rules: [
      {
        test: SOURCE_REGEX,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: SVG_REGEX,
        loader: '@svgr/webpack'
      }
    ]
  };
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
    new MiniCssExtractPlugin({
      filename: `static/css/[contenthash:10].styles.css`
    }),
    new ESLintWebpackPlugin({
      resolvePluginsRelativeTo: resolver('src'),
      context: resolver('src'),
      overrideConfigFile: resolver('configs/.eslintrc.js'),
      extensions: ['ts', 'tsx', 'js', 'jsx']
    })
  ];
  const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    preferRelative: true
  };
  const optimization = {
    mergeDuplicateChunks: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
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

  if (isDevelopment(env)) {
    return merge(config, devConfig(process_env));
  }
  return merge(config, prodConfig(process_env));
};
