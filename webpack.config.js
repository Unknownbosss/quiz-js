const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.min.js'
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',

            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false
            }),
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
}