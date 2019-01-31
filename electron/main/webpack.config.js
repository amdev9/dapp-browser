const nodeExternals = require("webpack-node-externals");
const CircularDependencyPlugin = require('circular-dependency-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = {
  mode: 'development',
  target: 'electron-main',
  externals: [
    nodeExternals(),
    'require(\'sqlite3\')',
    'require(\'typeorm\')',
    'node_helper'
  ],
  entry: './main.ts',
  output: {
    filename: 'main.js',
    path: __dirname + '/dist'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ClientApp: path.resolve(__dirname, '../client'),
      DappApp: path.resolve(__dirname, '../dapps/lib'),
      PermissionApp: path.resolve(__dirname, '../permissionManager'),
      logger: path.resolve(__dirname, './helpers/utils/logger.ts'),
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      logger: path.resolve(__dirname, './helpers/utils/logger.ts')
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
  watch: true,
  node: {
    __dirname: false,
    __filename: false
  }
};
