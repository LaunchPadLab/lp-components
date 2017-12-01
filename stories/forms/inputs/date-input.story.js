import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { DateInput as StaticDateInput } from 'src'
import dynamicInput from '../../dynamic-input'

const DateInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticDateInput)

const inputProps = {
  name: 'person.birthDate',
  onChange: action('date input changed'),
}

storiesOf('DateInput', module)
  .add('default', () => (
    <DateInput 
      input={inputProps} 
      meta={{}}
    />
  ))
  .add('custom placeholder', () => (
    <DateInput 
      input={inputProps} 
      meta={{}}
      placeholderText={'custom'}
    />
  ))