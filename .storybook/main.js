module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../**/*.story.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport'
  ],
}