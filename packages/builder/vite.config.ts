import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

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
        'factories/index': resolve(__dirname, 'source/factories/index.ts'),
        'factories/presets': resolve(__dirname, 'source/factories/presets.ts'),
        'factories/compose': resolve(__dirname, 'source/factories/compose.ts'),
      },
      name: 'UniversityOfMarylandWebBuilderLibrary',
      formats: ['es', 'cjs'],
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
  logLevel: 'warn',
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
