let path = require('path'),
    webpack = require('webpack'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'client')

module.exports = {
  context: __dirname + '/client/app/',
  entry: './app.module.js',
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: []
  }
};
