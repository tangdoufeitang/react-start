const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
// const CleanWebpackPlugin = require('clean-webpack-plugin');// 清空上次打包文件

const baseConfig = require('./webpack.config.base');

const prodConfig = {
    mode: 'production',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?minimize=true', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?minimize=true&modules&localIdentName=[local]-[hash:base64:5]',
                    'postcss-loader',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.(less|css)$/,
                    chunks: 'all',
                    enforce: true
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10,
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new WebpackBar({
            // color: '#F5A623',
            name: 'react project'
        })
    ]
}

module.exports = merge(baseConfig, prodConfig)