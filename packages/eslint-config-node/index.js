'use strict'

/**
 * Lyra's ESLint config for Node.js apps
 * Supports Typescript and Jest
 * Based on standard (https://standardjs.com)
 */
module.exports = {
  root: true,
  extends: [
    '@lyracom/eslint-config',
    'plugin:n/recommended',
    'prettier', // always put it last, so it gets the chance to override other configs
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
}
