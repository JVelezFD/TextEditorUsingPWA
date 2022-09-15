const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      header: './src/js/header.js',
      editor: './src/js/editor.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //workers

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //generate html file with bundle

      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      //manifest 

      new WebpackPwaManifest ({
        fingerprints: false, 
        inject: true, 
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Take notes in the browser',
        background_color: '#302c2c',
        theme_color: '#f0dcdf',
        start_url: '/',
        publicPath: '/',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 256, 384, 512],
          destination: path.join('assets', 'icons'),
      }],

      }),
      
    ],

    module: {
      //css loading
      rules: [{

        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        //babel setup
        use: {
          loader: 'babel-loader',
          options:{
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread','@babel/transform-runtime'],
          }
        }
      }
        
      ],
    },
  };
};
