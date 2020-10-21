let ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require("babel-polyfill");
const webpack = require('webpack');

module.exports = {
    plugins: [new MiniCssExtractPlugin()],
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
            }
        ]
    },
};