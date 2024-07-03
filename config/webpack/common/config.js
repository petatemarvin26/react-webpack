const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {SRC, IMG, SVG, STYLE} = require('./constants');
const {assetOutputPath, resolver} = require('./utils');

/**
 * @param {boolean} isdev
 * @returns {object} rules set for babel-loader
 */
const babelLoader = (isdev) => {
  return {
    test: SRC,
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
  const rule = {test: IMG};

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
    test: SVG,
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
    test: STYLE,
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
