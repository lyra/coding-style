'use strict'

/**
 * Lyra's ESLint config for React apps
 * Supports React, Typescript and Jest
 * Based on standard (https://standardjs.com)
 */
module.exports = {
  root: true,
  extends: [
    '@lyracom/eslint-config',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier', // always put it last, so it gets the chance to override other configs
  ],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
