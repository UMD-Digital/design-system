const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
  map: true,
  plugins: [
    postcssImport,
    autoprefixer,
    postcssPresetEnv({ stage: 0, browsers: ['Explorer 11'] }),
  ],
};

module.exports = config;
