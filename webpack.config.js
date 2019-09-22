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
        test: /\.js?x$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|eot|woff|woff2)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
