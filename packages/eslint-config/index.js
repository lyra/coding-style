'use strict'

/**
 * Generic Lyra's ESLint config for JS/TS projects
 * Supports Typescript and Jest
 * Based on standard (https://standardjs.com)
 */
module.exports = {
  root: true,
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
      // javascript files
      files: ['**/*.js?(x)'],
      extends: ['plugin:import/recommended'],
      settings: {
        'import/resolver': {
          typescript: true,
          node: true,
        },
      },
    },
    {
      // typescript files
      files: ['**/*.ts?(x)'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
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
