const path = require("path");

var config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./src"),
    filename: 'bundle.js',
    publicPath: './src'
  },
  devServer: {
    inline: true,
    port: 8080,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ],
  }

}
module.exports = config;
