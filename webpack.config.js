const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  watch: true,
  mode: 'development', // production - development
  entry: path.join(__dirname, 'assets', 'webpack.js'),
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'js/index.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}