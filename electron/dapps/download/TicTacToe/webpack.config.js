var path = require('path');
var webpack = require('webpack');
var CircularDependencyPlugin = require('circular-dependency-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: __dirname + '/build',
    filename: 'dapp.js',
  },
  externals: {
    'dapp-io': 'DappIO'
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }, {
            loader: 'sass-loader'
          }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],
  stats: {
    colors: true
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devtool: 'source-map',
};
