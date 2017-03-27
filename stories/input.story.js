import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Input } from '../src'

const inputProps = {
  name: 'person.firstName',
  value: '',
  onChange: action('field changed')
}

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