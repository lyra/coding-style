---
'@lyracom/eslint-config-expo': major
---

Add `@lyracom/eslint-config-expo`, Lyra's ESLint config for Expo React Native apps.

Flat config (ESLint 9+) built on top of `eslint-config-expo` (React, React Hooks,
import resolution and TypeScript baseline tuned for Expo / React Native), with
`eslint-config-prettier` applied last so Prettier stays the single source of
truth for formatting.

The package exports two named flat-config arrays: `lyraExpoConfig` (the main
config) and `reactCompilerRecommendedWarn` (optional, see below).

On top of the Expo baseline it adds a lean house-rules layer (all `warn` during
migration unless noted otherwise):

- The `@typescript-eslint` **recommended** preset, layered before Expo (so Expo's
  RN-specific tuning still wins) and downgraded to `warn`.
- Type-aware `@typescript-eslint/no-deprecated` (requiring `typescript` + a
  tsconfig), replacing the archived `eslint-plugin-deprecation`.
- `@typescript-eslint/no-floating-promises` and `@typescript-eslint/no-misused-promises`
  are explicitly disabled: runtime monitoring handles unhandled failures, and
  intentional fire-and-forget calls use `void` where appropriate.
- `@typescript-eslint/no-empty-function` (allowing empty arrow functions, since
  they're an idiomatic no-op default in React Contexts).
- `prefer-promise-reject-errors` and `react/display-name` left off (noisy in RN).
- `react/self-closing-comp` enabled as an **error** for consistent JSX (`<View />`
  instead of `<View></View>`).
- Type-aware `eslint-plugin-import` rules disabled where redundant with
  TypeScript and expensive to run: `import/namespace`,
  `import/no-named-as-default-member`, `import/no-unresolved`.
- Bug rules ESLint 10 promotes to recommended, enabled early on v9:
  `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`.
- React Compiler-oriented Hooks rules are enabled by the Expo preset. Projects
  migrating gradually can use the opt-in
  `reactCompilerRecommendedWarn` named preset to downgrade them all to warnings
  with one config spread.
