const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    'index': './src/index.js',
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|eot|woff|woff2)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      '__APIURL__': process.env.BACKEND_URL ? JSON.stringify(process.env.BACKEND_URL) : JSON.stringify('http://localhost:5000'),
    }),
  ],
};
