import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'source/index.ts'),
        academic: path.resolve(__dirname, 'source/composite/academic/index.ts'),
        events: path.resolve(__dirname, 'source/composite/events/index.ts'),
        news: path.resolve(__dirname, 'source/composite/news/index.ts'),
      },
      name: 'UMDFeedsLibrary',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: (id) => id.startsWith('@universityofmaryland/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'source',
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
      'macros': path.resolve(__dirname, 'source/macros'),
      'elements': path.resolve(__dirname, 'source/elements')
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
      logLevel: 'silent'
    })
  ]
});