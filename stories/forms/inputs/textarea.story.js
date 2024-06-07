import React, { createRef } from 'react'
import { action } from '@storybook/addon-actions'
import { Textarea as StaticTextarea } from 'src'
import dynamicInput from '../../dynamic-input'

const Textarea = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticTextarea)

const inputProps = {
  name: 'person.biography',
  onChange: action('text area changed'),
}

const inputRef = createRef()

export default {
  title: 'Textarea',
}

export const Default = {
  render: () => <Textarea input={inputProps} meta={{}} />,
  name: 'default',
}

export const WithCustomMaxLength = {
  render: () => <Textarea input={inputProps} meta={{}} maxLength={50} />,

  name: 'with custom max length',
}

export const WithHiddenCharacterCount = {
  render: () => (
    <Textarea
      input={inputProps}
      meta={{}}
      maxLength={50}
      hideCharacterCount={true}
    />
  ),

  name: 'with hidden character count',
}

export const WithAForwardedRef = {
  render: () => (
    <Textarea input={inputProps} meta={{}} forwardedRef={inputRef} />
  ),

  name: 'with a forwardedRef',
}
