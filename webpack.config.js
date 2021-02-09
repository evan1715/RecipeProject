const path = require('path')

module.exports = {
    entry: '/client/src/index.js',
    output: {
        path: path.join(__dirname, './client/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader', //loader runs a single loader
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            exclude: /node_modules/
        }, { 
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'] //use allows us to use an array of loaders
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './client/public'),
        //historyApiFallback says that we're going to handle all of our routing through React clientside.
        historyApiFallback: true, //This will return index.html for all 404 routes.
        port: 3000,
        // proxy: {
        //     target: 'http://localhost:3001',
        //     context: () => true
        // },
        open: true, //open browser
        liveReload: true //reload browser tab on change
    }
}