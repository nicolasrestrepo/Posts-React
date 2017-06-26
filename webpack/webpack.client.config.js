const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');

const config = {
  entry: './source/client.js',
  output: {
    filename: 'app.js',
    path: './built/statics',
   /* publicPath: process.env.NODE_ENV === 'production' */
  },
  module: {
    preloaders:[
      {
        test: /\.jsx?$/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2016', 'es2017', 'react', ],
          plugins: ['transform-es2015-modules-commonjs'],
          env: {
            production:{
                plugins: ['transform-regenerator', 'transform-runtime'],
                presets: ['es2015']
            },
            development:{
              plugins: ['transform-es2015-modules-commonjs'],
            }
          },
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules')
      }
    ]
  },
  target: 'web',
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.json']
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),

      }
    }), 
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('../built/statics/styles.css')
  ]
}
if(process.env.NODE_ENV === 'production'){
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.UglifyJsPlugin({
      compres:{
        warnings:false,
      },
      mangle:{
        except: ['$super', '$', 'exports', 'require'],
      },
    })
  )
}

module.exports = config;
