import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
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
      showCharacterCount={false}
      maxLength={50}
    />
  ))
