import path from 'path';

const baseConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  plugins: [],
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    errors: true,
    errorDetails: true,
    source: false,
    timings: false,
    warnings: false,
  },
};

const componentsFiles = {
  index: path.resolve('source/index'),
};

const componentBundle = {
  ...baseConfig,
  entry: componentsFiles,
  devtool: 'eval',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    umdNamedDefine: true,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/i,
        use: ['to-string-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
    modules: [path.resolve('source'), path.resolve('../../node_modules')],
  },
};

module.exports = (env) => {
  return [componentBundle];
};
