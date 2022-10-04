'use strict';
const path = require('path');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: "./src//js/script.js", // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path:path.resolve(__dirname, "dist/js"), // string (default)
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "total.js" ,
  },
  devtool: "source-map",
  watch:true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ ['@babel/preset-env' , {
              debug:true,
              corejs: 3.20,
              useBuiltIns:"usage"
              
            }]]
          }
        }
      }
    ]
  }
};