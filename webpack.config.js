let ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [new MiniCssExtractPlugin()],
    entry: '/public/main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules:  [
            {
                test: /\.js/,
                exclude: /node_modules|bower_components/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
};