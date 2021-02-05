const { ESLint } = require('eslint')

function getErrors(file) {
  const eslint = new ESLint({
    overrideConfigFile: 'index.js',
    overrideConfig: {
      settings: {
        react: {
          // setting "latest" instead of "detect" because "react" package is not installed
          version: 'latest',
        },
      },
    },
  })

  return eslint.lintFiles([`__fixtures__/${file}`])
}

describe('Validate ESLint configuration', () => {
  it('should find errors in file fixture-with-errors.ts', () => {
    return getErrors('file-with-errors.ts').then((results) => {
      expect(results[0].warningCount).not.toBe(0)
      expect(results[0].errorCount).not.toBe(0)
    })
  })

  it('should not find any error in file fixture-without-error.ts', () => {
    return getErrors('file-without-error.ts').then((results) => {
      expect(results[0].errorCount).toBe(0)
    })
  })
})
