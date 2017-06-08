/* eslint-env node*/
const path = require('path');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader'
      }
    ]
  }
};
