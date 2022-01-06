const { lintFiles } = require('../../tests/utils')

describe('Validate ESLint configuration', () => {
  it('[fixture-with-errors.tsx] should find errors', () => {
    return lintFiles('file-with-errors.tsx').then((results) => {
      expect(results[0].warningCount).not.toBe(0)
      expect(results[0].errorCount).not.toBe(0)
    })
  })

  it('[file-without-error.tsx] should not find any error', () => {
    return lintFiles('file-without-error.tsx').then((results) => {
      expect(results[0].errorCount).toBe(0)
    })
  })
})
