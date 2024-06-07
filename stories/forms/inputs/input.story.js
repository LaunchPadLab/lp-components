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

export const WithDefaultLabel = () => <Input input={inputProps} meta={{}} />

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <Input input={inputProps} meta={{}} label="Custom Label" />
)

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithNoLabel = () => (
  <Input input={inputProps} meta={{}} label={false} />
)

WithNoLabel.story = {
  name: 'with no label',
}

export const WithRequiredTrueCustomIndicator = () => (
  <Input
    input={inputProps}
    meta={{}}
    label="Custom Label"
    required
    requiredIndicator={'*'}
  />
)

WithRequiredTrueCustomIndicator.story = {
  name: 'with required true custom indicator',
}

export const WithError = () => (
  <Input
    input={inputProps}
    meta={{
      invalid: true,
      touched: true,
      error: 'Invalid input',
    }}
    value="0000"
  />
)

WithError.story = {
  name: 'with error',
}
