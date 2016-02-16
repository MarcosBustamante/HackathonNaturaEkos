var webpack = require('webpack');

module.exports = {
  entry: './src/static/js/controller/mainController.jsx',
  output: {
    path: './src/static/js',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
