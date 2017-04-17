import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Input as StaticInput } from '../src'
import dynamicInput from './dynamic-input'

const Input = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticInput)

const inputProps = {
  name: 'person.firstName',
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
  .add('with mask', () => (
    <Input 
      input={inputProps}
      meta={{}}
      mask="9999-9999-9999-9999"
      label="Credit Card"
    />
  ))
  .add('with mask and placeholder', () => (
    <Input 
      input={inputProps}
      meta={{}}
      mask="9999-9999-9999-9999"
      placeholder="____-____-____-____"
      showMaskPlaceholder={true}
      label="Credit Card"
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