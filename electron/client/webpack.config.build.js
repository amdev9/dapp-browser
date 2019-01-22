const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      MainApp: path.resolve(__dirname, '../main'),
      DappApp: path.resolve(__dirname, '../dapps/lib'),
      PermissionApp: path.resolve(__dirname, '../permissionManager'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { test: /\.(png|svg|otf|ttf)$/, use: 'url-loader?limit=100000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[local]',
              sourceMap: true,
              importLoaders: 1,
              modules: true,
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[local]',
              sourceMap: true,
              importLoaders: 1,
              modules: true,
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      }
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
    new FileManagerPlugin({
      onEnd: {
        copy: [
          { source: 'dist/*', destination: '../main/dist/client' },
          { source: 'index__build.html', destination: '../main/dist/client/index.html' },
        ],
      }
    })
  ],
  stats: {
    colors: true
  },

};
