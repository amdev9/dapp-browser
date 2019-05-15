const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.ts',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js',
    library: 'DappIO',
    libraryTarget: 'umd',
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
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      MainApp: path.resolve(__dirname, '../../main'),
      PermissionApp: path.resolve(__dirname, '../../permissionManager'),
      ClientApp: path.resolve(__dirname, '../../client'),
      logger: path.resolve(__dirname, './redux/utils/logger.ts'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      logger: path.resolve(__dirname, './redux/utils/logger.ts')
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          { source: './build/app.bundle.js', destination: '../../main/dist/dapps/lib/build/app.bundle.js' },
        ],
      }
    })
  ],
  devtool: 'source-map',
};
