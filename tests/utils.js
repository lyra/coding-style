const { ESLint } = require('eslint')

exports.lintFiles = function (file) {
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
