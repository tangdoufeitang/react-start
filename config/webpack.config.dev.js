const webpack = require('webpack');
const merge = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const baseConfig = require('./webpack.config.base')
const WebpackBar = require('webpackbar');

const devConfig = {
    mode: 'development',
    entry: [
        'react-hot-loader/patch', // activate HMR for React
        'webpack-dev-server/client?http://localhost:3000',// bundle the client for webpack-dev-server and connect to the provided endpoint
        'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
        './src/index.tsx' // the entry point of our app
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    { loader: 'css-loader', options: { importLoaders: 1 } }, 
                    'postcss-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', 
                    'css-loader?modules&localIdentName=[local]-[hash:base64:5]',
                    'postcss-loader',
                    'less-loader'
                ],
                exclude: /node_modules/,
            },
            
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new WebpackBar({
            color: '#F5A623',
            name: 'react project'
        })
    ],
    devServer: {
        hot: true, // enable HMR on the server
        port: 3000,
        stats: "errors-only",
    },
    devtool: 'eval-source-map',
} 

module.exports = merge(baseConfig, devConfig)

