var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  mode: 'development',
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
  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
        debug: true
    }),
  ],
  watch: true
};
