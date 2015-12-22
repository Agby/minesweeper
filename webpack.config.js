//webpack.config.js是管理webpack這個整合工具的設定檔
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: [
  //      'webpack/hot/dev-server',
        path.resolve(__dirname, 'resource/main.js')//從這邊開始
    ],
    output: {
        path: path.resolve(__dirname, 'build/assets/js/'),
        publicPath: '/assets/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    externals: {
    }
};

module.exports = config;