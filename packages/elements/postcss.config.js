const postcssImport = require('postcss-import');
const tailwindcssNesting = require('tailwindcss/nesting');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
  map: true,
  plugins: [
    postcssImport,
    tailwindcssNesting,
    tailwindcss,
    autoprefixer,
    postcssPresetEnv({ stage: 0, browsers: ['Explorer 11'] }),
  ],
};

module.exports = config;
