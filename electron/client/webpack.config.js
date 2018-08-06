var path = require('path');
var webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    // target: 'electron-renderer',
    entry: [
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr&reload=true`,
        './index.js'
    ],
    output: {
        publicPath: `http://localhost:${port}/build/`
    },
    // entry: './index.js',
    // output: {
    //     path: path.resolve(__dirname, 'build'),
    //     filename: 'app.bundle.js'
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
    ]
    // watch: true
};
