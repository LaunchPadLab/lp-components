import React from 'react'
import { action } from '@storybook/addon-actions'
import { DateInput as StaticDateInput } from 'src'
import dynamicInput from '../../dynamic-input'

const DateInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticDateInput)

const inputProps = {
  name: 'person.birthDate',
  onChange: action('date input changed'),
  onBlur: action('blurred'),
}

export default {
  title: 'DateInput',
}

export const Default = {
  render: () => <DateInput input={inputProps} meta={{}} />,
  name: 'default',
}

export const CustomPlaceholder = {
  render: () => (
    <DateInput input={inputProps} meta={{}} placeholderText={'custom'} />
  ),

  name: 'custom placeholder',
}
