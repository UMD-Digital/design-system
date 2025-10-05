import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'source/index.ts'),
        navigation: resolve(__dirname, 'source/navigation/index.ts'),
        'ui-controls': resolve(__dirname, 'source/ui-controls/index.ts'),
        communication: resolve(__dirname, 'source/communication/index.ts'),
        documents: resolve(__dirname, 'source/documents/index.ts'),
        time: resolve(__dirname, 'source/time/index.ts'),
        media: resolve(__dirname, 'source/media/index.ts'),
        alerts: resolve(__dirname, 'source/alerts/index.ts'),
        search: resolve(__dirname, 'source/search/index.ts'),
        logos: resolve(__dirname, 'source/logos/index.ts'),
        social: resolve(__dirname, 'source/social/index.ts'),
        brand: resolve(__dirname, 'source/brand/index.ts'),
        user: resolve(__dirname, 'source/user/index.ts'),
        location: resolve(__dirname, 'source/location/index.ts'),
        content: resolve(__dirname, 'source/content/index.ts'),
      },
      name: 'UniversityOfMarylandWebIconsLibrary',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'source',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name || '';
        },
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
