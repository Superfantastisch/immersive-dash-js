const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: './public/'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scripts')
  }
};