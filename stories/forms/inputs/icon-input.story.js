import React from 'react'
import { action } from '@storybook/addon-actions'
import { IconInput as StaticIconInput } from 'src'
import dynamicInput from '../../dynamic-input'

const IconInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticIconInput)

const inputProps = {
  name: 'person.emailAddress',
  onChange: action('field changed'),
}

export default {
  title: 'IconInput',
}

export const WithDefaultLabel = {
  render: () => <IconInput icon="mail" input={inputProps} meta={{}} />,

  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => (
    <IconInput icon="mail" input={inputProps} meta={{}} label="Custom Label" />
  ),

  name: 'with custom label',
}

export const WithNoLabel = {
  render: () => (
    <IconInput icon="mail" input={inputProps} meta={{}} label={false} />
  ),

  name: 'with no label',
}

export const WithError = {
  render: () => (
    <IconInput
      icon="mail"
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
