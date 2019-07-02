const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    local: './src/index.local.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 8082
  }
};
