const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  favicon: './src/static/favicon.png',
})
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    htmlWebpackPlugin,
    new CopyWebpackPlugin([
      {
        from: './src/static/robots.txt',
        to: './robots.txt',
      },
    ]),
    new CompressionPlugin({
      test: /\.js/,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
}
