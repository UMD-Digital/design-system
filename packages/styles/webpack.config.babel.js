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

  const baseConfig = {
    mode: devMode,
    optimization: optimization,
    stats: stats,
    devtool: 'eval',
    module: modules,
    plugins: plugins,
    resolve: {
      extensions: ['.ts', '.js', '.css'],
      modules: [
        path.resolve('source'),
        path.resolve('../../node_modules'),
        path.resolve('../'),
      ],
    },
  };

  return [
    {
      ...baseConfig,
      entry: {
        index: path.resolve('source/index'),
      },
      output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        library: {
          type: 'module',
        },
        globalObject: 'this',
      },
      experiments: {
        outputModule: true,
      },
    },
    {
      ...baseConfig,
      entry: {
        'umd-styles': path.resolve('source/index'),
      },
      output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        library: {
          name: 'Styles',
          type: 'umd',
          export: 'default',
        },
        globalObject: 'this',
      },
    },
  ];
};
