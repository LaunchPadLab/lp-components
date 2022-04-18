import '../.storybook/styles/application.scss'

import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

// Add a11y addon
addDecorator(withA11y)

// Import stories
const req = require.context('../stories', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
