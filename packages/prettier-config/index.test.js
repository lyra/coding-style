const fs = require('fs')
const prettier = require('prettier')

describe('Validate Prettier configuration', () => {
  it('should format a file correctly', () => {
    return prettier.resolveConfig('index.json').then((options) => {
      const text = fs.readFileSync('__fixtures__/file-badly-formatted.tsx', 'utf8')
      const formatted = prettier.format(text, { ...options, parser: 'typescript' })
      expect(formatted).toMatchSnapshot()
    })
  })

  it('should organize imports correctly', () => {
    return prettier.resolveConfig('index.json').then((options) => {
      const text = fs.readFileSync('__fixtures__/file-disorganized-imports.ts', 'utf8')
      const formatted = prettier.format(text, { ...options, parser: 'typescript' })
      expect(formatted).toMatchSnapshot()
    })
  })
})
