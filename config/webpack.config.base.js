const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    context: path.resolve(__dirname, '..'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@reducer':  '/src/reducer',
            '@store':  './src/store'
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [tsImportPluginFactory({ })]
                            }),
                            compilerOptions: {
                                module: 'esnext'
                            },
                        },
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                  'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                  'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/,
                loader: "file-loader?name=/fonts/[name].[ext]"
            },
        ]
    },
    plugins: [
        new webpack.WatchIgnorePlugin([
            /scss\.d\.ts$/,
            /css\/.d\.ts$/,
            /less\/.d\.ts$/
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.ejs'),
            title: 'react project',
            chunksSortMode: 'dependency'
        }),
    ]
}