const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/control-panel.html',
      filename: 'control-panel.html',
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/telegram-web-app.html',
      filename: 'telegram-web-app.html',
      cache: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'src'),
        staticOptions: {},
        serveIndex: true,
      },
    ],
    compress: true,
    port: 9000,
    hot: true,
    liveReload: true,
    watchFiles: ['src/index.html', 'src/control-panel.html'],
  },
};
