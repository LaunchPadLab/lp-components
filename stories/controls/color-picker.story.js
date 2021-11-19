import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ColorPicker as StaticColorPicker } from 'src'
import dynamicInput from '../dynamic-input'

const ColorPicker = dynamicInput()(StaticColorPicker)

storiesOf('ColorPicker', module).add('default', () => (
  <ColorPicker onChange={action('selected color')} />
))
