const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {SRC_FILE, IMG_FILE, SVG_FILE, STYLE_FILE} = require('./constants');
const {assetOutputPath, resolver} = require('./utils');

/**
 * @param {boolean} isdev
 * @returns {object} rules set for babel-loader
 */
const babelLoader = (isdev) => {
  return {
    test: SRC_FILE,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      configFile: resolver('config/.babelrc'),
      plugins: isdev ? [require.resolve('react-refresh/babel')] : []
    }
  };
};

/**
 * @param {boolean} isdev
 * @returns {object} rules set for assets
 */
const imageLoader = (isdev) => {
  const rule = {test: IMG_FILE};

  if (isdev) {
    rule.type = 'asset/resource';
    rule.generator = {
      filename: '[name][ext]'
    };
    return rule;
  }

  rule.loader = 'file-loader';
  rule.options = {
    name: '[name].[ext]',
    esModule: false,
    outputPath: assetOutputPath
  };
  return rule;
};

/**
 * @param {boolean} isdev
 * @returns {object} rule set for svg file
 */
const svgLoader = (isdev) => {
  const rule = {
    test: SVG_FILE,
    use: ['@svgr/webpack']
  };

  if (isdev) {
    rule.use.push('file-loader');
    return rule;
  }

  rule.use.push({
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      emitFile: false
    }
  });
  return rule;
};

/**
 * @param {boolean} isdev
 * @return {object} rule set for stylesheets
 */
const styleLoader = (isdev) => {
  return {
    test: STYLE_FILE,
    use: [
      isdev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            namedExport: false,
            exportLocalsConvention: (n) => n,
            localIdentName: isdev ? '[hash:5]_[local]' : '[hash:10]'
          }
        }
      }
    ]
  };
};

module.exports = {
  babelLoader,
  imageLoader,
  svgLoader,
  styleLoader
};
