const { ESLint } = require('eslint')

exports.lintFiles = function (file) {
  const eslint = new ESLint({
    overrideConfigFile: 'index.js',
    overrideConfig: {
      settings: {
        react: {
          // forcing React version instead of "detect" because package is not installed locally
          version: '17.0.2',
        },
      },
    },
  })

  return eslint.lintFiles([`__fixtures__/${file}`])
}
