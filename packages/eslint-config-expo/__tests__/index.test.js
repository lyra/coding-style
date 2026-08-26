const { ESLint } = require('eslint')
const path = require('path')
const { lyraExpoConfig, reactCompilerRecommendedWarn } = require('../index.js')

function lintFiles(file) {
  const eslint = new ESLint({
    // Don't search for an eslint.config.js on disk; use the config below.
    // (Loading it from disk would use dynamic import(), which Jest's VM rejects.)
    overrideConfigFile: true,
    baseConfig: [
      ...lyraExpoConfig,
      ...(file === 'file-with-recommended-warnings.ts' ? reactCompilerRecommendedWarn : []),
    ],
    overrideConfig: {
      settings: {
        react: {
          // forcing React version instead of "detect" because react is not installed locally
          version: '18.2.0',
        },
      },
      languageOptions: {
        parserOptions: {
          // Anchor type-aware linting to this package so projectService finds
          // ../tsconfig.json regardless of where the tests are invoked from.
          tsconfigRootDir: path.resolve(__dirname, '..'),
        },
      },
    },
  })

  return eslint.lintFiles([`__tests__/fixtures/${file}`])
}

describe('Validate ESLint configuration', () => {
  it('[file-with-errors.js] should find errors', () => {
    return lintFiles('file-with-errors.js').then((results) => {
      expect(results[0].warningCount).not.toBe(0)
    })
  })

  it('[file-with-errors.ts] should find errors', () => {
    return lintFiles('file-with-errors.ts').then((results) => {
      expect(results[0].warningCount).not.toBe(0)
      expect(results[0].errorCount).toBe(0)
    })
  })

  it('[component-with-errors.tsx] should find errors', () => {
    return lintFiles('component-with-errors.tsx').then((results) => {
      expect(results[0].warningCount).not.toBe(0)
      expect(results[0].errorCount).not.toBe(0)
    })
  })

  it('[file-with-type-errors.ts] should find deprecation warnings', () => {
    return lintFiles('file-with-type-errors.ts').then((results) => {
      const rules = results[0].messages.map((m) => m.ruleId)
      expect(rules).toContain('@typescript-eslint/no-deprecated')
      expect(rules).not.toContain('@typescript-eslint/no-floating-promises')
      expect(rules).not.toContain('@typescript-eslint/no-misused-promises')
    })
  })

  it('[file-with-recommended-warnings.ts] should apply the recommended preset', () => {
    return lintFiles('file-with-recommended-warnings.ts').then((results) => {
      const rules = results[0].messages.map((m) => m.ruleId)
      expect(rules).toContain('@typescript-eslint/no-explicit-any')
      expect(rules).toContain('@typescript-eslint/prefer-as-const')
    })
  })

  it('[file-without-error.js] should not find any error', () => {
    return lintFiles('file-without-error.js').then((results) => {
      expect(results[0].warningCount).toBe(0)
      expect(results[0].errorCount).toBe(0)
    })
  })

  it('[file-without-error.ts] should not find any error', () => {
    return lintFiles('file-without-error.ts').then((results) => {
      expect(results[0].warningCount).toBe(0)
      expect(results[0].errorCount).toBe(0)
    })
  })

  it('[component-without-error.tsx] should not find any error', () => {
    return lintFiles('component-without-error.tsx').then((results) => {
      expect(results[0].warningCount).toBe(0)
      expect(results[0].errorCount).toBe(0)
    })
  })
})
