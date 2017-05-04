import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { DateInput as StaticDateInput } from '../src'
import dynamicInput from './dynamic-input'

const dateValue = new Date()

const DateInput = dynamicInput({
  initialValue: dateValue,
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticDateInput)

const inputProps = {
  name: 'person.birthDate',
  onChange: action('date input changed'),
}

storiesOf('DateInput', module)
  .add('with default label', () => (
    <DateInput 
      input={inputProps} 
      meta={{}}
    />
  ))