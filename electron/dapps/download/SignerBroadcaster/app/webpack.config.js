var path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.ts',
  output: {
    path: __dirname + '/build',
    filename: 'dapp.js',
  },
  externals: {
    'array-io': 'ArrayIO'
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        loader:'style-loader!css-loader',
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devtool: 'source-map',
};
