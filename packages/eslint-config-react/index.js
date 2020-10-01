'use strict'

/**
 * Generic ESLint config for Lyra frontend projects
 * Supports React and Typescript
 * Based on standard (https://standardjs.com)
 */
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['react', 'sonarjs'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      /** Test files config, assuming jest */
      files: ['*.test.[jt]s', '*.test.[jt]sx'],
      extends: ['plugin:jest/recommended'],
      env: {
        jest: true,
        'jest/globals': true,
      },
    },
    {
      /** Typescript files config */
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'react/prop-types': 'off',
      },
    },
  ],
}
