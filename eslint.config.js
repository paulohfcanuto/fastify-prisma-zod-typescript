import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      // Config files
      'tsconfig.json',
      '*.config.js',
      '*.config.ts',
      '*.config.cjs',
      '*.config.mjs',
      // Package files
      'package.json',
      'package-lock.json',
      // Other
      '.env*',
      '.gitignore',
      'dist/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: {
        console: true,
        process: true
      },
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettier
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'prettier/prettier': 'error'
    }
  }
];
