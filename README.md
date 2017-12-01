[ ![Codeship Status for LaunchPadLab/lp-components](https://app.codeship.com/projects/9ed40b70-ed52-0134-977a-7ab4e0ed4895/status?branch=master)](https://app.codeship.com/projects/208563) [![Test Coverage](https://codeclimate.com/repos/58cc190ef96b3b02880000b6/badges/452f912b130d452bca15/coverage.svg)](https://codeclimate.com/repos/58cc190ef96b3b02880000b6/coverage)

# lp-components

[![Greenkeeper badge](https://badges.greenkeeper.io/LaunchPadLab/lp-components.svg)](https://greenkeeper.io/)
Reusable UI components for React apps.

## Documentation
Documentation and usage info can be found in [docs.md](docs.md).

## Migration Guides
- [v2.0.0](migration-guides/v2.0.0.md)

## Contribution
This package follows the Opex [NPM package guidelines](https://github.com/LaunchPadLab/opex/blob/master/gists/npm-package-guidelines.md). Please refer to the linked document for information on contributing, testing and versioning.

## Additional info

#### React Storybook
This library uses [React Storybook](https://getstorybook.io/) to render components in a development sandbox. In order to view the storybook, run `yarn run storybook` and navigate to the localhost port indicated.

*Every new component added to this library should be accompanied by a new story in the storybook.*

When pull requests are submitted, a Heroku review app will be deployed containing the revised storybook so that reviewers can view the changes made. When these changes are merged into `master`, the new storybook will be automatically deployed to http://lp-components.herokuapp.com.

#### DateInput styles

The `DateInput` component requires special styles in order to render correctly. These styles most be imported from the `react-datepicker` folder in `node_modules` and imported into your sass. To do this, make the following changes to your `webpack.config.js` and `application.scss`:

#### `webpack.config.js`:

Add a line near the top of the file specifying the path to the `react-datepicker` styles:

`const datePickerPath = path.resolve(__dirname, '../node_modules/react-datepicker/src/stylesheets')`

Then, add this path to the `includePaths` array of the sass loader:
```
{
    test: /.scss$/,
    loader: "sass",
    query: { includePaths: [ ... , datePickerPath ] }
}
```

#### `application.scss`:

Import the `react-datepicker` styles by adding this line:

`@import "datepicker";`

