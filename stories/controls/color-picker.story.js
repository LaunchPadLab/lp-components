import React from 'react'
import { action } from '@storybook/addon-actions'
import { ColorPicker as StaticColorPicker } from 'src'
import dynamicInput from '../dynamic-input'

const ColorPicker = dynamicInput()(StaticColorPicker)

export default {
  title: 'ColorPicker',
}

export const Default = {
  render: () => <ColorPicker onChange={action('selected color')} />,
  name: 'default',
}
