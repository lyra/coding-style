'use strict'

/**
 * Generic Lyra's ESLint config for JS/TS projects
 * Supports Typescript and Jest
 * Based on standard (https://standardjs.com)
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parserOptions: {
    sourceType: 'module',
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
      files: [
        '.jest/**/*.[jt]s?(x)',
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
      ],
      extends: ['plugin:jest/recommended'],
    },
  ],
}
