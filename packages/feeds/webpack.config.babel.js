import path from 'path';

module.exports = (env) => {
  const devMode = env.NODE_ENV;
  const optimization = {
    minimize: true,
  };
  const plugins = [];
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
    source: false,
    timings: false,
    warnings: false,
  };
  const modules = {
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
  };

  return {
    entry: {
      index: path.resolve('source/index'),
    },
    mode: devMode,
    optimization: optimization,
    stats: stats,
    devtool: 'eval',
    module: modules,
    plugins: plugins,
    externals: {
      '@universityofmaryland/web-styles-library': '@universityofmaryland/web-styles-library',
      '@universityofmaryland/web-elements-library': '@universityofmaryland/web-elements-library'
    },
    resolve: {
      extensions: ['.ts', '.js', '.css'],
      modules: [
        path.resolve('source'), 
        path.resolve('../../node_modules'),
        path.resolve('../')  // Add this to resolve packages from within the monorepo
      ],
      alias: {
        '@universityofmaryland/web-styles-library': path.resolve('../styles'),
        '@universityofmaryland/web-elements-library': path.resolve('../elements')
      }
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js',
      umdNamedDefine: true,
      libraryTarget: 'umd',
    },
  };
};
