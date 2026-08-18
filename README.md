# Coding style for Lyra apps

A monorepo containing coding style related packages for Lyra apps (primarily Expo React Native). This coding style
includes linting and formatting rules.

- [Technical stack](#technical-stack)
- [Packages](#packages)
- [Installation](#installation)
- [Configuration](#configuration)
- [IDE integration](#ide-integration)
- [Contribution](#contribution)

## Technical stack

To use this coding style, we assume that your technical stack contains:

- [expo](https://expo.dev/) / [react-native](https://reactnative.dev/)
- [typescript](https://www.typescriptlang.org/)
- [eslint](https://eslint.org/) for linting — ESLint 9 flat config for Expo apps (`@lyracom/eslint-config-expo`), legacy
  ESLint 8 `.eslintrc` configs for other project types (see [ESLint](#eslint) below)
- [prettier](https://prettier.io/) for formatting
- [jest](https://jestjs.io/) for testing

## Packages

| Package                                                         | Description                                              | Version                                                                                                                                  |
| --------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`@lyracom/eslint-config`](/packages/eslint-config)             | ESLint config for pure JavaScript or TypeScript projects | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config)](https://www.npmjs.com/package/@lyracom/eslint-config)             |
| [`@lyracom/eslint-config-expo`](/packages/eslint-config-expo)   | ESLint config for Expo React Native apps (flat config)   | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-expo)](https://www.npmjs.com/package/@lyracom/eslint-config-expo)   |
| [`@lyracom/eslint-config-node`](/packages/eslint-config-node)   | ESLint config for Node.js applications                   | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-node)](https://www.npmjs.com/package/@lyracom/eslint-config-node)   |
| [`@lyracom/eslint-config-react`](/packages/eslint-config-react) | ESLint config for React applications                     | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-react)](https://www.npmjs.com/package/@lyracom/eslint-config-react) |
| [`@lyracom/prettier-config`](/packages/prettier-config)         | Prettier config for TypeScript projects                  | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/prettier-config)](https://www.npmjs.com/package/@lyracom/prettier-config)         |

## Installation

### TypeScript

```sh
pnpm add -D \
  "typescript@~5.5.4" \
  "@lyracom/tsconfig@^1"
```

Look at all the configurations available in the package (base/node/dom/jsx) and chose the one you want to use in your
project. Then create a tsconfig.json file and add the following lines:

```json
{
  // always try to use strict TypeScript config
  "extends": ["@lyracom/tsconfig/tsconfig-strict.json", "@lyracom/tsconfig/tsconfig-[CONFIG].json"],
  // or, if you work on a legacy/poc project or do not want to use strict config
  "extends": "@lyracom/tsconfig/tsconfig-[CONFIG].json"
}
```

### Prettier

```sh
pnpm add -D \
  "prettier@^3" \
  "@lyracom/prettier-config@^6" \
  "@trivago/prettier-plugin-sort-imports@^6"
```

The prettier config uses the package `@trivago/prettier-plugin-sort-imports` to sort imports. You can customize this
config if you need a specific order in your imports, if you have import aliases for example.

Check available options on their website: https://github.com/trivago/prettier-plugin-sort-imports

### ESLint

<details open>
<summary><b>For Expo React Native apps (flat config, ESLint 9+) — recommended</b></summary>

```sh
pnpm add -D \
  "eslint@^9" \
  "typescript@^5" \
  "@lyracom/eslint-config-expo"
```

Create an `eslint.config.js` at the project root:

```js
const { lyraExpoConfig } = require('@lyracom/eslint-config-expo')

module.exports = [
  ...lyraExpoConfig,
  {
    // anchor type-aware linting to this project
    languageOptions: { parserOptions: { tsconfigRootDir: __dirname } },
  },
  {
    ignores: ['dist/*', '.expo/*'],
  },
]
```

This config enables the type-aware `@typescript-eslint/no-deprecated` rule, so every `.ts`/`.tsx` file must be covered
by your `tsconfig.json`. Promise safety rules (`no-floating-promises` and `no-misused-promises`) are explicitly
disabled:
runtime monitoring handles unhandled failures, and intentional fire-and-forget calls use `void` where appropriate. If
ESLint reports _"file was not found by the project service"_, add the file to your tsconfig `include` (or ignore it in
`eslint.config.js`).

The React Compiler-oriented Hooks rules are enabled by the Expo preset as errors. During migration, projects can
downgrade them all to warnings with one additional config spread:

```js
const { lyraExpoConfig, reactCompilerRecommendedWarn } = require('@lyracom/eslint-config-expo')

module.exports = [...lyraExpoConfig, ...reactCompilerRecommendedWarn]
```

**Migrating from `@lyracom/eslint-config-react` (legacy `.eslintrc`):**

- Convert your `.eslintrc.js` to `eslint.config.js` (flat config).
- **Delete** any `promise/*` and `sonarjs/*` overrides — those plugins are no longer bundled, and referencing an
  unregistered rule is a hard error in flat config.
- **Delete** the `eslint-plugin-deprecation` plugin + `deprecation/deprecation`
  override; it is replaced by the shared, type-aware `@typescript-eslint/no-deprecated`.
- Drop overrides now handled by the shared config: `@typescript-eslint/no-empty-function`,
  `@typescript-eslint/ban-ts-comment`, `react/display-name`, `react/prop-types`.
- Keep only genuinely app-specific rules (e.g. `react-hooks/exhaustive-deps`
  `additionalHooks`).

</details>

<details>
<summary><b>Legacy configs (deprecated, ESLint 8 / <code>.eslintrc</code>)</b></summary>

```sh
pnpm add -D \
  "eslint@^8" \
  "@typescript-eslint/eslint-plugin@^5" \
  "eslint-plugin-import@^2" \
  "eslint-plugin-jest@^27" \
  "eslint-plugin-n@^15" \
  "eslint-plugin-promise@^6" \
  "eslint-plugin-sonarjs@^0.19"
```

Depending the nature of your project, you should also add the following plugins:

<details>
<summary><b>For pure JavaScript / TypeScript projects</b></summary>

```sh
pnpm add -D \
  "@lyracom/eslint-config"
```

</details>

<details>
<summary><b>For Node.js projects</b></summary>

```sh
pnpm add -D \
  "@lyracom/eslint-config-node"
```

</details>

<details open>
<summary><b>For React projects</b></summary>

```sh
pnpm add -D \
  "@lyracom/eslint-config-react" \
  "eslint-plugin-react@^7" \
  "eslint-plugin-react-hooks@^4"
```

</details>

</details>

### Husky

Now install `husky`:

```sh
npx husky-init && pnpm install
```

### Lint-staged

```sh
pnpm add -D lint-staged
```

## Configuration

For an Expo app, create the `eslint.config.js` shown above, then add the shared Prettier config and a `lint-staged`setup
to your `package.json`:

```json
{
  "prettier": "@lyracom/prettier-config",
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint",
    "*": "prettier -w -u"
  }
}
```

> The shared ESLint config reports most rules as `warn` during migration, so
> keep `eslint` (not `eslint --max-warnings 0`) in `lint-staged` for now. Switch
> to `eslint --max-warnings 0` once your app is clean to make warnings blocking.

<details>
<summary><b>Legacy configs (<code>.eslintrc</code>)</b></summary>

```json
{
  "eslintConfig": {
    // For pure JS / TS projects
    "extends": "@lyracom/eslint-config",
    // For Node.js projects
    "extends": "@lyracom/eslint-config-node",
    // For React projects
    "extends": "@lyracom/eslint-config-react"
  }
}
```

</details>

In `.husky/pre-commit`, add the following lines:

```sh
pnpm test
npx lint-staged
```

Optionally, here are some `package.json` scripts you can inspire from:

```json
{
  "scripts": {
    "tsc": "tsc -p tsconfig.json",
    "lint": "eslint .",
    "format": "prettier -w -u ."
  }
}
```

Do not forget to use `.prettierignore` to exclude files you don't want to format, and the `ignores` key in
`eslint.config.js` to exclude files from linting.

## IDE integration

All major IDE have integration for ESLint and Prettier, check your settings to enable them.

## Contribution

### Development

To contribute at this repo, set up your development environment with this command:

```sh
pnpm install
```

Do not push directly on main but submit a pull request instead, thanks :)

### Changesets

All changes are managed with [changesets](https://github.com/changesets/changesets). Whenever you commit a change who
deserves to appear in the changelog, you need to include a change using the command: `pnpm changeset`.

### Continuous integration

Continuous integration is handled by GitHub Actions. Workflows are defined in `.github` folder.

### Release

First, launch the `version` GitHub action. It will create a release pull request.

Once accepted, you can launch the `publish` GitHub action to publish packages to npm.
