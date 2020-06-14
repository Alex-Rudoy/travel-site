const currentTask = process.env.npm_lifecycle_event;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");
const postcssPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
];

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./app/assets/images", "./docs/assets/images");
    });
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    "css-loader?url=false",
    {
      loader: "postcss-loader",
      options: {
        plugins: postcssPlugins,
      },
    },
  ],
};

let pages = fse
  .readdirSync("./app")
  .filter(function (file) {
    return file.endsWith(".html");
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({ filename: page, template: `./app/${page}` });
  });

//[new HtmlWebpackPlugin({ filename: "index.html", template: "./app/index.html" })],

let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: pages,
  module: {
    rules: [
      cssConfig,
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },
};

//! dev

if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader");

  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  };

  config.devServer = {
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    host: "0.0.0.0",
  };

  config.mode = "development";
}

//! build

if (currentTask == "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);

  postcssPlugins.push(require("cssnano"));

  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "docs"),
  };

  config.mode = "production";

  config.optimization = {
    splitChunks: {
      chunks: "all",
    },
  };

  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }),
    new RunAfterCompile()
  );
}

module.exports = config;
