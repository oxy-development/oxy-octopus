var webpack = require('webpack');

const env = process.env;


function getApp() {

    const app = ['./javascripts/entry.js'];
    if ('development' === env.OXY_TARGET) {
        app.push('webpack/hot/dev-server');
    }

    return app;
}


function getPlugins() {

    const plugins = [];
    if ('development' === env.OXY_TARGET) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
}


module.exports = {

    entry: {
        //app: ['webpack/hot/dev-server', './javascripts/entry.js'],
        app: getApp()
    },

    output: {
        path: './public/built',
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/built/'
    },

    devServer: {
        contentBase: './public',
        publicPath: 'http://localhost:8080/built/'
    },

    module: {

        loaders: [
            { test: /\.js$/,  loader: 'babel-loader', exclude:  /node_modules/, query: { presets: ['es2015', 'react'] } },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less/, loader: 'style-loader!css-loader!less-loader' }
        ],

        plugins: getPlugins()
    }
};