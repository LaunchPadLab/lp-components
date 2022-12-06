[![NPM version](https://img.shields.io/npm/v/@launchpadlab/lp-components.svg?style=flat-square)](https://www.npmjs.com/package/@launchpadlab/lp-components)

# lp-components

Reusable UI components for React apps.

```jsx
import React from 'react'
import { Spinner } from '@launchpadlab/lp-components'

function MyLoadingComponent({ data }) {
  return data ? <div>{data}</div> : <Spinner />
}
```

This library contains components for status indicators, custom inputs, flash messages and more. A full list of available components can be found in the [documentation](#documentation) or in the [interactive component playground](http://lp-components.herokuapp.com).

## Documentation

Documentation and usage info can be found in [docs.md](docs.md).

## Migration Guides

- [v2.0.0](migration-guides/v2.0.0.md)
- [v3.0.0](migration-guides/v3.0.0.md)
- [v4.0.0](migration-guides/v4.0.0.md)
- [v5.0.0](migration-guides/v5.0.0.md)
- [v6.0.0](migration-guides/v6.0.0.md)
- [v7.0.0](migration-guides/v7.0.0.md)
- [v8.0.0](migration-guides/v8.0.0.md)

## Contribution

This package follows the Opex [NPM package guidelines](https://github.com/LaunchPadLab/opex-public/blob/main/gists/npm-package-guidelines.md). Please refer to the linked document for information on contributing, testing and versioning.

## Additional info

#### Size Limit

This library uses [size-limit](https://github.com/ai/size-limit) to prevent size bloat. The `yarn size` script is run in CI to check that the package size is under the limit specified in [.size-limit.js](.size-limit.js). For a visualization of this package's relative dependency sizes, you can run `yarn size --why`.

#### React Storybook

This library uses [React Storybook](https://getstorybook.io/) to render components in a development sandbox. In order to view the storybook, run `yarn run storybook` and navigate to the localhost port indicated.

_Every new component added to this library should be accompanied by a new story in the storybook._

When pull requests are submitted, a Heroku review app will be deployed containing the revised storybook so that reviewers can view the changes made.

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
