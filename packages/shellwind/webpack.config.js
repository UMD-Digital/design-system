const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
  const mode = 'production';

  const optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: false,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true,
          sourceMap: true,
        },
      }),
    ],
  };

  const stats = {
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
  };

  const entry = {
    index: path.resolve('source/index'),
  };

  const module = {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
      },
    ],
  };

  const output = {
    path: path.resolve('dist'),
    filename: '[name].js',
  };

  const resolve = {
    extensions: ['.ts', '.js'],
    modules: [
      path.resolve('source'),
      path.resolve('node_modules'),
      path.resolve('../../node_modules'),
    ],
  };

  return {
    entry,
    mode,
    module,
    optimization,
    output,
    resolve,
    stats,
  };
};
