import '../.storybook/styles/application.scss'

import { configure } from '@kadira/storybook'

const req = require.context('../stories', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
