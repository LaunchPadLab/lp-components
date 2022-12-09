const path = require('path')
const bourbonIncludePaths = require('bourbon').includePaths
const neatIncludePaths = require('bourbon-neat').includePaths
const datePickerIncludePaths = [
  path.resolve(__dirname, '../node_modules/react-datepicker/src/stylesheets'),
]

module.exports = async ({ config }) => {
  // Storysource-addon
  config.module.rules.push({
    test: /\.story\.jsx?$/,
    use: [
      {
        loader: require.resolve('@storybook/source-loader')
      }
    ],
    enforce: 'pre',
  })
  // Sass
  config.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [
              ...datePickerIncludePaths,
              ...bourbonIncludePaths,
              ...neatIncludePaths,
            ],
          },
        },
      },
    ],
  })
  config.resolve = {
    ...config.resolve,
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  }
  // Required for Node ^18.12.1 to resolve an OpenSSL configuration deprecation.
  // See: https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported/73465262#73465262
  config.output = {
    ...config.output,
    hashFunction: 'xxhash64',
  }

  return config
}
