import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Input } from '../src'
import fieldWithValue from './field-with-value'

const inputProps = {
  name: 'person.firstName',
  value: '',
  onChange: action('field changed')
}

const DynamicInput = fieldWithValue('hey')(Input)

storiesOf('Input', module)
  .add('with default label', () => (
    <DynamicInput 
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