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

export const WithDefaultLabel = () => (
  <IconInput icon="mail" input={inputProps} meta={{}} />
)

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <IconInput icon="mail" input={inputProps} meta={{}} label="Custom Label" />
)

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithNoLabel = () => (
  <IconInput icon="mail" input={inputProps} meta={{}} label={false} />
)

WithNoLabel.story = {
  name: 'with no label',
}

export const WithError = () => (
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
)

WithError.story = {
  name: 'with error',
}
