import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin-next';

module.exports = () => {
  const optimization = {};

  const entrypoints = {
    elements: path.resolve('source/scripts/elements'),
    app: path.resolve('source/scripts/app'),
    configuration: path.resolve('source/scripts/configuration'),
  };

  const modules = {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  };

  const plugins = [
    new CopyWebpackPlugin({
      patterns: [{ from: '*', to: '', context: 'source/assets/' }],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: ['npx gulp'],
      },
      onAfterDone: {
        scripts: ['npx gulp'],
      },
    }),
  ];

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

  return {
    entry: entrypoints,
    mode: 'production',
    optimization: optimization,
    stats: stats,
    module: modules,
    plugins: plugins,
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        path.resolve('source'),
        path.resolve('node_modules'),
        path.resolve('../../node_modules'),
      ],
    },
    output: {
      path: path.resolve('build'),
      filename: '[name].js',
    },
  };
};
