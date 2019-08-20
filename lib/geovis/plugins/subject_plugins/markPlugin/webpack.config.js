const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        './js/app.js',
    ],
    output: {
        path: path.join(__dirname, './build/'),
        //path: __dirname + '/doc/assets/res/',
        filename: 'PlotPanel.js'
    },
    module: {
        loaders: [
            {test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style!css?module&localIndentName=[hash:base64:5]&-url'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {
                test: /\.js|jsx$/,
                loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                include: path.join(__dirname, './js/')
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', 'jsx', '.json']
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};
