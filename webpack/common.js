const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

let dotenv = require("dotenv").config({ path: "./.env" });
dotenv.parsed["VERSION"] = process.env.npm_package_version;

module.exports = (webpack_env) => {
  const isDevelopment = webpack_env.dev;
  const isProduction = webpack_env.prod;

  const ROOT_DIR = path.resolve(__dirname, "..");

  console.log(webpack_env);

  const isSvg = (file) => /\.svg$/i.test(file);
  const isImage = (file) => /\.(png|jpg)$/i.test(file);

  let config = {
    mode: "production",
    entry: ["src/index.tsx"],
    output: {
      filename: "static/js/[name].bundle.js",
      path: `${ROOT_DIR}/build`,
      clean: true,
    },
    devServer: {
      open: true,
      host: "localhost",
      compress: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          use: ["babel-loader", "ts-loader"],
          exclude: "/node_modules/",
        },
        {
          test: /\.(css)$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
          exclude: "/node_modules/",
        },
        {
          test: /\.(svg)$/i,
          use: [{ loader: "@svgr/webpack" }],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
          loader: "file-loader",
          exclude: "/node_modules/",
          options: {
            name: (resource) => {
              if (isSvg(resource)) {
                return `[name].[ext]`;
              }
              return `[name].[ext]`;
            },
            outputPath: (url, resource) => {
              if (isSvg(resource)) {
                return `static/media/svg/${url}`;
              }
              if (isImage(resource)) {
                return `static/media/images/${url}`;
              }
              return `static/media/others/${url}`;
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed),
      }),
      new HtmlWebpackPlugin({
        template: `${ROOT_DIR}/public/index.html`,
      }),
      new MiniCssExtractPlugin({
        filename: `static/css/[hash].styles.css`,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: `${ROOT_DIR}/public/index.css`, to: `${ROOT_DIR}/build` },
          { from: `${ROOT_DIR}/public/manifest.json`, to: `${ROOT_DIR}/build` },
        ],
      }),
    ],
    resolve: {
      alias: {
        public: `${ROOT_DIR}/public`,
        src: `${ROOT_DIR}/src`,
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".svg"],
      preferRelative: true,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      minimizer: [new CssMinimizerPlugin()],
    },
    performance: {
      maxEntrypointSize: 600000,
      maxAssetSize: 600000,
    },
  };

  return config;
};
