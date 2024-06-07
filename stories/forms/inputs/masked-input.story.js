import React from 'react'
import { action } from '@storybook/addon-actions'
import { MaskedInput as StaticMaskedInput } from 'src'
import dynamicInput from '../../dynamic-input'

const MaskedInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticMaskedInput)

const inputProps = {
  name: 'maskedInput',
  onChange: action('field changed'),
}

export default {
  title: 'MaskedInput',
}

export const CommaSeparatedNumber = {
  render: () => (
    <MaskedInput input={inputProps} meta={{}} maskOptions={{ numeral: true }} />
  ),

  name: 'comma-separated number',
}

export const PhoneNumber = {
  render: () => (
    <MaskedInput
      input={inputProps}
      meta={{}}
      maskOptions={{
        numericOnly: true,
        blocks: [0, 3, 0, 3, 4],
        delimiters: ['(', ')', ' ', '-'],
      }}
    />
  ),

  name: 'phone number',
}
