import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'source/index.ts'),
        academic: path.resolve(__dirname, 'source/feeds/academic/index.ts'),
        events: path.resolve(__dirname, 'source/feeds/events/index.ts'),
        experts: path.resolve(__dirname, 'source/feeds/experts/index.ts'),
        'in-the-news': path.resolve(__dirname, 'source/feeds/in-the-news/index.ts'),
        news: path.resolve(__dirname, 'source/feeds/news/index.ts'),
      },
      name: 'UMDFeedsLibrary',
      formats: ['es']
    },
    rollupOptions: {
      external: (id) => id.startsWith('@universityofmaryland/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'source',
      },
      onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
      }
    },
    sourcemap: true,
    outDir: 'dist',
    minify: false
  },
  logLevel: 'warn',
  resolve: {
    extensions: ['.ts', '.js', '.css'],
    alias: {
      macros: path.resolve(__dirname, 'source/macros'),
      elements: path.resolve(__dirname, 'source/elements'),
      states: path.resolve(__dirname, 'source/states'),
      widgets: path.resolve(__dirname, 'source/widgets'),
      factory: path.resolve(__dirname, 'source/factory'),
      strategies: path.resolve(__dirname, 'source/strategies'),
      types: path.resolve(__dirname, 'source/types')
    }
  },
  css: {
    modules: false
  },
  plugins: [
    checker({
      typescript: true,
      overlay: {
        initialIsOpen: false,
        position: 'br',
      },
      terminal: true,
      enableBuild: true,
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['source/**/*.ts'],
      exclude: ['**/__tests__/**', '**/*.test.ts'],
      compilerOptions: {
        paths: {},
      },
      logLevel: 'silent'
    })
  ]
});