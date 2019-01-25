const path = require('path');
const webpack = require('webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
    library: 'ArrayIO',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      { test: /\.ts|tsx$/, loader: 'awesome-typescript-loader' },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
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
    new FileManagerPlugin({
      onEnd: {
        copy: [
          { source: './build/app.bundle.js', destination: '../../main/dist/dapps/lib/build/app.bundle.js' },
        ],
      }
    })
  ],
  watch: false
};
