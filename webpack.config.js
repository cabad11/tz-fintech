const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new Dotenv()
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.less'],
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules'
        ]
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, './src')],
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader',
            include: /assets/
        }, {
            test: /.(sa|sc|c)ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
            ]
        }]
    },

    devServer: {
        open: true,
        host: 'localhost'
    }
};