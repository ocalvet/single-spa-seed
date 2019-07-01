const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: `./src/root.app.js`,
  output: {
    filename: 'main.js',
    libraryTarget: 'system',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'production',
  module: {
    rules: [{ parser: { system: false } }]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyPlugin([{ from: path.resolve(__dirname, 'src/index.html') }]),
    new CleanWebpackPlugin()
  ]
};
