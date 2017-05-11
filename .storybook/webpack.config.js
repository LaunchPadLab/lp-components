const path = require('path')
const Bourbon = require('bourbon').includePaths
const Neat = require('bourbon-neat').includePaths
const datePickerPath = path.resolve(__dirname, '../node_modules/react-datepicker/src/stylesheets')

module.exports = {
  module: {
    loaders: [
      {
        test: /.scss$/,
        loaders: ["style", "css"]
      },
      {
        test: /.scss$/,
        loader: "sass",
        query: { includePaths: [path.resolve(__dirname, '../'), ...Bourbon, ...Neat, datePickerPath ] }
      }
    ]
  }
}