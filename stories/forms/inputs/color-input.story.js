import React from 'react'
import { action } from '@storybook/addon-actions'
import { ColorInput as StaticColorInput } from 'src'
import dynamicInput from '../../dynamic-input'

const ColorInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticColorInput)

const inputProps = {
  name: 'primaryColor',
  onChange: action('field changed'),
  onBlur: () => {},
}

export default {
  title: 'ColorInput',
}

export const Default = () => <ColorInput input={inputProps} meta={{}} />

Default.story = {
  name: 'default',
}
