const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
  return {
    optimization: {
      minimize: false
    },
    output: {
      filename: "main.[hash].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss/,
          loaders: ['style-loader', 'css-loader?modules', 'sass-loader'],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.svg/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new CleanWebpackPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: false,
      port: env && env.port ? env.port : 9000
    }
  }
};