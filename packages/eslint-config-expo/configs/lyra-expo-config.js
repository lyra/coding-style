/**
 * Lyra's ESLint config for Expo React Native apps.
 *
 * Flat config (ESLint 9+). Built on top of `eslint-config-expo`, which provides
 * the React, React Hooks, import-resolution and TypeScript baseline tuned for
 * Expo / React Native. `eslint-config-prettier` is applied last so Prettier
 * remains the single source of truth for formatting.
 *
 * Severity policy: rules we add here default to `warn` so in-flight app
 * migrations aren't build-blocked. Tighten to `error` per rule once clean.
 */
const { defineConfig } = require('eslint/config')

const expoConfig = require('eslint-config-expo/flat')
const prettierConfig = require('eslint-config-prettier/flat')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const globals = require('globals')

/**
 * @type {import('eslint').Linter.Config[]}
 */
module.exports = defineConfig([
  // @typescript-eslint "recommended" baseline, scoped to TS files.
  // Placed BEFORE eslint-config-expo so Expo's RN-specific tuning of any
  // overlapping rules wins — notably `no-require-imports` (Expo allows requiring
  // Metro assets) and `no-unused-vars` (Expo's args/caughtErrors options).
  {
    name: '@lyracom/eslint-config-expo/ts-recommended',
    files: ['**/*.ts', '**/*.tsx'],
    rules: tsPlugin.configs.recommended.rules,
  },

  // eslint-config-expo/flat is an array of flat config objects.
  ...expoConfig,

  // Flat config files execute in Node, so provide Node globals while keeping
  // the configuration files themselves included in linting.
  {
    name: '@lyracom/eslint-config-expo/eslint-config',
    files: ['eslint.config.js', 'eslint.config.cjs', 'eslint.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // TypeScript rules.
  {
    name: '@lyracom/eslint-config-expo/typescript',
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'warn', // Replaces the archived `eslint-plugin-deprecation`: flags use of APIs marked with @deprecated.
      '@typescript-eslint/no-floating-promises': 'off', // Intentionally handled by Sentry/runtime monitoring.
      '@typescript-eslint/no-misused-promises': 'off', // Intentionally disabled to avoid forcing async callback patterns.
      '@typescript-eslint/no-empty-function': ['warn', { allow: ['arrowFunctions'] }], // Empty arrow functions are idiomatic no-op callback defaults in React Contexts; allow those but flag other empty bodies.
    },
  },

  // House rules that apply to every file: core ESLint + React plugin (both registered globally by eslint-config-expo).
  {
    name: '@lyracom/eslint-config-expo/house',
    rules: {
      'prefer-promise-reject-errors': 'warn', // Reject promises with an Error (not a string/object) so stack traces and `.message` are preserved.
      'react/display-name': 'off', // Noisy in RN, where inline / HOC-wrapped components rarely need a displayName.
      'react/self-closing-comp': 'error', // Keeps empty JSX elements concise and consistent: <View /> instead of <View></View>.
      // https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import Redundant rules with TypeScript
      'import/namespace': 'off', // And this one is very expensive for nothing
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      // ===== Bug rules promoted to `eslint:recommended` in ESLint 10. Enabled now on v9 so we get the coverage without waiting for the major bump. =====
      'no-unassigned-vars': 'warn', // Flags a `let` that is exported/used but never assigned — always a bug.
      'no-useless-assignment': 'warn', // Flags a value that is assigned but overwritten before it is ever read.
      'preserve-caught-error': 'warn', // Flags a `catch` that throws a new error without chaining the original via `cause`, which loses the root failure.
      // ===== =====
    },
  },

  // Always last: disable stylistic rules that would conflict with Prettier.
  prettierConfig,
])
