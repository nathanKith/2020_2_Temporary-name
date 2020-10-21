let ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require("babel-polyfill");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
        filename: 'bundle.css',
        }),

        new HtmlWebpackPlugin(),

        new CopyPlugin({
            patterns: [
                {
                    context: 'public/img/',
                    from: '*',
                    to: 'img/',
                },
            ],
        }),
    ],
    entry: ['babel-polyfill','/public/main.js'],
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules:  [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `/img/[name].[ext]`,
                        }
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: {
                    loader:'svg-url-loader',
                    // options: {
                    //     name: `/img/[name].[ext]`,
                    // }
                }
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: `/fonts/[name].[ext]`,
                    }
                }
            },
        ]
    },
};