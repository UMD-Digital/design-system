import { defineConfig, type Plugin } from 'vite';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';
import postcssNesting from 'postcss-nesting';
import postcssDiscardDuplicates from 'postcss-discard-duplicates';

const execAsync = promisify(exec);
const logLevel = (process.env.VITE_LOG_LEVEL as 'info' | 'warn' | 'error' | 'silent') || 'error';
const enableChecker = process.env.VITE_CHECKER === 'true';

/**
 * Vite plugin that generates CSS files after each build.
 * Runs the generate-css.ts and generate-tailwind.ts scripts via tsx.
 * The scripts use pure CSS generation functions from the exports module,
 * which are testable without Node.js fs dependencies.
 */
function postBuildCssPlugin(): Plugin {
  return {
    name: 'post-build-css',
    closeBundle: {
      sequential: true,
      async handler() {
        // Skip CSS generation for CDN builds
        if (process.env.BUILD_CDN === 'true') {
          return;
        }

        try {
          console.log('\n[post-build-css] Generating CSS files...');
          await execAsync('tsx scripts/generate-css.ts', { cwd: __dirname });
          console.log('[post-build-css] CSS files generated');

          console.log('[post-build-css] Generating Tailwind files...');
          await execAsync('tsx scripts/generate-tailwind.ts', {
            cwd: __dirname,
          });
          console.log('[post-build-css] Tailwind files generated\n');
        } catch (error) {
          console.error('[post-build-css] Error generating CSS:', error);
          throw error;
        }
      },
    },
  };
}

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
        plugins: [postcssNesting(), postcssDiscardDuplicates()]
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
        tailwind: path.resolve(__dirname, 'source/tailwind/index.ts'),
        'exports/index': path.resolve(__dirname, 'source/exports/index.ts'),
        'exports/generate': path.resolve(__dirname, 'source/exports/generate.ts'),
        'exports/tailwind': path.resolve(__dirname, 'source/exports/tailwind.ts'),
        'exports/cdn': path.resolve(__dirname, 'source/exports/cdn.ts'),
      },
      name: 'Styles',
      formats: ['es'],
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
  logLevel,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source')
    },
    extensions: ['.ts', '.js', '.css']
  },
  plugins: [
    ...(enableChecker
      ? [
          checker({
            typescript: {
              tsconfigPath: './tsconfig.json'
            }
          }),
        ]
      : []),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['source/**/*.ts'],
      exclude: ['**/__tests__/**', '**/*.test.ts'],
      logLevel: 'silent'
    }),
    postBuildCssPlugin()
  ],
  css: {
    postcss: {
      plugins: [postcssNesting(), postcssDiscardDuplicates()]
    }
  }
  };
});