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

export const Default = () => <Textarea input={inputProps} meta={{}} />

Default.story = {
  name: 'default',
}

export const WithCustomMaxLength = () => (
  <Textarea input={inputProps} meta={{}} maxLength={50} />
)

WithCustomMaxLength.story = {
  name: 'with custom max length',
}

export const WithHiddenCharacterCount = () => (
  <Textarea
    input={inputProps}
    meta={{}}
    maxLength={50}
    hideCharacterCount={true}
  />
)

WithHiddenCharacterCount.story = {
  name: 'with hidden character count',
}

export const WithAForwardedRef = () => (
  <Textarea input={inputProps} meta={{}} forwardedRef={inputRef} />
)

WithAForwardedRef.story = {
  name: 'with a forwardedRef',
}
