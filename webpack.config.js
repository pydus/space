const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/space-game/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]},
  devServer: {
    contentBase: './public'
  }
}
