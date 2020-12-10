/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require("babel-polyfill");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
        filename: 'bundle.css',
        }),

        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),

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
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
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
                test: /\.png$/,
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
                    options: {
                        name: `/img/[name].[ext]`,
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: `./fonts/[name].[ext]`,
                    }
                }
            },
            {
                test: /\.hbs/,
                use: {
                    loader: 'handlebars-loader'
                },
                exclude: /(node_modules)/
            }
        ]
    },
};