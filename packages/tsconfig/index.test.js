import assert from 'node:assert'
import { existsSync } from 'node:fs'
import test from 'node:test'

test('TypeScript configs', { todo: true }, (t) => {
  t.test('base tsconfig should exist', () => {
    assert(existsSync('./tsconfig-base.json'))
  })
})
