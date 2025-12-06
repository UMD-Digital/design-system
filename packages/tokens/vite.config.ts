import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

const isCDN = process.env.BUILD_CDN === 'true';

export default defineConfig({
  build: {
    lib: isCDN
      ? {
          entry: resolve(__dirname, 'source/index.ts'),
          name: 'UniversityOfMarylandWebTokenLibrary',
          formats: ['umd'],
          fileName: () => 'cdn.js',
        }
      : {
          entry: {
            index: resolve(__dirname, 'source/index.ts'),
            color: resolve(__dirname, 'source/color.ts'),
            font: resolve(__dirname, 'source/font.ts'),
            media: resolve(__dirname, 'source/media.ts'),
            spacing: resolve(__dirname, 'source/spacing.ts'),
          },
          name: 'UniversityOfMarylandWebTokenLibrary',
          formats: ['es', 'cjs'],
        },
    outDir: 'dist',
    emptyOutDir: !isCDN, // Only empty for module build, not CDN build
    sourcemap: true,
    minify: process.env.NODE_ENV === 'production' || isCDN,
    rollupOptions: isCDN
      ? {
          output: {
            assetFileNames: 'cdn.[ext]',
          },
        }
      : {
          output: {
            preserveModules: true,
            preserveModulesRoot: 'source',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') return 'index.css';
              return assetInfo.name || '';
            },
          },
        },
  },
  logLevel: 'warn',
  plugins: isCDN
    ? []
    : [
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
