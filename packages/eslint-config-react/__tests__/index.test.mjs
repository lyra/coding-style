import { ESLint } from 'eslint'
import assert from 'node:assert/strict'
import test from 'node:test'

function lintFiles(file) {
  const eslint = new ESLint({
    overrideConfigFile: 'index.js',
    overrideConfig: {
      settings: {
        react: {
          // forcing React version instead of "detect" because package is not installed locally
          version: '18.2.0',
        },
      },
    },
  })

  return eslint.lintFiles([`__tests__/fixtures/${file}`])
}

test('Validate ESLint configuration', async (t) => {
  await t.test('[fixture-with-errors.tsx] should find errors', async () => {
    const results = await lintFiles('file-with-errors.tsx')
    assert.notEqual(results[0].warningCount, 0)
    assert.notEqual(results[0].errorCount, 0)
  })

  await t.test('[file-without-error.tsx] should not find any error', async () => {
    const results = await lintFiles('file-without-error.tsx')
    assert.strictEqual(results[0].errorCount, 0)
  })
})
