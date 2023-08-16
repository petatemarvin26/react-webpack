const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const {SRC_FILE, SVG_FILE, IMG_FILE, STYLE_FILE} = require('./constants');
const {resolver} = require('./utils');

/**
 * @param {object} env
 * @return {import('webpack').Configuration}
 */
module.exports = (env) => {
  /**
   * @type {import('webpack').WebpackOptionsNormalized['devServer']}
   */
  const devServer = {
    port: env.PORT,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      logging: 'error'
    }
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new HtmlWebpackPlugin({
      PUBLIC_URL: '.',
      template: resolver('public/index.html')
    }),
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin({
      context: resolver('src'),
      overrideConfigFile: resolver('config/.eslintrc'),
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    })
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
            configFile: resolver('config/.babelrc'),
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      },
      {
        test: IMG_FILE,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }
      },
      {
        test: SVG_FILE,
        use: ['@svgr/webpack', 'file-loader']
      },
      {
        test: STYLE_FILE,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[local]'
              }
            }
          }
        ]
      }
    ]
  };

  return {
    devtool: 'eval-source-map',
    devServer,
    plugins,
    module: modules,
    stats: 'minimal',
    infrastructureLogging: {
      level: 'error'
    }
  };
};
