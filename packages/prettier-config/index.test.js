var cp = require('child_process')

const FILES = ['file-badly-formatted.tsx', 'file-disorganized-imports.ts']

describe('Validate Prettier configuration', () => {
  for (const file of FILES) {
    it(`should format a file correctly: ${file}`, () => {
      const formatted = cp.execSync(`pnpx prettier __fixtures__/${file}`).toString()
      expect(formatted).toMatchSnapshot()
    })
  }
})
