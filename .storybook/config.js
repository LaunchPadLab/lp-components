import '../.storybook/styles/application.scss'

import { configure } from '@storybook/react'

const req = require.context('../stories', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
