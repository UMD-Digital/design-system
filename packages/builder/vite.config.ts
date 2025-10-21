import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'source/index.ts'),
        'styledElements/index': resolve(__dirname, 'source/styledElements/index.ts'),
        'styledElements/actions': resolve(__dirname, 'source/styledElements/actions.ts'),
        'styledElements/assets': resolve(__dirname, 'source/styledElements/assets.ts'),
        'styledElements/buttons': resolve(__dirname, 'source/styledElements/buttons.ts'),
        'styledElements/event': resolve(__dirname, 'source/styledElements/event.ts'),
        'styledElements/headline': resolve(__dirname, 'source/styledElements/headline.ts'),
        'styledElements/layout': resolve(__dirname, 'source/styledElements/layout.ts'),
        'styledElements/rich-text': resolve(__dirname, 'source/styledElements/rich-text.ts'),
        'styledElements/text': resolve(__dirname, 'source/styledElements/text.ts'),
        'core/index': resolve(__dirname, 'source/core/index.ts'),
        'core/style': resolve(__dirname, 'source/core/style.ts'),
        'core/_types': resolve(__dirname, 'source/core/_types.ts'),
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
