const path = require('path')
const bourbonIncludePaths = require('bourbon').includePaths
const neatIncludePaths = require('bourbon-neat').includePaths
const datePickerIncludePaths = [ path.resolve(__dirname, '../node_modules/react-datepicker/src/stylesheets') ]

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                datePickerIncludePaths,
                bourbonIncludePaths,
                neatIncludePaths,
              ]
            }
          }
        ]
      },
    ]
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  }
}