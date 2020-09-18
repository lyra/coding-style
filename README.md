# Coding style for Lyra JavaScript apps

A monorepo containing coding style related packages for Lyra JavaScript apps.

- [Prerequisites](#prerequisites)
- [Packages](#packages)
- [Usage](#usage)
- [IDE integration](#ide-integration)
- [Contribution](#contribution)

## Prerequisites

For the moment, only **React** applications are supported. If necessary, we will add configs for other technologies.

To use this coding style, we assume that your technical stack contains:

- [eslint](https://eslint.org/) for linting
- [prettier](https://prettier.io/) for formatting
- [jest](https://jestjs.io/) for testing

Of course, **Typescript** is supported.

## Packages

| Package                                                              | Version                                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`@lyra-network/eslint-config-react`](/packages/eslint-config-react) | ![npm (scoped)](https://img.shields.io/npm/v/@lyra-network/eslint-config-react) |
| [`@lyra-network/prettier-config`](/packages/prettier-config)         | ![npm (scoped)](https://img.shields.io/npm/v/@lyra-network/prettier-config)     |

## Usage

**1. Install dependencies**

```sh
yarn add -D @lyra-network/eslint-config-react @lyra-network/prettier-config prettier husky lint-staged
```

**2. Install sub-dependencies**

```sh
npx install-peerdeps -D @lyra-network/eslint-config-react
```

**3. Project configuration**

In your `package.json`, add the following lines:

```json
{
  "eslintConfig": {
    "extends": "@lyra-network/eslint-config-react"
  },
  "prettier": "@lyra-network/prettier-config",
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

You must be logged in using `npm adduser --scope=@lyra-network` to be able to publish a release.

Make sure to commit all your changes, and when you're ready to publish a release, run this command:

```sh
lerna publish
```

Lerna detects packages with changes and prompt you for new packages versions. It will then tag, push and publish automatically.