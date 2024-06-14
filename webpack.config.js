const path = require("path");
const Dotenv = require("dotenv");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

Dotenv.config();

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[fullhash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    clean: true,
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "public/assets/"),
    },
  },
  performance: {
    maxEntrypointSize: 8388608,
    maxAssetSize: 8388608,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/",
          globOptions: {
            ignore: ["**.html", "**.ico"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devServer: {
    host: "localhost",
    port: process.env.PORT,
    historyApiFallback: true,
    open: true,
  },
  stats: "errors-warnings",
};
