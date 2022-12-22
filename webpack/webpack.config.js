const webpack = require('webpack');
const {merge} = require('webpack-merge');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {
  ROOT_DIR,
  STYLE_REGEX,
  SVG_REGEX,
  FILE_REGEX,
  JS_REGEX
} = require('./constants');
const {
  isDevelopment,
  assetOutputPath,
  getVersion,
  getPublicUrl,
  getNodeEnv
} = require('./utils');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const {default: TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (webpack_env) => {
  const {env, variant} = webpack_env;

  let dotenv = require('dotenv').config({path: `./.env.${variant}`});
  dotenv.parsed['VERSION'] = getVersion();
  dotenv.parsed['PUBLIC_URL'] = getPublicUrl(dotenv);
  dotenv.parsed['NODE_ENV'] = getNodeEnv(dotenv);

  const entry = {
    index: `${ROOT_DIR}/src/index.tsx`
  };
  const output = {
    filename: 'static/js/[contenthash:10].bundle.js',
    publicPath: `${dotenv.parsed['PUBLIC_URL']}/`,
    path: `${ROOT_DIR}/build`,
    clean: true
  };
  const module = {
    rules: [
      {
        test: SVG_REGEX,
        loader: '@svgr/webpack'
      },
      {
        test: FILE_REGEX,
        loader: 'file-loader',
        exclude: '/node_modules/',
        options: {
          name: '[name].[ext]',
          outputPath: assetOutputPath
        }
      }
    ]
  };
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${ROOT_DIR}/public/index.html`,
      publicPath: dotenv.parsed['PUBLIC_URL']
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: dotenv.parsed['PUBLIC_URL'],
      NODE_ENV: dotenv.parsed['NODE_ENV']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${ROOT_DIR}/public`,
          to: `${ROOT_DIR}/build`,
          filter: (filepath) => !filepath.endsWith('.html')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: `static/css/[contenthash:10].styles.css`
    }),
    new ESLintWebpackPlugin({
      resolvePluginsRelativeTo: `${ROOT_DIR}/src`,
      context: `${ROOT_DIR}/src`,
      overrideConfigFile: `${ROOT_DIR}/.eslintrc.js`,
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
        include: JS_REGEX,
        terserOptions: {
          mangle: true,
          output: {beautify: false}
        }
      })
    ]
  };

  let config = {
    entry,
    output,
    module,
    plugins,
    resolve,
    optimization
  };

  if (isDevelopment(env)) {
    return merge(config, devConfig);
  }
  return merge(config, prodConfig);
};
