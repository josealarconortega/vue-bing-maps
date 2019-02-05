var path = require('path');
var package = require('./package.json');
var webpack = require('webpack');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const bannerOptions = {
    entryOnly: true,
    banner: 'Vue Bing Maps v' + package.version + ', hash:[hash].  Created by ' + package.author + '. License ' + package.license
};

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    plugins: [
        new StatsWriterPlugin({
            filename: '../stats.json',
            fields: null
        }),
        new VueLoaderPlugin(),
        new webpack.BannerPlugin(bannerOptions)
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist',
        library: 'VueBingMaps',
        filename: 'vue-bing-maps-' + package.version + '.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, './src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: false,
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true'
                }
            }
        ]
    }
}