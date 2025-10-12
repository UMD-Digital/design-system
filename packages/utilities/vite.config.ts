import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'source/index.ts'),
        accessibility: resolve(__dirname, 'source/accessibility/index.ts'),
        adapters: resolve(__dirname, 'source/adapters/index.ts'),
        animation: resolve(__dirname, 'source/animation/index.ts'),
        date: resolve(__dirname, 'source/date/index.ts'),
        dom: resolve(__dirname, 'source/dom/index.ts'),
        elements: resolve(__dirname, 'source/elements/index.ts'),
        events: resolve(__dirname, 'source/events/index.ts'),
        media: resolve(__dirname, 'source/media/index.ts'),
        network: resolve(__dirname, 'source/network/index.ts'),
        performance: resolve(__dirname, 'source/performance/index.ts'),
        storage: resolve(__dirname, 'source/storage/index.ts'),
        string: resolve(__dirname, 'source/string/index.ts'),
        styles: resolve(__dirname, 'source/styles/index.ts'),
        validation: resolve(__dirname, 'source/validation/index.ts'),
      },
      name: 'UniversityOfMarylandWebUtilitiesLibrary',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: (id: string) =>
        id.startsWith('@universityofmaryland/') ||
        id === 'postcss' ||
        id === 'postcss-js' ||
        id === 'postcss-nesting',
      output: {
        preserveModules: true,
        preserveModulesRoot: 'source',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name || '';
        },
      },
      onwarn(warning, warn) {
        if (warning.code === 'EVAL') return;
        warn(warning);
      },
    },
    minify: false,
  },
  logLevel: 'error',
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['source/**/*.ts'],
      exclude: [
        'source/**/*.test.ts',
        'source/**/*.spec.ts',
        'source/__tests__/**',
      ],
      outDir: 'dist',
      rollupTypes: false,
      copyDtsFiles: true,
      compilerOptions: {
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: false,
      },
      logLevel: 'silent',
    }),
  ],
  resolve: {
    alias: {},
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'production',
    ),
  },
});
