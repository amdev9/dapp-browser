const path = require('path');
const webpack = require('webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./index.tsx'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      MainApp: path.resolve(__dirname, '../main'),
      DappApp: path.resolve(__dirname, '../dapps/lib'),
      ClientApp: path.resolve(__dirname, '../client'),
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
  stats: {
    colors: true
  },
  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin(),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          { source: 'dist/app.bundle.js', destination: '../main/dist/permissionManager/dist/app.bundle.js' },
          { source: 'index.html', destination: '../main/dist/permissionManager/index.html' },
        ],
      }
    })
  ],
  watch: false
};
