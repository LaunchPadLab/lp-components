module.exports = {
  "presets": [
    ["@launchpadlab/babel-preset/react", {
      "env": {
        // Don't transform modules in "esm" mode.
        "modules": process.env.BABEL_ENV === 'esm' ? false : 'auto'
      }
    }]
  ]
}
