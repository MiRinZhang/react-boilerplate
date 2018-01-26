/**
 * Created by Min on 2017/8/17.
 */
const path = require('path'),
    pkg = require('../package.json'),
    HOST = '0.0.0.0',
    _PORT = process.argv[2] || 4040;

module.exports = {
    apps: {
        entry: {
            dev: [
                `webpack-dev-server/client?http://${HOST}:${_PORT}`, 'webpack/hot/only-dev-server', './src/index'
            ],
            prod: {
                app: './src/index',
                vendors: Object.keys(pkg.dependencies).filter(val => !val.startsWith('@'))
            }
        },
        output: {
            path: path.join(__dirname, '../dist'),
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].[chunkhash:6].chunk.js',
            sourceMapFilename: 'js/[name].bundle.map',
            publicPath: '/'
        },
        devtool: {
            dev: 'eval-cheap-module-source-map',
            prod: 'hidden-source-map'
        }
    },
    devServer: {
        host: HOST,
        port: _PORT
    },
    proxy: {}
};
