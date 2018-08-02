var webpack = require('webpack')
var path = require('path')

// variables
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'
var sourcePath = path.join(__dirname, './src')
var outPath = path.join(__dirname, './dist')

var TypedocWebpackPlugin = require('typedoc-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var WebpackCleanupPlugin = require('webpack-cleanup-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: sourcePath,
  entry: {
    app: './main.tsx'
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    alias: { app: path.resolve(__dirname, 'src/app/') },
    mainFields: ['module', 'browser', 'main'],
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|svg|otf)$/, use: 'url-loader?limit=100000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' },

      {
        test: /\.tsx?$/,
        use: [
          // For work with react-hotreloading
          isProduction && {
            loader: 'babel-loader',
            options: { plugins: ['react-hot-loader/babel'] }
          },
          'ts-loader'
        ].filter(Boolean)
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[local]',
              sourceMap: !isProduction,
              importLoaders: 1,
              modules: true,
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[local]',
              sourceMap: !isProduction,
              importLoaders: 1,
              modules: true,
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    // new TypedocWebpackPlugin({}),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
}
