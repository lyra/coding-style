'use strict'

/**
 * Lyra's ESLint config for Node.js apps
 * Supports Typescript and Jest
 * Based on standard (https://standardjs.com)
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
  },
  overrides: [
    {
      // typescript files
      files: ['**/*.ts?(x)'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
      },
    },
    {
      // test files config, assuming jest
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest/recommended'],
    },
  ],
}