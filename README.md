[ ![Codeship Status for LaunchPadLab/lp-components](https://app.codeship.com/projects/9ed40b70-ed52-0134-977a-7ab4e0ed4895/status?branch=master)](https://app.codeship.com/projects/208563) [![Code Climate](https://codeclimate.com/repos/58cc190ef96b3b02880000b6/badges/452f912b130d452bca15/gpa.svg)](https://codeclimate.com/repos/58cc190ef96b3b02880000b6/feed)

# lp-components
Reusable UI components for React apps.

## Usage
Documenation and usage information can be found in [docs.md](docs.md). These docs are auto-generated from inline [JSDoc-style](http://usejsdoc.org/) comments using [documentation.js](https://github.com/documentationjs/documentation). Any changes or additions to this library should be accompanied by corresponding changes to the docs, which can be compiled using `yarn run docs`.

## Feature Requests
For new requests, please submit an issue or PR with the label of `idea`, and include a description of the change and why it is necessary.

## Pull Requests and Deployments
Pull requests MUST be approved by someone on the team before merging into master. Once the PR is approved, but before it is merged, the implementor should bump the version according to semantic versioning with `yarn version`. Once merged, the master branch will automatically be published the newest version to NPM.

## Development
* `git clone git@github.com:LaunchPadLab/lp-components.git`
* `yarn install`
* `yarn run storybook` to view [storybook](#storybook)

If you are developing and want to see the results in a local client application:
* Link the local library:
  * `yarn link` in the lp-utils directory
  * `yarn link @launchpadlab/lp-components` in the client directory
* Run the watchful build: `yarn start`

Changes will be immediately compiled and available to the client application.

*Warning:* Remember to unlink the library and use a real version before submitting a pull request for the client application. Forgetting to do so may cause you to push up code which works locally but breaks on the review app.

## Testing
This library uses [Jest](https://facebook.github.io/jest/) for unit testing, run with `yarn run test`.

## Linting
This library uses [ESLint](http://eslint.org/) for linting, run with `yarn run lint`.

## Storybook
This library uses [React Storybook](https://getstorybook.io/) to render components in a development sandbox. In order to view the storybook, run `yarn run storybook` and navigate to the localhost port indicated. 

**Every new component added to this library should be accompanied by a new story in the storybook.**

When pull requests are submitted, a Heroku review app will be deployed containing the revised storybook so that reviewers can view the changes made. When these changes are merged into `master`, the new storybook will be automatically deployed to http://lp-components.herokuapp.com.
