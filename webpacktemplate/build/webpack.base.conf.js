const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/'
}

const PAGES = [];

const PAGES_DIR = `${PATHS.src}/pages`;
fs
  .readdirSync(PAGES_DIR)
  .filter((file) => {
    return file.indexOf('main') !== 0;
  })
  .forEach((file) => {
    PAGES.push(file.split('/', 2));
  });

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      exclude: /(img)/,
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/fonts',
        publicPath: '../assets/fonts/'
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'file-loader',
      exclude: /(fonts)/,
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: './postcss.config.js' } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }				
      ]			
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].css`
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: '' }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
      }),
    
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}/${page}.pug`,
      filename: `${page}.html`
    }))
  ],
}