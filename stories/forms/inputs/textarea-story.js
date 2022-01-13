import React, { createRef } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Textarea as StaticTextarea } from 'src'
import dynamicInput from '../../dynamic-input'

const Textarea = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticTextarea)

const inputProps = {
  name: 'person.biography',
  onChange: action('text area changed')
}

const inputRef = createRef()

storiesOf('Textarea', module)
  .add('default', () => (
    <Textarea
      input={inputProps}
      meta={{}}
    />
  ))
  .add('with custom max length', () => (
    <Textarea
      input={inputProps}
      meta={{}}
      maxLength={50}
    />
  ))
  .add('with hidden character count', () => (
    <Textarea
      input={inputProps}
      meta={{}}
      maxLength={50}
      hideCharacterCount={true}
    />
  ))
  .add('with a forwardedRef', () => (
    <Textarea
      input={inputProps}
      meta={{}}
      forwardedRef={inputRef}
    />
  ))
