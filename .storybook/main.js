import { dirname, join } from "path";
/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const config = {
  stories: ['../**/*.story.js'],

  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },

  // typescript: {
  //   reactDocgen: "react-docgen-typescript"
  // }
  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
