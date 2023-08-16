const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {resolver, copyFilter, assetOutputPath} = require('./utils');
const {SRC_FILE, STYLE_FILE, IMG_FILE, SVG_FILE} = require('./constants');

/**
 * @param {object} env
 * @return {import('webpack').Configuration}
 */
module.exports = (env) => {
  /**
   * @type {import('webpack').Configuration['output']}
   */
  const output = {
    filename: `static/js/index.[contenthash:10].js`,
    path: resolver('build')
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new HtmlWebpackPlugin({
      PUBLIC_URL: env.PUBLIC_URL,
      publicPath: env.PUBLIC_URL,
      template: resolver('public/index.html')
    }),
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
   * @type {import('webpack').Configuration['module']}
   */
  const modules = {
    rules: [
      {
        test: SRC_FILE,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: resolver('config/.babelrc')
          }
        }
      },
      {
        test: IMG_FILE,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: assetOutputPath
          }
        }
      },
      {
        test: SVG_FILE,
        use: [
          '@svgr/webpack',
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: false
            }
          }
        ]
      },
      {
        test: STYLE_FILE,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[hash:10]'
              }
            }
          }
        ]
      }
    ]
  };

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
    plugins,
    module: modules,
    optimization
  };
};
