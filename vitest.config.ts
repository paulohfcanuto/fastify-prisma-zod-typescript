import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        'test/**',
        'vitest.config.ts',
        'eslint.config.js',
        'src/{common,main}/**/*',
      ],
      include: [
        'src/modules/**/*.{js,ts}',
        '!src/modules/**/*.test.{js,ts}',
        '!src/modules/**/__tests__/**'
      ]
    }
  }
});
