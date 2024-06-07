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

export const CommaSeparatedNumber = () => (
  <MaskedInput input={inputProps} meta={{}} maskOptions={{ numeral: true }} />
)

CommaSeparatedNumber.story = {
  name: 'comma-separated number',
}

export const PhoneNumber = () => (
  <MaskedInput
    input={inputProps}
    meta={{}}
    maskOptions={{
      numericOnly: true,
      blocks: [0, 3, 0, 3, 4],
      delimiters: ['(', ')', ' ', '-'],
    }}
  />
)

PhoneNumber.story = {
  name: 'phone number',
}
