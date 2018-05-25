const path = require('path');

module.exports = {
  entry: './client/app.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve('client', 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.js'] 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /.js/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }
    ]
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // }
}