import assert from 'node:assert/strict'
import cp from 'node:child_process'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const FILES = ['file-badly-formatted.tsx', 'file-disorganized-imports.ts']

test('Validate Prettier configuration', async (t) => {
  for (const file of FILES) {
    await t.test(`should format a file correctly: ${file}`, () => {
      const formatted = cp.execFileSync('pnpx', ['prettier', `__tests__/fixtures/${file}`], {
        encoding: 'utf8',
      })
      const expected = readFileSync(`__tests__/snapshots/${file}.txt`, 'utf8')
      assert.strictEqual(formatted, expected)
    })
  }
})
