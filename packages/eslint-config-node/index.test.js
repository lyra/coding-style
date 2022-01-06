const { lintFiles } = require('../../tests/utils')

describe('Validate ESLint configuration', () => {
  it('[fixture-with-errors.js] should find errors', () => {
    return lintFiles('file-with-errors.js').then((results) => {
      expect(results[0].errorCount).not.toBe(0)
    })
  })

  it('[fixture-with-errors.ts] should find errors', () => {
    return lintFiles('file-with-errors.ts').then((results) => {
      expect(results[0].warningCount).not.toBe(0)
      expect(results[0].errorCount).not.toBe(0)
    })
  })

  it('[fixture-without-error.js] should not find any error', () => {
    return lintFiles('file-without-error.js').then((results) => {
      expect(results[0].warningCount).toBe(0)
      expect(results[0].errorCount).toBe(0)
    })
  })

  it('[fixture-without-error.ts] should not find any error', () => {
    return lintFiles('file-without-error.ts').then((results) => {
      expect(results[0].warningCount).toBe(0)
      expect(results[0].errorCount).toBe(0)
    })
  })
})
