const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {
  SRC_FILE,
  STYLE_FILE,
  resolver,
  copyFilter,
  babelLoader,
  imageLoader,
  svgLoader,
  styleLoader
} = require('./common');

/**
 * @param {object} env
 * @return {import('webpack').Configuration}
 */
module.exports = (env) => {
  /**
   * @type {import('webpack').Configuration['output']}
   */
  const output = {
    filename: `static/js/index.[contenthash:5].js`,
    path: resolver('build')
  };

  /**
   * @type {import('webpack').Configuration['module']}
   */
  const modules = {
    rules: [
      babelLoader(false),
      imageLoader(false),
      svgLoader(false),
      styleLoader(false)
    ]
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new CopyPlugin({
      patterns: [
        {
          from: resolver('public'),
          to: resolver('build'),
          filter: copyFilter
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ];

  /**
   * @type {import('webpack').Configuration['optimization']}
   */
  const optimization = {
    // sideEffects: true,
    minimize: true,
    concatenateModules: true,
    mergeDuplicateChunks: true,
    mangleExports: 'deterministic',
    minimizer: [
      new CssMinimizerPlugin({test: STYLE_FILE}),
      new TerserPlugin({
        test: SRC_FILE,
        minify: TerserPlugin.terserMinify,
        terserOptions: {
          mangle: true,
          compress: {passes: 2},
          output: {beautify: false}
        }
      })
    ]
  };

  return {
    devtool: 'source-map',
    output,
    module: modules,
    plugins,
    optimization
  };
};
