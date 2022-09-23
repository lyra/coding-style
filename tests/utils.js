const { ESLint } = require('eslint')

exports.lintFiles = function (file) {
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

  return eslint.lintFiles([`__fixtures__/${file}`])
}
