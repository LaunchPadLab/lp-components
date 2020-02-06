module.exports = {
  extends: '@launchpadlab/eslint-config/react',
  // Enforce isomorphic code (node and browser)
  env: {
    browser: false,
    node: false,
    'shared-node-browser': true,
  },
}
