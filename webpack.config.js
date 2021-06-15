const path = require('path')
//This creates a new html file per compile.
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*  MiniCssExtractPlugin This plugin creates a CSS file per JS file which requires CSS. It'll allow the build to be 
    smaller sized. Without it, all the styles are in bundle.js and all the styles don't get loaded 
    into the browser until after the javascript runs, which takes some time. */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Moment is too big, so get rid of some things.
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

//Store whether we're in dev or prod for utility.
const devMode = process.env.NODE_ENV !== 'production';

//Tell us what mode it is put in so we can confirm.
console.log("Webpack is in:", process.env.NODE_ENV, "mode");

//Webpack Config
module.exports = {
    entry: {
        index: '/client/src/index.js',
    },
    output: {
        path: devMode ? path.join(__dirname, './public') : path.join(__dirname, './public/dist'),
        filename: '[name].bundle.js',
        clean: true //this will get rid of files that already exist in the dist folder
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './client/src/index.html' }),
        new MiniCssExtractPlugin({ filename: 'styles.css' }),
        new MomentLocalesPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader', //loader runs a single loader
                options: {
                    //@babel/preset-env needs @babel/plugin-transform-runtime or else it's too big. If we get rid of one, we might as well get rid of the other one.
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            exclude: /node_modules/
        }, { 
            test: /\.s?css$/,
            use: [MiniCssExtractPlugin.loader, //use allows us to use an array of loaders
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
        }, {
            test: /\.(png|jpg|jpeg|bmp|gif)$/,
            loader: 'file-loader'
        }]
    },
    optimization: {
        minimize: devMode ? false : true, //!=='production'
        splitChunks: devMode ? {} : {
            cacheGroups: {
                react_redux: {
                    test: (/[\\/]node_modules[\\/](history|hoist-non-react-statics|mini-create-react-context|prop-types|react|react-dom|react-modal|react-redux|react-redux-loading-bar|react-router-dom|react-transition-group|redux|redux-logger|scheduler)/),
                    name: 'react-redux',
                    chunks: 'all'
                }
            }
        }
    },
    devtool: devMode ? 'inline-source-map' : 'source-map', //!=='production'
    mode: devMode ? 'development' : 'production', //!=='production'
    devServer: { //webpack-dev-server is a required package module for this.
        contentBase: path.join(__dirname, './public'),
        //publicPath is to specify where the bundled assets should be.
        publicPath: devMode ? '/' : '/dist/', //!=='production'
        //historyApiFallback says that we're going to handle all of our routing through React clientside.
        historyApiFallback: true, //This will return index.html for all 404 routes.
        port: 3000,
        open: true, //open browser
        liveReload: true //reload browser tab on change
    }
}