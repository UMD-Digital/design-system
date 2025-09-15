import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'source/index.ts'),
        accessibility: path.resolve(__dirname, 'source/accessibility/index.ts'),
        animation: path.resolve(__dirname, 'source/animation/index.ts'),
        element: path.resolve(__dirname, 'source/element/index.ts'),
        layout: path.resolve(__dirname, 'source/layout/index.ts'),
        token: path.resolve(__dirname, 'source/token/index.ts'),
        typography: path.resolve(__dirname, 'source/typography/index.ts'),
        utilities: path.resolve(__dirname, 'source/utilities/index.ts'),
      },
      name: 'Styles',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: [],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'source',
        exports: 'named',
      },
      onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
      }
    }
  },
  logLevel: 'warn',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source')
    },
    extensions: ['.ts', '.js', '.css']
  },
  plugins: [
    checker({
      typescript: {
        tsconfigPath: './tsconfig.json'
      }
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['source/**/*.ts'],
      exclude: ['**/__tests__/**', '**/*.test.ts'],
      logLevel: 'silent'
    })
  ],
  css: {
    postcss: {
      plugins: [
        require('postcss-nesting'),
        require('postcss-discard-duplicates')
      ]
    }
  }
});