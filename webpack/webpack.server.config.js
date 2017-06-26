const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');

const server = {
  entry: './source/server.js',
  output: {
    filename: 'index.js',
    path: './built/server',
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
          presets: ['latest-minimal', 'react'],
          env: {
            production: {
              plugins:['transform-regenerator', 'transform-runtime'],
              presets: ['es2015']
            },
            developmen:{
              presets: ['latest-minimal']
            },
          }
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules')
      }
    ]
  },
  target: 'node',
  plugins: [ 
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),

      }
    }), 
    new webpack.optimize.OccurrenceOrderPlugin(true),
   new ExtractTextPlugin('../statics/styles.css')
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

module.exports = server;