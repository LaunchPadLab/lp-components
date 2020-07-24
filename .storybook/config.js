import '../.storybook/styles/storybook.scss'

import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'

// Add a11y addon
addDecorator(withA11y)

// Add knobs addon
addDecorator(withKnobs)

// Import stories
const req = require.context('../stories', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
