const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {babelLoader, imageLoader, svgLoader, styleLoader} = require('./common');

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
   * @type {import('webpack').Configuration['module']}
   */
  const modules = {
    rules: [
      babelLoader(true),
      imageLoader(true),
      svgLoader(true),
      styleLoader(true)
    ]
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [new ReactRefreshWebpackPlugin()];

  return {
    devtool: 'eval-source-map',
    devServer,
    module: modules,
    plugins,
    stats: 'minimal',
    infrastructureLogging: {
      level: 'error'
    }
  };
};
