import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { ColorInput as StaticColorInput } from 'src'
import dynamicInput from '../../dynamic-input'

const ColorInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticColorInput)

const inputProps = {
  name: 'primaryColor',
  onChange: action('field changed'),
  onBlur: () => {}
}

storiesOf('ColorInput', module)
  .add('default', () => (
    <ColorInput
      input={inputProps} 
      meta={{}}
    />
  ))
  