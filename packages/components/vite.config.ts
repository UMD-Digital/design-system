import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

const generateComponentEntries = () => {
  const components = [
    'accordion',
    'actions',
    'alert',
    'brand',
    'card',
    'carousel',
    'feed',
    'footer',
    'hero',
    'layout',
    'media',
    'navigation',
    'pathway',
    'person',
    'quote',
    'slider',
    'social',
    'stat',
    'tab',
    'text',
  ];

  const entries: Record<string, string> = {};
  components.forEach((component) => {
    entries[`components/${component}`] = resolve(
      __dirname,
      `source/api/${component}/index.ts`,
    );
  });
  return entries;
};

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  return {
    build: {
      lib: {
        entry: {
          // Main bundles
          index: resolve(__dirname, 'source/index.ts'),
          cdn: resolve(__dirname, 'source/exports/cdn.ts'),

          // Category bundles
          structural: resolve(__dirname, 'source/exports/structural.ts'),
          interactive: resolve(__dirname, 'source/exports/interactive.ts'),
          feed: resolve(__dirname, 'source/exports/feed.ts'),
          content: resolve(__dirname, 'source/exports/content.ts'),

          // Individual component bundles
          ...generateComponentEntries(),
        },
        name: 'UmdWebComponents',
        formats: ['es'],
        fileName: (_format, entryName) => {
          return `${entryName}.js`;
        },
      },
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: isDevelopment ? 'inline' : true,
      minify: isDevelopment ? false : 'esbuild',
      target: isDevelopment ? 'esnext' : 'es2020',
      rollupOptions: {
        external: [
          '@universityofmaryland/web-elements-library',
          '@universityofmaryland/web-styles-library',
          '@universityofmaryland/web-feeds-library',
        ],
        output: {
          globals: {
            '@universityofmaryland/web-elements-library': 'UmdWebElements',
            '@universityofmaryland/web-styles-library': 'UmdWebStyles',
            '@universityofmaryland/web-feeds-library': 'UmdWebFeeds',
          },
          preserveModules: false,
          exports: 'named',
          manualChunks: (id) => {
            if (id.includes('/utilities/')) {
              return 'shared/utilities';
            }
            if (id.includes('/model/')) {
              return 'shared/model';
            }
            if (id.includes('/_types')) {
              return 'shared/types';
            }
          },
          chunkFileNames: (chunkInfo) => {
            const names = chunkInfo.name.split('-');
            if (names[0] === 'shared') {
              return 'shared/[name]-[hash].js';
            }
            return '[name]-[hash].js';
          },
        },
        onwarn(warning, warn) {
          // Suppress certain warnings
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
          if (warning.code === 'THIS_IS_UNDEFINED') return;
          warn(warning);
        },
      },
      cssCodeSplit: true,
      cssMinify: true,
    },
    logLevel: 'warn',
    resolve: {
      extensions: ['.ts', '.js', '.css'],
      alias: {
        model: resolve(__dirname, 'source/model'),
        utilities: resolve(__dirname, 'source/utilities'),
      },
    },
    css: {
      modules: false,
      postcss: {
        plugins: [],
      },
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
        outDir: 'dist',
        insertTypesEntry: true,
        rollupTypes: false,
        exclude: [
          'node_modules/**',
          '**/node_modules/**',
          '**/__tests__/**',
          '**/*.test.ts',
          '**/test-helpers/**',
        ],
        compilerOptions: {
          skipLibCheck: true,
          skipDefaultLibCheck: true,
          declaration: true,
          declarationMap: true,
          emitDeclarationOnly: true,
          rootDir: 'source',
          baseUrl: 'source',
          paths: {
            model: ['./model'],
            utilities: ['./utilities'],
          },
        },
        logLevel: 'silent',
        copyDtsFiles: true,
        staticImport: true,
      }),
    ],
    server: {
      port: 3000,
      open: false,
    },
    esbuild: {
      target: isDevelopment ? 'esnext' : 'es2020',
      format: 'esm',
      keepNames: isDevelopment,
    },
    define: {
      __DEV__: JSON.stringify(isDevelopment),
      __PROD__: JSON.stringify(isProduction),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
