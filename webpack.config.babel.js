import path from 'path';

const baseConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
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
    source: true,
    timings: true,
    warnings: true,
  },
};

const componentsFiles = {
  index: path.resolve('source/components/index'),
  footer: path.resolve('source/components/footer'),
};

const componentBundle = {
  ...baseConfig,
  entry: componentsFiles,
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.css'],
    modules: [path.resolve('source'), path.resolve('node_modules')],
  },
};

module.exports = () => {
  return [componentBundle];
};
