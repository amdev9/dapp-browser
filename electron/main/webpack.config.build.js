const path = require('path');
const nodeExternals = require("webpack-node-externals");
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin');

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
      console: path.resolve(__dirname, 'helpers/utils/log'),
    }
  },
  
  module: {
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    new DropConsoleWebpackPlugin({
      drop_log    : true,
      drop_info   : true,
      drop_warn   : false,
      drop_error  : false,
      exclude     : [],
    }),
  ],
  watch: false,
  node: {
    __dirname: false,
    __filename: false
  }
};
