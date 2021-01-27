const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        { 
            use: ['style-loader', 'css-loader', 'sass-loader'],
            test: /\.s?css$/
        }
        ]
    },
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        proxy: {
            context: () => true,
            target: 'http://localhost:3001'
        },
        open: true,
        liveReload: true
    }
}