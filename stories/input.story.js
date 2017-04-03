import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Input as RawInput } from '../src'
import dynamicInput from './dynamic-input'

const inputProps = {
  name: 'person.firstName',
  value: 'test',
  onChange: action('field changed')
}

const Input = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(RawInput)

storiesOf('Input', module)
  .add('with default label', () => (
    <Input 
      input={inputProps} 
      meta={{}}
    />
  ))
  .add('with custom label', () => (
    <Input 
      input={inputProps}
      meta={{}}
      label="Custom Label"
    />
  ))
  .add('with no label', () => (
    <Input 
      input={inputProps}
      meta={{}}
      label={false}
    />
  ))
  .add('with error', () => (
    <Input 
      input={inputProps}
      meta={{ 
        invalid: true,
        touched: true,
        error: 'Invalid input' 
      }}
      value="0000"
    />
  ))