import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import path from 'path';

const contentRuntimeFixture: string = path.resolve(__dirname, './src/test/content-runtime-module.ts');
const contentRuntimeStub: string = path.resolve(__dirname, './src/test/content-runtime-stub.ts');
const contentRuntimeAlias: string = existsSync(contentRuntimeFixture) ? contentRuntimeFixture : contentRuntimeStub;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    // Keep the worker count bounded for memory-constrained environments.
    pool: 'forks',
    maxWorkers: 4,
    isolate: true,
    // Limit concurrent tests within each file
    maxConcurrency: 5,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '*.config.js',
        '*.config.ts',
      ],
    },
  },
  resolve: {
    alias: {
      'virtual:format-overrides': path.resolve(__dirname, './src/test/format-overrides-module.ts'),
      'virtual:content-runtime': contentRuntimeAlias,
      '@/': path.resolve(__dirname, './src/'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/api': path.resolve(__dirname, './src/server/api'),
      '@/layouts': path.resolve(__dirname, './src/layouts'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/styles': path.resolve(__dirname, './src/styles'),
    },
  },
});
