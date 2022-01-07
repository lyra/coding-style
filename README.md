# Coding style for Lyra JavaScript apps

A monorepo containing coding style related packages for Lyra JavaScript apps.
This coding style includes linting and formatting rules.

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

| Package                                                         | Description                                              | Version                                                                                                                                  |
| --------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`@lyracom/eslint-config`](/packages/eslint-config)             | ESLint config for pure JavaScript or TypeScript projects | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config)](https://www.npmjs.com/package/@lyracom/eslint-config)             |
| [`@lyracom/eslint-config-node`](/packages/eslint-config-node)   | ESLint config for Node.js applications                   | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-node)](https://www.npmjs.com/package/@lyracom/eslint-config-node)   |
| [`@lyracom/eslint-config-react`](/packages/eslint-config-react) | ESLint config for React applications                     | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-react)](https://www.npmjs.com/package/@lyracom/eslint-config-react) |
| [`@lyracom/prettier-config`](/packages/prettier-config)         | Prettier config for TypeScript projects                  | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/prettier-config)](https://www.npmjs.com/package/@lyracom/prettier-config)         |

## Installation

Depending the nature of your project, choose the correct section below:

<details>
<summary><b>For pure JavaScript / TypeScript projects</b></summary>

```sh
yarn add -D \
  "eslint@^8.6.0" \
  "prettier@^2.5.1" \
  "typescript@^4.5.4" \
  "@lyracom/eslint-config" \
  "@lyracom/prettier-config" \
  "@typescript-eslint/eslint-plugin@^5.9.0" \
  "@typescript-eslint/parser@^5.9.0" \
  "eslint-plugin-import@^2.25.4" \
  "eslint-plugin-jest@^25.3.4" \
  "eslint-plugin-node@^11.1.0" \
  "eslint-plugin-promise@^6.0.0" \
  "eslint-plugin-sonarjs@^0.11.0" \
  "lint-staged"
```

</details>

<details>
<summary><b>For Node.js projects</b></summary>

```sh
yarn add -D \
  "eslint@^8.6.0" \
  "prettier@^2.5.1" \
  "typescript@^4.5.4" \
  "@lyracom/eslint-config-node" \
  "@lyracom/prettier-config" \
  "@typescript-eslint/eslint-plugin@^5.9.0" \
  "@typescript-eslint/parser@^5.9.0" \
  "eslint-plugin-import@^2.25.4" \
  "eslint-plugin-jest@^25.3.4" \
  "eslint-plugin-node@^11.1.0" \
  "eslint-plugin-promise@^6.0.0" \
  "eslint-plugin-sonarjs@^0.11.0" \
  "lint-staged"
```

</details>

<details>
<summary><b>For React projects</b></summary>

```sh
yarn add -D \
  "eslint@^8.6.0" \
  "prettier@^2.5.1" \
  "typescript@^4.5.4" \
  "@lyracom/eslint-config-react" \
  "@lyracom/prettier-config" \
  "@typescript-eslint/eslint-plugin@^5.9.0" \
  "@typescript-eslint/parser@^5.9.0" \
  "eslint-plugin-import@^2.25.4" \
  "eslint-plugin-jest@^25.3.4" \
  "eslint-plugin-node@^11.1.0" \
  "eslint-plugin-promise@^6.0.0" \
  "eslint-plugin-react@^7.28.0" \
  "eslint-plugin-react-hooks@^4.3.0" \
  "eslint-plugin-sonarjs@^0.11.0" \
  "lint-staged"
```

</details>

Now install `husky`:

```sh
npx husky-init && yarn
```

## Configuration

In your `package.json`, add the following lines:

```jsonc
{
  "eslintConfig": {
    // For pure JS / TS projects
    "extends": "@lyracom/eslint-config",
    // For Node.js projects
    "extends": "@lyracom/eslint-config-node",
    // For React projects
    "extends": "@lyracom/eslint-config-react"
  },
  "prettier": "@lyracom/prettier-config",
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint --max-warnings 0",
    "*": "prettier -w -u"
  }
}
```

In `.husky/pre-commit`, add the following lines:

```sh
yarn test
npx lint-staged
```

Optionally, here are some `package.json` scripts you can inspire from:

```json
{
  "scripts": {
    "tsc": "tsc -p tsconfig.json",
    "lint": "eslint --max-warnings 0 .",
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

Checklist before releasing:

- make sure to synchronize packages versions between `devDependencies` and `peerDependencies`, and also with installation instructions in `README.md`

Also, make sure to commit all your changes, and when you're ready to publish a release, run this command:

```sh
lerna publish
```

Lerna detects packages with changes and prompt you for new packages versions. It will then tag, push and publish automatically.
