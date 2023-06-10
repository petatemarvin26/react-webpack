const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {STYLE_REGEX, MAX_SIZE, FILE_REGEX} = require('./constants');
const {assetFilter, resolver, assetOutputPath} = require('./utils');

module.exports = (process_env) => {
  const {PUBLIC_URL, ENV} = process_env;

  const output = {
    filename: 'static/js/[contenthash:10].[name].js',
    path: resolver('build'),
    clean: true
  };
  const module = {
    rules: [
      {
        test: STYLE_REGEX,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: '/node_modules/'
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
    new InterpolateHtmlPlugin({PUBLIC_URL, ENV}),
    new HtmlWebpackPlugin({
      template: resolver('public/index.html'),
      publicPath: PUBLIC_URL
    })
  ];
  const performance = {
    maxEntrypointSize: MAX_SIZE,
    maxAssetSize: MAX_SIZE,
    assetFilter
  };

  return {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-warnings',
    output,
    module,
    plugins,
    performance
  };
};
