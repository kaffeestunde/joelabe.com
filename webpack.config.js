const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: {
      index: './src/js/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },


  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              include: path.resolve(__dirname, 'src/js'),
              exclude: path.resolve(__dirname, 'node_modules'),
              options: { 
                plugins: ['transform-runtime', 'transform-class-properties'],
                presets: ['es2015']  
              }

          },
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          }
      ]
  },

  plugins: [
      new UglifyJSPlugin({
          sourceMap: true
      })
  ]
};