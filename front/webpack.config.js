const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");


let config = {
  entry: {
    main: "./src/index.js",
    components: ["@babel/polyfill", "./src/components/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./[name].bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    },
    {
      test: /\.scss$/,
      use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader', 'postcss-loader'],
      }))
    },
   {
     test: /\.(png|svg|jpg|gif)$/,
     use: [
       'file-loader',
     ],
   },
   {
     test: /\.(woff|woff2|eot|ttf|otf)$/,
     use: [
       'file-loader',
     ],
   }]
  },
  plugins: [
    new ExtractTextWebpackPlugin("styles.css"),
    new UglifyJSPlugin(),
    new DashboardPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: "eval-source-map"
}

module.exports = config;
