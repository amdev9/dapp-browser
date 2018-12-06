var path = require('path');
var webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    // target: 'electron-renderer',
    entry: {
        app: [
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr&reload=true`,
        './index.tsx'
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        publicPath: `http://localhost:${port}/build/`
    },
    // entry: './index.tsx',
    // output: {
    //     path: path.resolve(__dirname, 'build'),
    //     filename: 'app.bundle.js'
    // },
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
    stats: {
        colors: true
    },
   
    plugins: [
        // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
    ]
    // watch: true
};
