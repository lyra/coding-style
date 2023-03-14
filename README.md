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

- [typescript](https://www.typescriptlang.org/)
- [eslint](https://eslint.org/) for linting
- [prettier](https://prettier.io/) for formatting
- [jest](https://jestjs.io/) for testing

## Packages

| Package                                                         | Description                                              | Version                                                                                                                                  |
| --------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`@lyracom/eslint-config`](/packages/eslint-config)             | ESLint config for pure JavaScript or TypeScript projects | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config)](https://www.npmjs.com/package/@lyracom/eslint-config)             |
| [`@lyracom/eslint-config-node`](/packages/eslint-config-node)   | ESLint config for Node.js applications                   | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-node)](https://www.npmjs.com/package/@lyracom/eslint-config-node)   |
| [`@lyracom/eslint-config-react`](/packages/eslint-config-react) | ESLint config for React applications                     | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-react)](https://www.npmjs.com/package/@lyracom/eslint-config-react) |
| [`@lyracom/prettier-config`](/packages/prettier-config)         | Prettier config for TypeScript projects                  | [![npm (scoped)](https://img.shields.io/npm/v/@lyracom/prettier-config)](https://www.npmjs.com/package/@lyracom/prettier-config)         |

## Installation

### **1. Formatting**

You need `typescript` and `prettier@^2` in your project to use this Prettier config.

```sh
npm install --dev @lyracom/prettier-config
```

### **2. Linting**

You need `typescript` and `eslint@^8` in your project to use this ESLint config.

Depending the nature of your project, choose the correct section below:

<details>
<summary><b>For pure JavaScript / TypeScript projects</b></summary>

```sh
npm install --dev @lyracom/eslint-config
```

</details>

<details>
<summary><b>For Node.js projects</b></summary>

```sh
npm install --dev @lyracom/eslint-config-node
```

</details>

<details open>
<summary><b>For React projects</b></summary>

```sh
npm install --dev @lyracom/eslint-config-react
```

</details>

### **3. Other tools**

**husky**

> Modern native git hooks made easy

```sh
npx husky-init && npm install
```

**lint-staged**

> Run linters against staged git files only

```sh
npm install --dev lint-staged
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
# .husky/pre-commit
npm test
npx lint-staged
```

Optionally, here are some `package.json` scripts you can inspire from:

```json
{
  "scripts": {
    "tsc": "tsc -p tsconfig.json",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

Do not forget to use `.prettierignore` and `.eslintignore` files to exclude folders and files you don't want to format/lint.

### Prettier

The prettier config uses the package `@trivago/prettier-plugin-sort-imports` to sort imports. You can customize this config if you need a specific order in your imports, if you have import aliases for example.

Check available options on their website: https://github.com/trivago/prettier-plugin-sort-imports

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

All changes are managed with [changesets](https://github.com/changesets/changesets). Whenever you commit a change who deserves to appear in the changelog, you need to include a change using the command: `pnpm changeset`.

### Continuous integration

Continuous integration is handled by GitHub Actions. Workflows are defined in `.github` folder.

### Release

There is a `publish` action in GitHub Actions. It creates a release pull request. Once accepted, packages are automatically published.
