import React from 'react'
import { action } from '@storybook/addon-actions'
import { Input as StaticInput } from 'src'
import dynamicInput from '../../dynamic-input'

const Input = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticInput)

const inputProps = {
  name: 'person.firstName',
  onChange: action('field changed'),
}

export default {
  title: 'Input',
}

export const WithDefaultLabel = {
  render: () => <Input input={inputProps} meta={{}} />,
  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => <Input input={inputProps} meta={{}} label="Custom Label" />,

  name: 'with custom label',
}

export const WithNoLabel = {
  render: () => <Input input={inputProps} meta={{}} label={false} />,

  name: 'with no label',
}

export const WithRequiredTrueCustomIndicator = {
  render: () => (
    <Input
      input={inputProps}
      meta={{}}
      label="Custom Label"
      required
      requiredIndicator={'*'}
    />
  ),

  name: 'with required true custom indicator',
}

export const WithError = {
  render: () => (
    <Input
      input={inputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input',
      }}
      value="0000"
    />
  ),

  name: 'with error',
}
