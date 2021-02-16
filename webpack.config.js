const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const plugins = [];
if (!devMode) {
    plugins.push(new MiniCssExtractPlugin({ filename: 'styles.css' }));
}
console.log(process.env.NODE_ENV);

module.exports = {
    entry: '/client/src/index.js',
    output: {
        path: path.join(__dirname, './client/public/dist'),
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
            use: [ //use allows us to use an array of loaders
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
                // 'style-loader',
                {
                    loader: 'css-loader', 
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ] 
        }]
    },
    plugins,
    devtool: devMode ? 'inline-source-map' : 'source-map',
    mode: devMode ? 'development' : 'production',
    // devtool: 'inline-source-map',
    // mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './client/public'),
        //publicPath is to specify where the bundled assets should be.
        publicPath: '/dist/',
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