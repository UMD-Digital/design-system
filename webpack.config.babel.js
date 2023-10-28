import path from 'path';
import WebpackShellPlugin from 'webpack-shell-plugin-next';

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

const plugins = [
  new WebpackShellPlugin({
    onBuildEnd: {
      scripts: ['cp -R dist/* build'],
    },
  }),
];

const componentsFiles = {
  index: path.resolve('source/components/index'),
  footer: path.resolve('source/components/footer'),
};

const componentBundle = {
  ...baseConfig,
  entry: componentsFiles,
  plugins,
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve('source'), path.resolve('node_modules')],
  },
};

module.exports = () => {
  return [componentBundle];
};
