/**
 * Created by Min on 2017/8/19.
 */
const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    __DEV__ = (process.env.NODE_ENV || 'development') === 'development',
    moduleCSSLoader = {
        loader: 'css',
        options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]--[hash:base64:5]'
        }
    },
    postCSSLoader = {
        loader: 'postcss',
        options: {
            config: {
                path: path.join(__dirname, '../tools/postcss.config.js')
            }
        }
    };

module.exports = [
    {
        test: /\.(ts|tsx)$/,
        use: [
            'babel', 'ts'
        ],
        include: path.resolve('src'),
        exclude: /node_modules/
    }, {
        test: /\.(scss|sass)$/,
        use: __DEV__
            ? ['style', moduleCSSLoader, postCSSLoader, 'sass']
            : ExtractTextPlugin.extract({
                fallback: 'style',
                use: [moduleCSSLoader, postCSSLoader, 'sass']
            }),
        exclude: /node_modules/
    }, {
        test: /\.css$/,
        use: ['style', 'css']
    }
];
