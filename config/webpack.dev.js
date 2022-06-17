const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getStyleLoader = (pre) => {
  return [
    "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
}

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
  },
  module: {
    rules:  [
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader("sass-loader"),
      },
      {
        test: /\.(jpe?g|png|svg|gif|webp)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|ttf)/,
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    })
  ],
  mode: "development",
  devtool: "cheap-module-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    }
  },
  resolve: {
    extensions: [".jsx",".js",".json"],
  },
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    hot: true
  }
}