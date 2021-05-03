const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/*  MiniCssExtractPlugin This plugin creates a CSS file per JS file which requires CSS. It'll allow the build to be 
    smaller sized. Without it, all the styles are in bundle.js and all the styles don't get loaded 
    into the browser until after the javascript runs, which takes some time. */
//CssMinimizerPlugin will optimize and minify the CSS.
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
console.log("Webpack is in:", process.env.NODE_ENV, "mode");
// const devMode = process.env.NODE_ENV === 'development';
// const plugins = [];
// if (!devMode) {
//     plugins.push(new MiniCssExtractPlugin({ filename: 'styles.css' }));
// }

// console.log(plugins);

module.exports = {
    entry: '/client/src/index.js',
    output: {
        path: devMode ? path.join(__dirname, './client/public') : path.join(__dirname, './client/public/dist'),
        filename: 'bundle.js'
    },
    plugins: devMode ? [] : [
        new MiniCssExtractPlugin({ filename: 'styles.css' }), 
        new MomentLocalesPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader', //loader runs a single loader
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            exclude: /node_modules/
        }, { 
            test: /\.s?css$/,
            use: [ //use allows us to use an array of loaders
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //!=='production'
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
    optimization: {
        minimize: devMode ? false : true, //!=='production'
        minimizer: devMode ? [] : [`...`, new CssMinimizerPlugin()] //!=='production'
    },
    devtool: devMode ? 'inline-source-map' : 'source-map', //!=='production'
    mode: devMode ? 'development' : 'production', //!=='production'
    devServer: {
        contentBase: path.join(__dirname, './client/public'),
        //publicPath is to specify where the bundled assets should be.
        publicPath: devMode ? '/' : '/dist/', //!=='production'
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