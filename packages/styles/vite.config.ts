import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

const getCdnBuildConfig = () => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'source/index.ts'),
        name: 'Styles',
        formats: ['iife'] as const,
        fileName: () => 'cdn.js',
      },
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: 'esbuild' as 'esbuild',
      target: 'es2020',
      rollupOptions: {
        external: [],
        output: {
          globals: {},
          inlineDynamicImports: true,
        },
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': JSON.stringify({}),
      'process': JSON.stringify({ env: {} })
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'source')
      },
      extensions: ['.ts', '.js', '.css']
    },
    plugins: [],
    css: {
      postcss: {
        plugins: [
          require('postcss-nesting'),
          require('postcss-discard-duplicates')
        ]
      }
    }
  };
};

export default defineConfig(({ mode }) => {
  const isCdnBuild = process.env.BUILD_CDN === 'true';

  if (isCdnBuild) {
    return getCdnBuildConfig();
  }

  return {
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'source/index.ts'),
        accessibility: path.resolve(__dirname, 'source/accessibility/index.ts'),
        animation: path.resolve(__dirname, 'source/animation/index.ts'),
        element: path.resolve(__dirname, 'source/element/index.ts'),
        layout: path.resolve(__dirname, 'source/layout/index.ts'),
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
      external: (id: string) => id.startsWith('@universityofmaryland/'),
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
  };
});