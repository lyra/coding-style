# `@lyracom/eslint-config-expo`

> Lyra's ESLint config for Expo React Native apps.

[![npm (scoped)](https://img.shields.io/npm/v/@lyracom/eslint-config-expo)](https://www.npmjs.com/package/@lyracom/eslint-config-expo)

This package is part of « [Coding style for Lyra apps](https://github.com/lyra/coding-style) », please follow instructions from this repo.

The package exports named flat-config arrays:

```js
const { lyraExpoConfig, reactCompilerRecommendedWarn } = require('@lyracom/eslint-config-expo')

module.exports = [...lyraExpoConfig, ...reactCompilerRecommendedWarn]
```
