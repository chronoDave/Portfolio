/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Options
const optimization = {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        output: {
          comments: /@license/i
        },
        compress: {
          passes: 2
        }
      },
      extractComments: {
        filename: ({ filename }) => `${filename.split('.').slice(0, -1).join('.')}.license.txt`
      }
    })
  ],
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all'
      }
    }
  }
};

module.exports = [{
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: path.resolve(__dirname, 'src/client/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].bundle.js'
  },
  optimization,
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      include: path.resolve(__dirname, 'src/client')
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'dist/client'
    }], { verbose: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/index.html'),
      filename: 'index.html'
    })
  ]
}, {
  name: 'server',
  target: 'node',
  resolve: {
    extensions: ['.js', '.ts']
  },
  entry: path.resolve(__dirname, 'src/server/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name].bundle.js'
  },
  optimization,
  module: {
    rules: [{
      test: /\.ts?x$/,
      loader: 'ts-loader',
      include: path.resolve(__dirname, 'src/server')
    }]
  },
  plugins: [
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'dist/server'
    }], { verbose: true })
  ]
}];
