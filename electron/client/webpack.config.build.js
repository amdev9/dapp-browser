var path = require('path');
var webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
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

};
