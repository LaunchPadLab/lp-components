const path = require('path')
const Bourbon = require('bourbon').includePaths
const Neat = require('bourbon-neat').includePaths

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
        query: { includePaths: [path.resolve(__dirname, '../'), ...Bourbon, ...Neat ] }
      }
    ]
  }
}