import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { IconInput as StaticIconInput } from 'src'
import dynamicInput from '../../dynamic-input'

const IconInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticIconInput)

const inputProps = {
  name: 'person.emailAddress',
  onChange: action('field changed'),
}

storiesOf('IconInput', module)
  .add('with default label', () => (
    <IconInput 
      icon="mail"
      input={inputProps} 
      meta={{}}
    />
  ))
  .add('with custom label', () => (
    <IconInput 
      icon="mail"
      input={inputProps}
      meta={{}}
      label="Custom Label"
    />
  ))
  .add('with no label', () => (
    <IconInput 
      icon="mail"
      input={inputProps}
      meta={{}}
      label={false}
    />
  ))
  .add('with error', () => (
    <IconInput 
      icon="mail"
      input={inputProps}
      meta={{ 
        invalid: true,
        touched: true,
        error: 'Invalid input' 
      }}
      value="0000"
    />
  ))