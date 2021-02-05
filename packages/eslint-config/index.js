'use strict'

/**
 * Generic ESLint config for Lyra frontend projects
 * Supports React and Typescript
 * Based on standard (https://standardjs.com)
 */
module.exports = {
  extends: [
    'standard',
    'plugin:sonarjs/recommended',
    'prettier',
    'prettier/standard',
  ],
  overrides: [
    {
      // typescript files
      files: ['**/*.ts?(x)'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
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
