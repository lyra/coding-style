import { ESLint } from 'eslint'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { lyraExpoConfig, reactCompilerRecommendedWarn } = require('../index.js')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

test('Validate ESLint configuration', async (t) => {
  await t.test('[file-with-errors.js] should find errors', async () => {
    const results = await lintFiles('file-with-errors.js')
    assert.notEqual(results[0].warningCount, 0)
  })

  await t.test('[file-with-errors.ts] should find errors', async () => {
    const results = await lintFiles('file-with-errors.ts')
    assert.notEqual(results[0].warningCount, 0)
    assert.strictEqual(results[0].errorCount, 0)
  })

  await t.test('[component-with-errors.tsx] should find errors', async () => {
    const results = await lintFiles('component-with-errors.tsx')
    assert.notEqual(results[0].warningCount, 0)
    assert.notEqual(results[0].errorCount, 0)
  })

  await t.test('[file-with-type-errors.ts] should find deprecation warnings', async () => {
    const results = await lintFiles('file-with-type-errors.ts')
    const rules = results[0].messages.map((message) => message.ruleId)
    assert.ok(rules.includes('@typescript-eslint/no-deprecated'))
    assert.ok(!rules.includes('@typescript-eslint/no-floating-promises'))
    assert.ok(!rules.includes('@typescript-eslint/no-misused-promises'))
  })

  await t.test(
    '[file-with-recommended-warnings.ts] should apply the recommended preset',
    async () => {
      const results = await lintFiles('file-with-recommended-warnings.ts')
      const rules = results[0].messages.map((message) => message.ruleId)
      assert.ok(rules.includes('@typescript-eslint/no-explicit-any'))
      assert.ok(rules.includes('@typescript-eslint/prefer-as-const'))
    },
  )

  await t.test('[file-without-error.js] should not find any error', async () => {
    const results = await lintFiles('file-without-error.js')
    assert.strictEqual(results[0].warningCount, 0)
    assert.strictEqual(results[0].errorCount, 0)
  })

  await t.test('[file-without-error.ts] should not find any error', async () => {
    const results = await lintFiles('file-without-error.ts')
    assert.strictEqual(results[0].warningCount, 0)
    assert.strictEqual(results[0].errorCount, 0)
  })

  await t.test('[component-without-error.tsx] should not find any error', async () => {
    const results = await lintFiles('component-without-error.tsx')
    assert.strictEqual(results[0].warningCount, 0)
    assert.strictEqual(results[0].errorCount, 0)
  })
})
