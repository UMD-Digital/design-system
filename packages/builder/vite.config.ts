import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

const logLevel = (process.env.VITE_LOG_LEVEL as 'info' | 'warn' | 'error' | 'silent') || 'error';
const enableChecker = process.env.VITE_CHECKER === 'true';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'source/index.ts'),
        'core/index': resolve(__dirname, 'source/core/index.ts'),
        'core/ElementBuilder': resolve(
          __dirname,
          'source/core/ElementBuilder.ts',
        ),
        'core/StyleManager': resolve(__dirname, 'source/core/StyleManager.ts'),
        'core/LifecycleManager': resolve(
          __dirname,
          'source/core/LifecycleManager.ts',
        ),
        'core/types': resolve(__dirname, 'source/core/types.ts'),
      },
      name: 'UniversityOfMarylandWebBuilderLibrary',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: (id: string) => id.startsWith('@universityofmaryland/'),
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
  logLevel,
  plugins: [
    ...(enableChecker
      ? [
          checker({
            typescript: true,
            overlay: {
              initialIsOpen: false,
              position: 'br',
            },
            terminal: true,
            enableBuild: true,
          }),
        ]
      : []),
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
        paths: {},
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
