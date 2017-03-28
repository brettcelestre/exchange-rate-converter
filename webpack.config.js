let path = require('path'),
    webpack = require('webpack'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'client')

module.exports = {
  context: __dirname + '/client/app/',
  entry: './app.module.js',
  watch: true,
  output: {
    path: buildPath,
    filename: 'bundle.js',
    exclude: /(node_modules|bower_components)/,
    // loader: "eslint-loader",
    loader: "babel-loader",
    publicPath: '/build/'
  },
  module: {
    loaders: []
  }
};
