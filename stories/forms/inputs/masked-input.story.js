import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { MaskedInput as StaticMaskedInput } from 'src'
import dynamicInput from '../../dynamic-input'

const MaskedInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticMaskedInput)

const inputProps = {
  name: 'maskedInput',
  onChange: action('field changed')
}

storiesOf('MaskedInput', module)
  .add('comma-separated number', () => (
    <MaskedInput
      input={inputProps}
      meta={{}}
      maskOptions={{ numeral: true }}
    />
  ))
  .add('phone number', () => (
    <MaskedInput
      input={inputProps}
      meta={{}}
      maskOptions={{ 
        numericOnly: true,
        blocks: [0, 3, 0, 3, 4],
        delimiters: ['(', ')', ' ', '-'], 
      }}
    />
  ))
