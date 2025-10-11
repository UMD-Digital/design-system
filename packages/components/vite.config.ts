import { defineConfig } from 'vite';
import type { Plugin, LibraryFormats } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

const SOURCE_DIR = resolve(__dirname, 'source');
const DIST_DIR = 'dist';
const BUILD_TARGET = 'es2020';
const DEV_TARGET = 'esnext';

const EXTERNAL_DEPS = [
  '@universityofmaryland/web-utilities-library',
  '@universityofmaryland/web-styles-library',
  '@universityofmaryland/web-elements-library',
  '@universityofmaryland/web-feeds-library',
];

const PATH_ALIASES = {
  model: resolve(SOURCE_DIR, 'model'),
  helpers: resolve(SOURCE_DIR, 'helpers'),
};

const DTS_COMMON_OPTIONS = {
  outDir: DIST_DIR,
  include: ['source/**/*.ts'],
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
    emitDeclarationOnly: false,
  },
};

// Generate entries for individual components
const generateComponentEntries = () => {
  const apiDir = resolve(SOURCE_DIR, 'api');
  const entries: Record<string, string> = {};

  readdirSync(apiDir).forEach((item) => {
    const itemPath = resolve(apiDir, item);
    if (statSync(itemPath).isDirectory() && !item.startsWith('__')) {
      const indexPath = resolve(itemPath, 'index.ts');
      try {
        statSync(indexPath);
        entries[`components/${item}`] = indexPath;
      } catch {}
    }
  });

  return entries;
};

// Create base build configuration shared across special builds
const createSpecialBuildConfig = (
  entry: string,
  name: string,
  format: LibraryFormats,
  fileName: string,
  plugins: Plugin[] = [],
) => ({
  build: {
    lib: {
      entry: resolve(SOURCE_DIR, entry),
      name,
      formats: [format],
      fileName: () => fileName,
    },
    outDir: DIST_DIR,
    emptyOutDir: false,
    sourcemap: true,
    minify: 'esbuild' as const,
    target: BUILD_TARGET,
    rollupOptions: {
      external: format === 'iife' ? [] : [],
      output:
        format === 'iife'
          ? { globals: {}, inlineDynamicImports: true }
          : { inlineDynamicImports: true },
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
    alias: PATH_ALIASES,
  },
  plugins,
});

// CDN build configuration (IIFE format for browser)
const getCdnBuildConfig = () =>
  createSpecialBuildConfig(
    'exports/cdn.ts',
    'UmdWebComponents',
    'iife',
    'cdn.js',
  );

const getBundleBuildConfig = () => {
  const bundleDtsPlugin = dts({
    ...DTS_COMMON_OPTIONS,
    insertTypesEntry: false,
    rollupTypes: false,
    include: ['source/**/*.ts'],
    afterBuild: async () => {
      const fs = await import('fs');
      const path = await import('path');
      const sourcePath = path.resolve(__dirname, 'dist/exports/bundle.d.ts');
      const destPath = path.resolve(__dirname, 'dist/bundle.d.ts');

      if (fs.existsSync(sourcePath)) {
        let content = fs.readFileSync(sourcePath, 'utf-8');
        content = content
          .replace(/from '\.\.\/api'/g, "from './api'")
          .replace(/from '\.\.\/utilities'/g, "from './utilities'");
        fs.writeFileSync(destPath, content);

        const sourceMapPath = `${sourcePath}.map`;
        const destMapPath = `${destPath}.map`;
        if (fs.existsSync(sourceMapPath)) {
          fs.copyFileSync(sourceMapPath, destMapPath);
        }
      }
    },
  });

  return createSpecialBuildConfig(
    'exports/bundle.ts',
    'UmdBundle',
    'es',
    'bundle.js',
    [bundleDtsPlugin],
  );
};

const MAIN_ENTRIES = {
  index: 'index.ts',
  structural: 'exports/structural.ts',
  interactive: 'exports/interactive.ts',
  feed: 'exports/feed.ts',
  content: 'exports/content.ts',
};

const createWarningHandler = () => (warning: any, warn: any) => {
  const ignoredCodes = ['UNUSED_EXTERNAL_IMPORT', 'THIS_IS_UNDEFINED', 'EVAL'];
  if (!ignoredCodes.includes(warning.code)) {
    warn(warning);
  }
};

export default defineConfig((configEnv) => {
  const { mode } = configEnv;
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  if (process.env.BUILD_CDN === 'true') return getCdnBuildConfig();
  if (process.env.BUILD_BUNDLE === 'true') return getBundleBuildConfig();

  const buildEntries = Object.entries(MAIN_ENTRIES).reduce(
    (acc, [key, path]) => ({ ...acc, [key]: resolve(SOURCE_DIR, path) }),
    generateComponentEntries(),
  );

  return {
    build: {
      lib: {
        entry: buildEntries,
        name: 'UmdWebComponents',
        formats: ['es'] as LibraryFormats[],
        fileName: (_format, entryName) => `${entryName}.js`,
      },
      outDir: DIST_DIR,
      emptyOutDir: true,
      sourcemap: isDevelopment ? 'inline' : true,
      minify: isDevelopment ? false : 'esbuild',
      target: isDevelopment ? DEV_TARGET : BUILD_TARGET,
      rollupOptions: {
        external: (id: string) => id.startsWith('@universityofmaryland/'),
        output: {
          globals: {
            '@universityofmaryland/web-utilities-library': 'UmdWebUtilities',
            '@universityofmaryland/web-styles-library': 'UmdWebStyles',
            '@universityofmaryland/web-elements-library': 'UmdWebElements',
            '@universityofmaryland/web-feeds-library': 'UmdWebFeeds',
          },
          preserveModules: false,
          exports: 'named',
          manualChunks: (id) => {
            if (id.includes('/utilities/')) return 'shared/utilities';
            if (id.includes('/model/')) return 'shared/model';
            if (id.includes('/_types')) return 'shared/types';
          },
          chunkFileNames: (chunkInfo) => {
            const [prefix] = chunkInfo.name.split('-');
            return prefix === 'shared'
              ? 'shared/[name]-[hash].js'
              : '[name]-[hash].js';
          },
        },
        onwarn: createWarningHandler(),
      },
      cssCodeSplit: true,
      cssMinify: true,
    },
    logLevel: 'warn',
    resolve: {
      extensions: ['.ts', '.js', '.css'],
      alias: PATH_ALIASES,
    },
    css: {
      modules: false,
      postcss: { plugins: [] },
    },
    plugins: [
      checker({
        typescript: true,
        overlay: { initialIsOpen: false, position: 'br' },
        terminal: true,
        enableBuild: true,
      }),
      dts({
        ...DTS_COMMON_OPTIONS,
        insertTypesEntry: true,
        rollupTypes: false,
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
      target: isDevelopment ? DEV_TARGET : BUILD_TARGET,
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
