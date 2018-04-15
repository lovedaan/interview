const path = require('path');

const webpackConfig = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:/(node_modules|bower_components)/
            }
        ]
    }
};

module.exports = webpackConfig;