import { dirname, join } from "path";

/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const config = {
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  stories: ['../**/*.story.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/blocks',
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
  ],
  docs: {
    defaultName: 'Documentation'
  }
};
export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
