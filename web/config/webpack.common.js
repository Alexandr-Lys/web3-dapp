const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const moduleAlias = require('./moduleAlias');
const paths = require('./paths');
const insertAtTop = (element) => {
  const parent = document.querySelector('head');
  const lastInsertedElement = window._lastElementInsertedByStyleLoader;

  if (!lastInsertedElement) {
    parent.insertBefore(element, parent.firstChild);
  } else if (lastInsertedElement.nextSibling) {
    parent.insertBefore(element, lastInsertedElement.nextSibling);
  } else {
    parent.appendChild(element);
  }

  window._lastElementInsertedByStyleLoader = element;
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: paths.build,
    filename: '[contenthash].bundle.js',
    chunkFilename: '[contenthash].bundle.js',
    publicPath: '/',
    clean: true, // Очищает директорию dist перед обновлением бандла
  },
  devtool: 'source-map',

  devServer: {
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', paths.src],
    alias: moduleAlias,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // обновляем регулярное выражение для поддержки jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ts|tsx|jsx)?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        sideEffects: true,
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
            options: { insert: insertAtTop },
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|swf)$/i,
        loader: 'file-loader',
        options: {
          name: 'img/[name]-[hash:6].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]-[hash:6].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'icons/[name]-[hash:6].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ].filter(Boolean),
};
