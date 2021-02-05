# Coding style for Lyra JavaScript apps

A monorepo containing coding style related packages for Lyra JavaScript apps.

- [Prerequisites](#prerequisites)
- [Packages](#packages)
- [Usage](#usage)
- [IDE integration](#ide-integration)
- [Contribution](#contribution)

## Prerequisites

To use this coding style, we assume that your technical stack contains:

- [eslint](https://eslint.org/) for linting
- [prettier](https://prettier.io/) for formatting
- [jest](https://jestjs.io/) for testing

Of course, **TypeScript** is supported.

## Packages

| Package | Description | Version |
| ------- | ----------- | ------- |
| [`@lyracom/eslint-config`](/packages/eslint-config) | ESLint config for pure JavaScript or TypeScript projects | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config)](https://www.npmjs.com/package/@lyracom/eslint-config) |
| [`@lyracom/eslint-config-react`](/packages/eslint-config-react) | ESLint config for React applications | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-react)](https://www.npmjs.com/package/@lyracom/eslint-config-react) |
| [`@lyracom/prettier-config`](/packages/prettier-config) | Prettier config for TypeScript projects | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/prettier-config)](https://www.npmjs.com/package/@lyracom/prettier-config) |

## Installation

> For a pure JS / TS project (no React), use `@lyracom/eslint-config` instead of `@lyracom/eslint-config-react`.
> Also, you will not need `eslint-plugin-react` and `eslint-plugin-react-hooks`, you can skip their installation.

**1. Install peer dependencies**

```sh
yarn add -D \
  "eslint@^7.17.0" \
  "prettier@^2.2.1" \
  "typescript@^4.1.3" \
  "@typescript-eslint/eslint-plugin@^4.14.2" \
  "@typescript-eslint/parser@^4.14.2" \
  "eslint-plugin-import@^2.22.1" \
  "eslint-plugin-jest@^24.0.2" \
  "eslint-plugin-node@^11.1.0" \
  "eslint-plugin-promise@^4.2.1" \
  "eslint-plugin-react@^7.22.0" \
  "eslint-plugin-react-hooks@^4.1.2" \
  "eslint-plugin-sonarjs@^0.5.0"
```

**2. Install main dependencies**

```sh
yarn add -D \
  @lyracom/eslint-config-react \
  @lyracom/prettier-config \
  prettier \
  husky \
  lint-staged
```

**3. Project configuration**

In your `package.json`, add the following lines:

```json
{
  "eslintConfig": {
    "extends": "@lyracom/eslint-config-react"
  },
  "prettier": "@lyracom/prettier-config",
  "husky": {
    "hooks": {
      "pre-commit": "yarn tsc && lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint",
    "*": "prettier -w -u"
  }
}
```

Finally, reinstall husky to enable git hooks:

```sh
yarn add -D --force husky
```

**4. Example scripts**

Here are some `package.json` scripts you can inspire from:

```json
{
  "scripts": {
    "tsc": "tsc -p tsconfig.json",
    "lint": "eslint .",
    "format": "prettier -w -u \"src/**/*\""
  }
}
```

## IDE integration

All major IDE have integration for ESLint and Prettier, check your settings to enable them.

## Contribution

#### Development

To contribute at this repo, set up your development environment with this command:

```sh
npx lerna bootstrap
```

Do not push on master but submit a merge request instead, thanks :)

#### Release

You must be logged in using `npm adduser --scope=@lyracom` to be able to publish a release.

Before releasing, make sure to synchronize `peerDependencies` packages versions with installation instructions in `README.md`.

Also, make sure to commit all your changes, and when you're ready to publish a release, run this command:

```sh
lerna publish
```

Lerna detects packages with changes and prompt you for new packages versions. It will then tag, push and publish automatically.
